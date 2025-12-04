import React, { useState } from 'react';
import britanniaLogo from '../../assets/britannia.png';
import Header from '../Header/Header';
import Carousel from '../Carousel/Carousel';
import ProductGrid from '../ProductGrid/ProductGrid';
import CampaignModal from '../CampaignModal/CampaignModal';
import BrandingResult from '../BrandingResult/BrandingResult';
import CampaignHistory from '../CampaignHistory/CampaignHistory';
import Toast from '../Toast/Toast';
import type { CampaignFormData } from '../CampaignModal/CampaignModal';
import type { BrandingResponse } from '../../services/brandingService';
import { useProducts } from '../../context/ProductsContext';

interface HomeProps {
  onBackToLanding?: () => void;
}

const Home: React.FC<HomeProps> = () => {
  const { 
    products, 
    loading, 
    error, 
    searchQuery, 
    hasMore, 
    initialLoading,
    setSearchQuery, 
    loadMore 
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [isProductNameEditable, setIsProductNameEditable] = useState(false);
  const [brandingResult, setBrandingResult] = useState<BrandingResponse | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning'; isVisible: boolean }>({ 
    message: '', 
    type: 'success', 
    isVisible: false 
  });

  // Sample carousel data - in a real app, this would come from an API
  const carouselItems = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=1200&h=400&fit=crop',
      title: 'Britannia Biscuits',
      description: 'Discover our delicious range of biscuits perfect for every occasion',
      category: 'Biscuits'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=400&fit=crop',
      title: 'Fresh Bread Collection',
      description: 'Soft, fluffy, and fresh bread baked to perfection every day',
      category: 'Bread'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1200&h=400&fit=crop',
      title: 'Dairy Delights',
      description: 'Premium dairy products made with pure milk and love',
      category: 'Dairy'
    }
  ];

  const handleGenerateCampaign = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProductName(product.name);
      setIsProductNameEditable(false);
      setIsModalOpen(true);
    }
  };

  const handleHeaderCampaignClick = () => {
    setSelectedProductName('');
    setIsProductNameEditable(true);
    setIsModalOpen(true);
  };

  const handleCampaignSubmit = async (campaignData: CampaignFormData) => {
    console.log('Campaign Data:', campaignData);
    // This will be handled by the modal's API integration
  };

  const handleBrandingResult = (result: BrandingResponse) => {
    setBrandingResult(result);
    showToast('Campaign generated successfully! 🎉', 'success');
  };

  const handleBrandingError = (message: string) => {
    showToast(message, 'error');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductName('');
  };

  const handleCloseBrandingResult = () => {
    setBrandingResult(null);
  };

  const handleShowHistory = () => {
    setShowHistory(true);
  };

  const handleBackToProducts = () => {
    setShowHistory(false);
  };

  // Convert products to format needed for modal suggestions
  const availableProducts = products.map(product => ({
    id: product.id,
    name: product.name
  }));

  // Show campaign history if requested
  if (showHistory) {
    return <CampaignHistory onBack={handleBackToProducts} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-yellow-50 to-orange-50">
      {/* Header with Search */}
      <Header
        searchTerm={searchQuery}
        onSearchChange={setSearchQuery}
        logo={britanniaLogo}
        onCampaignClick={handleHeaderCampaignClick}
        onHistoryClick={handleShowHistory}
      />

      {/* Main Content */}
      <main>
        {/* Carousel Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Carousel
            items={carouselItems}
          />
        </div>

        {/* Products Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Our Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Search and generate campaigns for Britannia products with our intelligent engine
            </p>
            {products.length > 0 && (
              <div className="mt-4">
                <span className="inline-block bg-linear-to-r from-yellow-100 to-yellow-200 rounded-full px-4 py-2 text-sm font-bold text-yellow-800 border border-yellow-300">
                  {products.length} Products Loaded
                </span>
              </div>
            )}
          </div>

          {/* Products Grid */}
          <div className="mb-8">
            <ProductGrid
              products={products}
              onGenerateCampaign={handleGenerateCampaign}
              isLoading={loading}
              hasMore={hasMore}
              onLoadMore={loadMore}
            />
          </div>

          {/* Initial Loading State */}
          {initialLoading && (
            <div className="flex justify-center py-24">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Loading Products...</h3>
                <p className="text-gray-500">Please wait while we fetch the latest products</p>
              </div>
            </div>
          )}

          {/* Empty State when no search results */}
          {!initialLoading && searchQuery && products.length === 0 && (
            <div className="text-center py-24">
              <div className="w-32 h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                <div className="text-8xl">🔍</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                No products found for "{searchQuery}"
              </h3>
              <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto leading-relaxed">
                Try searching with different keywords or browse all products
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                Clear Search & View All Products
              </button>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-24">
              <div className="w-32 h-32 bg-linear-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg">
                <div className="text-8xl">⚠️</div>
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h3>
              <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto leading-relaxed">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Campaign Modal */}
      <CampaignModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productName={selectedProductName}
        isProductNameEditable={isProductNameEditable}
        availableProducts={availableProducts}
        onSubmit={handleCampaignSubmit}
        onResult={handleBrandingResult}
        onError={handleBrandingError}
      />

      {/* Branding Result Modal */}
      {brandingResult && (
        <BrandingResult
          result={brandingResult}
          onClose={handleCloseBrandingResult}
        />
      )}

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default Home;
