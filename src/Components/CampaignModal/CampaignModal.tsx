import React, { useState, useEffect, useRef } from 'react';
import { generateBrandingStream } from '../../services/brandingStreamService';
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

const STAGE_LABELS: Record<string, string> = {
  connected: 'Connecting...',
  validation: 'Validating input...',
  caption: 'Generating caption...',
  rateLimit: 'Checking availability...',
  image: 'Creating image (this may take a minute)...',
  upload: 'Uploading to cloud...',
  save: 'Saving results...',
  complete: 'Done!'
};

const STAGE_ICONS: Record<string, string> = {
  connected: 'M13 10V3L4 14h7v7l9-11h-7z',
  validation: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  caption: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  rateLimit: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  image: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  upload: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
  save: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4',
  complete: 'M5 13l4 4L19 7'
};

const StreamingProgress: React.FC<{
  progress: number;
  currentStage: string;
  partialCaption: string;
  partialHashtags: string[];
  partialCta: string;
  partialImageUrl: string;
  queuePosition: number | null;
  onCancel: () => void;
}> = ({ progress, currentStage, partialCaption, partialHashtags, partialCta, partialImageUrl, queuePosition, onCancel }) => {
  const currentStageKey = Object.entries(STAGE_LABELS).find(([, label]) => label === currentStage)?.[0] || 'connected';
  const iconPath = STAGE_ICONS[currentStageKey] || STAGE_ICONS.connected;

  return (
    <div className="p-6 space-y-6">
      {/* Progress Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-linear-to-br from-red-100 to-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900">Generating Your Campaign</h3>
        <p className="text-sm text-gray-500 mt-1">Sit back while we craft your content</p>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{currentStage}</span>
          <span className="text-sm font-bold text-red-600">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-red-500 via-red-600 to-yellow-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stage Indicators */}
      <div className="grid grid-cols-4 gap-2">
        {['caption', 'image', 'upload', 'save'].map((stage) => {
          const stageProgress = getStageStatus(stage, currentStageKey, progress);
          return (
            <div key={stage} className="text-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 transition-all duration-300 ${
                stageProgress === 'complete' ? 'bg-green-100 text-green-600' :
                stageProgress === 'active' ? 'bg-red-100 text-red-600 animate-pulse' :
                'bg-gray-100 text-gray-400'
              }`}>
                {stageProgress === 'complete' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={STAGE_ICONS[stage]} />
                  </svg>
                )}
              </div>
              <span className="text-[10px] text-gray-500 capitalize">{stage}</span>
            </div>
          );
        })}
      </div>

      {/* Queue Position */}
      {queuePosition !== null && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
          <p className="text-sm text-yellow-800 font-medium">
            Queue position: #{queuePosition}
          </p>
          <p className="text-xs text-yellow-600 mt-1">Please wait, your request is being processed</p>
        </div>
      )}

      {/* Partial Caption Preview */}
      {partialCaption && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-green-800">Caption Ready!</span>
          </div>
          <p className="text-sm text-green-900 leading-relaxed line-clamp-4">{partialCaption}</p>
          {partialHashtags.length > 0 && (
            <p className="text-xs text-blue-600 mt-2">{partialHashtags.join(' ')}</p>
          )}
          {partialCta && (
            <p className="text-xs text-gray-600 mt-1 font-medium">CTA: {partialCta}</p>
          )}
        </div>
      )}

      {/* Partial Image Preview */}
      {partialImageUrl && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold text-blue-800">Image Ready!</span>
          </div>
          <img
            src={partialImageUrl}
            alt="Generated campaign"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Cancel Button */}
      <button
        onClick={onCancel}
        className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 text-sm font-medium"
      >
        Cancel Generation
      </button>
    </div>
  );
};

function getStageStatus(stage: string, currentStageKey: string, progress: number): 'pending' | 'active' | 'complete' {
  const stageOrder = ['connected', 'validation', 'caption', 'rateLimit', 'image', 'upload', 'save', 'complete'];
  const stageIndex = stageOrder.indexOf(stage);
  const currentIndex = stageOrder.indexOf(currentStageKey);

  if (progress >= 100) return 'complete';
  if (stageIndex < currentIndex) return 'complete';
  if (stageIndex === currentIndex) return 'active';
  return 'pending';
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

  // Streaming state
  const [streamPhase, setStreamPhase] = useState<'form' | 'generating'>('form');
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState('');
  const [partialCaption, setPartialCaption] = useState('');
  const [partialHashtags, setPartialHashtags] = useState<string[]>([]);
  const [partialCta, setPartialCta] = useState('');
  const [partialImageUrl, setPartialImageUrl] = useState('');
  const [queuePosition, setQueuePosition] = useState<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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

  const resetStreamState = () => {
    setStreamPhase('form');
    setProgress(0);
    setCurrentStage('');
    setPartialCaption('');
    setPartialHashtags([]);
    setPartialCta('');
    setPartialImageUrl('');
    setQueuePosition(null);
  };

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

    onSubmit(formData);

    // Start streaming
    setStreamPhase('generating');
    setProgress(0);
    setCurrentStage(STAGE_LABELS.connected);
    setPartialCaption('');
    setPartialHashtags([]);
    setPartialCta('');
    setPartialImageUrl('');
    setQueuePosition(null);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      await generateBrandingStream(
        {
          productName: formData.productName,
          tone: formData.tone,
          platform: formData.platform,
          style: formData.style,
          flavor: formData.flavor
        },
        {
          onProgress: (prog, stage, status) => {
            if (status === 'complete') setProgress(prog);
            setCurrentStage(STAGE_LABELS[stage] || stage);
            if (stage !== 'rateLimit') setQueuePosition(null);
          },
          onCaptionReady: (caption, hashtags, cta) => {
            setPartialCaption(caption);
            if (hashtags) setPartialHashtags(hashtags);
            if (cta) setPartialCta(cta);
          },
          onImageReady: (url) => {
            setPartialImageUrl(url);
          },
          onComplete: (result) => {
            const brandingResponse: BrandingResponse = {
              success: true,
              message: 'Campaign generated successfully',
              data: result as BrandingResponse['data'],
              timestamp: new Date().toISOString()
            };
            onResult(brandingResponse);
            resetStreamState();
            onClose();
          },
          onError: (errMsg) => {
            onError(errMsg);
            resetStreamState();
          },
          onQueueUpdate: (position, estimatedWait) => {
            setQueuePosition(position);
            setCurrentStage(`In queue: position #${position} (~${Math.ceil(estimatedWait / 1000)}s)`);
          }
        },
        ctrl
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        onError(err.message || 'Something went wrong');
      }
      resetStreamState();
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    resetStreamState();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && streamPhase === 'form') {
      onClose();
    }
  };

  const handleClose = () => {
    if (streamPhase === 'generating') {
      abortRef.current?.abort();
      resetStreamState();
    }
    onClose();
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
            <h2 className="text-2xl font-bold text-gray-900">
              {streamPhase === 'generating' ? 'Generating...' : 'Generate Campaign'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {streamPhase === 'generating'
                ? `${formData.productName} • ${formData.platform}`
                : 'Create targeted marketing content'
              }
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Phase: Streaming Progress */}
        {streamPhase === 'generating' && (
          <StreamingProgress
            progress={progress}
            currentStage={currentStage}
            partialCaption={partialCaption}
            partialHashtags={partialHashtags}
            partialCta={partialCta}
            partialImageUrl={partialImageUrl}
            queuePosition={queuePosition}
            onCancel={handleCancel}
          />
        )}

        {/* Phase: Form */}
        {streamPhase === 'form' && (
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
              disabled={!formData.productName.trim()}
              className="w-full bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Branding</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CampaignModal;
