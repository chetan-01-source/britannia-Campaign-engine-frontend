import React from 'react';
import type { ProductGridProps } from '../../interfaces';
import ProductCard from '../ProductCard/ProductCard';
import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onGenerateCampaign, 
  isLoading = false,
  hasMore = false,
  onLoadMore
}) => {
  const shouldShowInfiniteScroll = hasMore && products.length > 0 && !!onLoadMore;
  
  const { sentinelRef } = useInfiniteScroll({
    hasMore: shouldShowInfiniteScroll,
    isLoading,
    onLoadMore: onLoadMore || (() => {}),
    threshold: 300
  });
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[...Array(8)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-32 h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
          <div className="text-8xl">📦</div>
        </div>
        <h3 className="text-2xl font-bold text-gray-600 mb-3">No products found</h3>
        <p className="text-gray-500 text-lg">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {products && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products
            .filter(product => product && product.id) // Filter out invalid products
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onGenerateCampaign={onGenerateCampaign}
              />
            ))}
        </div>
      )}
      
      {/* Infinite Scroll Sentinel - Only show if we have products and more to load */}
      {shouldShowInfiniteScroll && (
        <div className="space-y-8">
          {/* Loading skeletons during infinite scroll */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          )}
          
          <div className="flex justify-center py-4">
            <div 
              ref={sentinelRef} 
              className="h-8 w-full flex items-center justify-center"
            >
              {isLoading && (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                  <span className="text-gray-600 font-medium">Loading more products...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* End of Results Indicator */}
      {!hasMore && products.length > 0 && !isLoading && (
        <div className="flex justify-center py-8">
          <div className="bg-linear-to-r from-gray-100 to-gray-200 rounded-full px-6 py-3 shadow-sm">
            <span className="text-gray-600 font-medium">🎉 You've seen all our products!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;