import React, { useState } from 'react';
import type { ProductCardProps } from '../../interfaces';
import LazyImage from './LazyImage';

const ProductCard: React.FC<ProductCardProps> = ({ product, onGenerateCampaign }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100; // Character limit for description
  
  // Safe handling of description - provide fallback if undefined
  const description = product.description || '';
  const needsExpansion = description.length > maxLength;
  
  const displayDescription = needsExpansion && !isExpanded 
    ? `${description.slice(0, maxLength)}...`
    : description;
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-yellow-300/50 transform hover:-translate-y-2 hover:scale-[1.02] flex flex-col">
      {/* Product Image */}
      <div className="relative w-full h-56 bg-linear-to-br from-gray-50 via-yellow-50/30 to-gray-100 flex items-center justify-center overflow-hidden shrink-0">
        {product.image ? (
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            fallback={
              <div className="text-gray-300 text-6xl group-hover:scale-110 transition-transform duration-300">📦</div>
            }
          />
        ) : (
          <div className="text-gray-300 text-6xl group-hover:scale-110 transition-transform duration-300">📦</div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Product Info */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title and Category */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-red-700 transition-colors duration-300 mb-3">
            {product.name || 'Unnamed Product'}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200">
              {product.category || 'Uncategorized'}
            </span>
          </div>
        </div>
        
        {/* Description with Read More */}
        <div className={`mb-6 transition-all duration-300 ${isExpanded ? 'grow' : ''}`}>
          <p className="text-sm text-gray-600 leading-relaxed">
            {displayDescription}
          </p>
          {needsExpansion && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200 mt-2 inline-flex items-center space-x-1"
            >
              <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Generate Campaign Button - Always at bottom */}
        <div className="mt-auto">
          <button
            onClick={() => onGenerateCampaign(product.id)}
            className="w-full bg-linear-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-red-500/25 active:scale-95"
          >
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Campaign</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;