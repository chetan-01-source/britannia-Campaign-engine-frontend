export interface ApiProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  productUrl: string;
  slug: string;
  images: {
    primary: string;
    gallery: string[];
    thumbnails: string[];
  };
  productHighlights: string[];
  source: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  scrapedAt: string;
  __v: number;
}

export interface ApiPagination {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
}

export interface ApiFilters {
  category: string | null;
  search: string | null;
}

export interface ApiResponse {
  success: boolean;
  data: {
    products: ApiProduct[];
    pagination: ApiPagination;
  };
  filters: ApiFilters;
  timestamp: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  description: string;
  productUrl?: string;
  slug?: string;
  gallery?: string[];
}

// API Request types
export interface ProductsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}