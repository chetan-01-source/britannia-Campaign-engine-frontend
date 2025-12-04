import type { Product } from './Product';

// Re-export Product interface from types
export type { Product } from '../types/api';

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export interface ProductCardProps {
  product: Product;
  onGenerateCampaign: (productId: string) => void;
}

export interface ProductGridProps {
  products: Product[];
  onGenerateCampaign: (productId: string) => void;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}