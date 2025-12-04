import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getCampaignHistory } from '../../services/campaignHistoryService';
import type { CampaignHistoryItem } from '../../services/campaignHistoryService';
import CampaignPost from '../CampaignPost/CampaignPost';
import Toast from '../Toast/Toast';

interface CampaignHistoryProps {
  onBack: () => void;
}

const CampaignHistory: React.FC<CampaignHistoryProps> = ({ onBack }) => {
  const [campaigns, setCampaigns] = useState<CampaignHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning'; isVisible: boolean }>({ 
    message: '', 
    type: 'success', 
    isVisible: false 
  });

  const observerTarget = useRef<HTMLDivElement>(null);
  const LIMIT = 6;

  const showToast = (message: string, type: 'success' | 'error' | 'warning') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const loadCampaigns = useCallback(async (page: number, isAppending = false) => {
    if (!isAppending) {
      setInitialLoading(true);
    } else {
      setLoading(true);
    }
    
    setError(null);

    try {
      const response = await getCampaignHistory(page, LIMIT);
      
      if (response.success) {
        if (isAppending) {
          setCampaigns(prev => [...prev, ...response.data]);
        } else {
          setCampaigns(response.data);
        }
        
        setTotalCount(response.totalCount);
        setHasMore(response.pagination.hasNext);
        setCurrentPage(page);
      } else {
        throw new Error('Failed to fetch campaign history');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load campaign history';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      
      if (!isAppending) {
        setCampaigns([]);
      }
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  const loadMoreCampaigns = useCallback(() => {
    if (!loading && hasMore) {
      loadCampaigns(currentPage + 1, true);
    }
  }, [loading, hasMore, currentPage, loadCampaigns]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          loadMoreCampaigns();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, loadMoreCampaigns]);

  // Initial load
  useEffect(() => {
    loadCampaigns(1);
  }, [loadCampaigns]);

  const handleRetry = () => {
    setCampaigns([]);
    setCurrentPage(1);
    setHasMore(true);
    loadCampaigns(1);
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 via-yellow-50 to-orange-50">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-18">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="text-gray-600 font-medium">Back to Products</span>
                </button>
              </div>
              <div className="text-center">
                <h1 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-red-700 to-red-900 bg-clip-text text-transparent">
                  Campaign History
                </h1>
              </div>
              <div className="w-32"></div>
            </div>
          </div>
        </header>

        {/* Loading State */}
        <div className="flex justify-center items-center py-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Loading Campaign History...</h3>
            <p className="text-gray-500">Please wait while we fetch your campaigns</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-yellow-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex items-center space-x-2"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-gray-600 font-medium">Back to Products</span>
              </button>
            </div>
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-red-700 to-red-900 bg-clip-text text-transparent">
                Campaign History
              </h1>
              {totalCount > 0 && (
                <p className="text-sm text-gray-600">
                  {totalCount} campaign{totalCount !== 1 ? 's' : ''} generated
                </p>
              )}
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && campaigns.length === 0 && (
          <div className="text-center py-24">
            <div className="w-32 h-32 bg-linear-to-br from-red-100 to-red-200 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg">
              <div className="text-8xl">⚠️</div>
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-4">Failed to Load Campaigns</h3>
            <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!error && campaigns.length === 0 && !initialLoading && (
          <div className="text-center py-24">
            <div className="w-32 h-32 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-lg">
              <div className="text-8xl">📊</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-4">No Campaigns Yet</h3>
            <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto leading-relaxed">
              You haven't generated any campaigns yet. Start creating some amazing content!
            </p>
            <button
              onClick={onBack}
              className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Create Your First Campaign
            </button>
          </div>
        )}

        {/* Campaigns Grid */}
        {campaigns.length > 0 && (
          <div className="space-y-8">
            {/* Stats Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{totalCount}</div>
                  <div className="text-sm text-gray-600">Total Campaigns</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {campaigns.filter(c => c.platform === 'instagram').length}
                  </div>
                  <div className="text-sm text-gray-600">Instagram Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {campaigns.filter(c => c.platform === 'linkedin').length}
                  </div>
                  <div className="text-sm text-gray-600">LinkedIn Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {campaigns.filter(c => c.platform === 'email').length}
                  </div>
                  <div className="text-sm text-gray-600">Email Campaigns</div>
                </div>
              </div>
            </div>

            {/* Campaigns List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {campaigns.map((campaign) => (
                <CampaignPost 
                  key={campaign._id} 
                  campaign={campaign} 
                />
              ))}
            </div>

            {/* Loading More Indicator */}
            {loading && (
              <div className="flex justify-center py-8">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Loading more campaigns...</p>
                </div>
              </div>
            )}

            {/* End of Results */}
            {!hasMore && campaigns.length > 0 && (
              <div className="text-center py-8">
                <div className="bg-linear-to-r from-gray-100 to-gray-200 rounded-full px-6 py-3 shadow-sm inline-block">
                  <span className="text-gray-600 font-medium">🎉 You've seen all campaigns!</span>
                </div>
              </div>
            )}

            {/* Infinite Scroll Target */}
            <div ref={observerTarget} className="h-4" />
          </div>
        )}
      </main>

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

export default CampaignHistory;