import React, { useState } from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
  logo?: string;
  onCampaignClick?: () => void;
  onHistoryClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onSearchSubmit, logo, onCampaignClick, onHistoryClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  const handleCampaignClick = () => {
    if (onCampaignClick) {
      onCampaignClick();
    }
    setIsMobileMenuOpen(false);
  };

  const handleHistoryClick = () => {
    if (onHistoryClick) {
      onHistoryClick();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-3 lg:space-x-4 shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-white via-yellow-50 to-yellow-100 rounded-xl lg:rounded-2xl p-1.5 lg:p-2 shadow-lg border-2 border-yellow-400/30 hover:shadow-xl transition-all duration-300">
              {logo ? (
                <img 
                  src={logo} 
                  alt="Britannia Logo" 
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              ) : (
                <span className="text-red-600 font-bold text-sm lg:text-lg flex items-center justify-center h-full">B</span>
              )}
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-2xl xl:text-3xl font-bold bg-linear-to-r from-red-700 to-red-900 bg-clip-text text-transparent">
                Britannia
              </h1>
              <p className="text-xs lg:text-sm text-gray-600 font-medium -mt-1">Campaign Engine</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md lg:max-w-xl xl:max-w-2xl mx-4 lg:mx-6 xl:mx-8">
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 lg:pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search products..."
                  className="block w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-2 lg:py-2.5 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 text-sm placeholder-gray-500"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-3 lg:pr-4 flex items-center"
                  >
                    <svg className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-3 shrink-0">
            <button 
              onClick={handleCampaignClick}
              className="hidden md:flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs lg:text-sm">Campaign</span>
            </button>
            
            <button 
              onClick={handleHistoryClick}
              className="hidden lg:flex items-center space-x-1 lg:space-x-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs lg:text-sm">History</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden z-40">
              <div className="flex flex-col space-y-2 p-4">
                <button 
                  onClick={handleCampaignClick}
                  className="flex items-center space-x-2 w-full px-4 py-3 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generate Campaign</span>
                </button>
                <button 
                  onClick={handleHistoryClick}
                  className="flex items-center space-x-2 w-full px-4 py-3 bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium rounded-lg transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Campaign History</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;