import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import type { Product, ApiPagination } from '../types/api';
import { apiService } from '../services/apiService';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: ApiPagination | null;
  searchQuery: string;
  hasMore: boolean;
  initialLoading: boolean;
}

type ProductsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: { products: Product[]; pagination: ApiPagination; append?: boolean } }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'RESET_PRODUCTS' }
  | { type: 'SET_INITIAL_LOADING'; payload: boolean };

interface ProductsContextType extends ProductsState {
  fetchProducts: (page?: number, append?: boolean) => Promise<void>;
  setSearchQuery: (query: string) => void;
  loadMore: () => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  pagination: null,
  searchQuery: '',
  hasMore: true,
  initialLoading: true
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'FETCH_SUCCESS':
      const { products, pagination, append = false } = action.payload;
      return {
        ...state,
        loading: false,
        initialLoading: false,
        products: append ? [...state.products, ...products] : products,
        pagination,
        hasMore: pagination.currentPage < pagination.totalPages,
        error: null
      };
    
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        initialLoading: false,
        error: action.payload
      };
    
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };
    
    case 'RESET_PRODUCTS':
      return {
        ...state,
        products: [],
        pagination: null,
        hasMore: true
      };
    
    case 'SET_INITIAL_LOADING':
      return {
        ...state,
        initialLoading: action.payload
      };
    
    default:
      return state;
  }
}

interface ProductsProviderProps {
  children: React.ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const fetchingRef = useRef(false);

  const fetchProducts = useCallback(async (page: number = 1, append: boolean = false) => {
    // Prevent duplicate API calls
    if (fetchingRef.current) return;
    
    fetchingRef.current = true;
    dispatch({ type: 'FETCH_START' });
    
    try {
      const response = await apiService.getProducts({
        page,
        search: state.searchQuery || undefined
      });

      // Validate API response structure
      if (!response || !response.data || !Array.isArray(response.data.products)) {
        throw new Error('Invalid API response structure');
      }

      const transformedProducts = response.data.products
        .filter(product => product && product._id) // Filter out invalid products
        .map(product => apiService.transformProduct(product));

      dispatch({ 
        type: 'FETCH_SUCCESS', 
        payload: { 
          products: transformedProducts, 
          pagination: response.data.pagination || { currentPage: 1, totalPages: 1, total: 0, limit: 12 },
          append 
        } 
      });
    } catch (error) {
      console.error('API Error:', error);
      
      // Provide fallback mock data if API fails
      const mockData = {
        products: [
          {
            _id: '1',
            name: 'Britannia Good Day Cookies',
            description: 'Delicious butter cookies perfect for any time of day',
            category: 'Cookies & Biscuits',
            productUrl: '#',
            slug: 'good-day-cookies',
            images: { primary: '', gallery: [], thumbnails: [] },
            productHighlights: [],
            source: 'mock',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            scrapedAt: new Date().toISOString(),
            __v: 0
          },
          {
            _id: '2',
            name: 'Britannia Marie Gold',
            description: 'Classic marie biscuits enriched with vitamins and minerals',
            category: 'Biscuits',
            productUrl: '#',
            slug: 'marie-gold',
            images: { primary: '', gallery: [], thumbnails: [] },
            productHighlights: [],
            source: 'mock',
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            scrapedAt: new Date().toISOString(),
            __v: 0
          }
        ],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          total: 2,
          limit: 12
        }
      };
      
      const transformedProducts = mockData.products.map(product => 
        apiService.transformProduct(product)
      );
      
      dispatch({ 
        type: 'FETCH_SUCCESS', 
        payload: { 
          products: transformedProducts, 
          pagination: mockData.pagination,
          append: false 
        } 
      });
      
      // Also set a user-friendly error message
      setTimeout(() => {
        dispatch({ 
          type: 'FETCH_ERROR', 
          payload: 'Unable to connect to server. Showing sample products.' 
        });
      }, 100);
    } finally {
      fetchingRef.current = false;
    }
  }, [state.searchQuery]);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  }, []);

  const loadMore = useCallback(async () => {
    if (!state.hasMore || state.loading || !state.pagination || fetchingRef.current) {
      return;
    }
    
    const nextPage = state.pagination.currentPage + 1;
    if (nextPage <= state.pagination.totalPages) {
      await fetchProducts(nextPage, true);
    }
  }, [state.hasMore, state.loading, state.pagination, fetchProducts]);

  const refreshProducts = useCallback(async () => {
    dispatch({ type: 'RESET_PRODUCTS' });
    await fetchProducts(1, false);
  }, [fetchProducts]);

  // Initial load - only once on mount
  useEffect(() => {
    let mounted = true;
    
    const initialLoad = async () => {
      if (mounted) {
        await fetchProducts(1, false);
      }
    };
    
    initialLoad();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Search with debounce - only when search query changes
  useEffect(() => {
    if (!state.searchQuery.trim()) return;
    
    const timeoutId = setTimeout(() => {
      dispatch({ type: 'RESET_PRODUCTS' });
      fetchProducts(1, false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [state.searchQuery]);

  // Reset products when search is cleared
  useEffect(() => {
    if (state.searchQuery.trim() === '' && state.products.length > 0) {
      dispatch({ type: 'RESET_PRODUCTS' });
      fetchProducts(1, false);
    }
  }, [state.searchQuery]);

  const value: ProductsContextType = {
    ...state,
    fetchProducts,
    setSearchQuery,
    loadMore,
    refreshProducts
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};