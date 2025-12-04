import React, { useState, useEffect } from 'react';
import { generateBranding } from '../../services/brandingService';
import type { BrandingResponse } from '../../services/brandingService';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  isProductNameEditable?: boolean;
  availableProducts?: Array<{ id: string; name: string; }>;
  onSubmit: (campaignData: CampaignFormData) => void;
  onResult: (result: BrandingResponse) => void;
  onError: (message: string) => void;
}

export interface CampaignFormData {
  productName: string;
  tone: 'youth' | 'family' | 'professional' | 'health' | 'traditional';
  platform: 'instagram' | 'linkedin' | 'email';
  style: 'minimalist' | 'vibrant' | 'premium' | 'playful';
  flavor: string;
}

const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  productName = '',
  isProductNameEditable = false,
  availableProducts = [],
  onSubmit,
  onResult,
  onError
}) => {
  const [formData, setFormData] = useState<CampaignFormData>({
    productName: productName,
    tone: 'youth',
    platform: 'instagram',
    style: 'minimalist',
    flavor: ''
  });

  const [showProductSuggestions, setShowProductSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(availableProducts);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        productName: productName
      }));
    }
  }, [isOpen, productName]);

  useEffect(() => {
    if (isProductNameEditable && formData.productName) {
      const filtered = availableProducts.filter(product =>
        product.name.toLowerCase().includes(formData.productName.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(availableProducts);
    }
  }, [formData.productName, availableProducts, isProductNameEditable]);

  const handleInputChange = (field: keyof CampaignFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProductSelect = (product: { id: string; name: string }) => {
    setFormData(prev => ({
      ...prev,
      productName: product.name
    }));
    setShowProductSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.productName.trim()) {
      onError('Please enter a product name');
      return;
    }

    if (!formData.flavor.trim()) {
      onError('Please enter a flavor/context');
      return;
    }

    if (typeof formData.flavor !== 'string') {
      onError('Flavor must be a text value, not a number');
      return;
    }

    setIsSubmitting(true);
    try {
      // Call onSubmit for any custom handling
      onSubmit(formData);
      
      // Make API call
      const result = await generateBranding({
        productName: formData.productName,
        tone: formData.tone,
        platform: formData.platform,
        style: formData.style,
        flavor: formData.flavor
      });
      
      // Handle success
      onResult(result);
      onClose();
    } catch (error) {
      console.error('Error generating campaign:', error);
      onError(error instanceof Error ? error.message : 'Failed to generate campaign. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Generate Campaign</h2>
            <p className="text-sm text-gray-600 mt-1">Create targeted marketing content</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Name */}
          <div className="relative">
            <label htmlFor="productName" className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              value={formData.productName}
              onChange={(e) => {
                handleInputChange('productName', e.target.value);
                if (isProductNameEditable) {
                  setShowProductSuggestions(true);
                }
              }}
              onFocus={() => isProductNameEditable && setShowProductSuggestions(true)}
              disabled={!isProductNameEditable}
              placeholder={isProductNameEditable ? "Type to search products..." : ""}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 ${
                !isProductNameEditable ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
              }`}
            />
            
            {/* Product Suggestions */}
            {isProductNameEditable && showProductSuggestions && filteredProducts.length > 0 && formData.productName && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-40 overflow-y-auto">
                {filteredProducts.slice(0, 5).map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => handleProductSelect(product)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="font-medium text-gray-900">{product.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tone */}
          <div>
            <label htmlFor="tone" className="block text-sm font-semibold text-gray-700 mb-2">
              Tone
            </label>
            <select
              id="tone"
              value={formData.tone}
              onChange={(e) => handleInputChange('tone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white"
            >
              <option value="youth">Youth</option>
              <option value="family">Family</option>
              <option value="professional">Professional</option>
              <option value="health">Health</option>
              <option value="traditional">Traditional</option>
            </select>
          </div>

          {/* Platform */}
          <div>
            <label htmlFor="platform" className="block text-sm font-semibold text-gray-700 mb-2">
              Platform
            </label>
            <select
              id="platform"
              value={formData.platform}
              onChange={(e) => handleInputChange('platform', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white"
            >
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="email">Email</option>
            </select>
          </div>

          {/* Style */}
          <div>
            <label htmlFor="style" className="block text-sm font-semibold text-gray-700 mb-2">
              Style
            </label>
            <select
              id="style"
              value={formData.style}
              onChange={(e) => handleInputChange('style', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white"
            >
              <option value="minimalist">Minimalist</option>
              <option value="vibrant">Vibrant</option>
              <option value="premium">Premium</option>
              <option value="playful">Playful</option>
            </select>
          </div>

          {/* Flavor */}
          <div>
            <label htmlFor="flavor" className="block text-sm font-semibold text-gray-700 mb-2">
              Flavor/Context
            </label>
            <input
              id="flavor"
              type="text"
              value={formData.flavor}
              onChange={(e) => handleInputChange('flavor', e.target.value)}
              placeholder="e.g., limited edition, new launch, festive special..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !formData.productName.trim()}
            className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <div className="text-center">
                  <span className="block">Generating Branding...</span>
                  <span className="block text-xs opacity-75">This may take a moment</span>
                </div>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Generate Branding</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignModal;