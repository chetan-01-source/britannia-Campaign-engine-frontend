import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="relative w-full h-56 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 overflow-hidden">
        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent transform -skew-x-12"
          style={{
            animation: 'shimmer 1.5s ease-in-out infinite'
          }}
        ></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title Skeleton */}
        <div className="mb-4">
          <div className="h-6 bg-gray-300 rounded-md mb-3 w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded-full w-24"></div>
        </div>
        
        {/* Description Skeleton */}
        <div className="mb-6 grow">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
        
        {/* Button Skeleton */}
        <div className="mt-auto">
          <div className="w-full h-14 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;