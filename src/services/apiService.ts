import type { ApiResponse, ProductsQueryParams, ApiProduct, Product } from '../types/api';
import { API_CONFIG } from './config';

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  private async makeRequest<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    return searchParams.toString();
  }

  async getProducts(params: ProductsQueryParams = {}): Promise<ApiResponse> {
    const defaultParams = {
      page: API_CONFIG.DEFAULT_PAGINATION.INITIAL_PAGE,
      limit: API_CONFIG.DEFAULT_PAGINATION.LIMIT,
      ...params
    };

    const queryString = this.buildQueryString(defaultParams);
    const url = `${this.baseUrl}${API_CONFIG.ENDPOINTS.PRODUCTS}?${queryString}`;
    
    return this.makeRequest<ApiResponse>(url);
  }

  // Transform API product to frontend product format
  transformProduct(apiProduct: ApiProduct): Product {
    return {
      id: apiProduct._id || '',
      name: apiProduct.name || 'Unnamed Product',
      image: apiProduct.images?.primary || '',
      category: apiProduct.category || 'Uncategorized',
      description: apiProduct.description || 'No description available',
      productUrl: apiProduct.productUrl || '',
      slug: apiProduct.slug || '',
      gallery: apiProduct.images?.gallery || []
    };
  }
}

export const apiService = new ApiService();