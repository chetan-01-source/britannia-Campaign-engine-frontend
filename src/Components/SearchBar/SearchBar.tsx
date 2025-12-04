import React from 'react';
import type { SearchBarProps } from '../../interfaces';

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "Search products..." 
}) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <svg 
          className="h-6 w-6 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      
      {/* Search Input */}
      <input
        type="text"
        className="block w-full pl-16 pr-16 py-5 border-2 border-gray-200 rounded-full leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 text-gray-900 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-medium"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      
      {/* Clear Button */}
      {searchQuery && (
        <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
          <button
            onClick={() => onSearchChange('')}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;