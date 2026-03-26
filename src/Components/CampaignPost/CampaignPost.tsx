import React, { useState } from 'react';
import type { CampaignHistoryItem } from '../../services/campaignHistoryService';
import LazyImageHistory from '../LazyImageHistory/LazyImageHistory';

interface CampaignPostProps {
  campaign: CampaignHistoryItem;
  onToast?: (message: string, type: 'success' | 'error' | 'warning') => void;
}

const ActionButtons: React.FC<{ campaign: CampaignHistoryItem; onToast?: (message: string, type: 'success' | 'error' | 'warning') => void }> = ({ campaign, onToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(campaign.generatedCaption);
      setCopied(true);
      onToast?.('Caption copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onToast?.('Failed to copy caption', 'error');
    }
  };

  const handleDownloadImage = async () => {
    try {
      const response = await fetch(campaign.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${campaign.productName.replace(/\s+/g, '-')}-campaign.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      onToast?.('Image downloaded!', 'success');
    } catch {
      window.open(campaign.imageUrl, '_blank');
    }
  };

  return (
    <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-3">
      <button
        onClick={handleCopyCaption}
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
      >
        {copied ? (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
        <span>{copied ? 'Copied!' : 'Copy Caption'}</span>
      </button>
      <button
        onClick={handleDownloadImage}
        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all duration-200 text-xs sm:text-sm font-medium"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>Download</span>
      </button>
    </div>
  );
};

const FLAVOR_MAX_LENGTH = 60;

const FlavorText: React.FC<{ flavor: string }> = ({ flavor }) => {
  const [isFlavorExpanded, setIsFlavorExpanded] = useState(false);
  const shouldTruncate = flavor.length > FLAVOR_MAX_LENGTH;
  const displayFlavor = shouldTruncate && !isFlavorExpanded
    ? flavor.slice(0, FLAVOR_MAX_LENGTH) + '...'
    : flavor;

  if (!flavor) return null;

  return (
    <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg p-2 sm:p-2.5">
      <p className="text-[10px] sm:text-xs text-amber-800 leading-relaxed">
        <span className="font-semibold text-amber-900">Context: </span>
        {displayFlavor}
        {shouldTruncate && (
          <button
            onClick={() => setIsFlavorExpanded(!isFlavorExpanded)}
            className="text-amber-600 ml-1 font-medium hover:text-amber-700 underline"
          >
            {isFlavorExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>
    </div>
  );
};

const InstagramHistoryPost: React.FC<{ campaign: CampaignHistoryItem; onToast?: (message: string, type: 'success' | 'error' | 'warning') => void }> = ({ campaign, onToast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const shouldShowToggle = campaign.generatedCaption.length > maxLength;
  const displayText = isExpanded ? campaign.generatedCaption : campaign.generatedCaption.slice(0, maxLength);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden w-full relative">
      {/* Platform Tag */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-pink-100 text-pink-800 border border-pink-200">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram
        </span>
      </div>
      {/* Instagram Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">B</span>
          </div>
          <div>
            <p className="font-semibold text-xs sm:text-sm">britannia_official</p>
            <p className="text-gray-500 text-[10px] sm:text-xs">{campaign.productName}</p>
          </div>
        </div>
        <div className="text-[10px] sm:text-xs text-gray-400">
          {new Date(campaign.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Instagram Image */}
      <div className="aspect-square bg-gray-100">
        <LazyImageHistory
          src={campaign.imageUrl}
          alt={campaign.productName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Instagram Actions */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button className="hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="hover:scale-110 transition-transform duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
          <button className="hover:scale-110 transition-transform duration-200">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Caption */}
        <div className="text-xs sm:text-sm">
          <span className="font-semibold">britannia_official</span>{' '}
          <span>
            {displayText}
            {shouldShowToggle && !isExpanded && '...'}
          </span>
          {shouldShowToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 ml-1 text-[10px] sm:text-xs font-medium hover:text-gray-700"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="mt-2">
          <div className="flex flex-wrap gap-1">
            <span className="inline-block bg-blue-100 text-blue-800 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {campaign.tone}
            </span>
            <span className="inline-block bg-green-100 text-green-800 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {campaign.style}
            </span>
          </div>
        </div>

        {/* Flavor/Context - collapsible */}
        <FlavorText flavor={campaign.flavor} />

        {/* Time */}
        <p className="text-gray-400 text-[10px] sm:text-xs mt-2 sm:mt-3">
          {new Date(campaign.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>

        {/* Action Buttons */}
        <ActionButtons campaign={campaign} onToast={onToast} />
      </div>
    </div>
  );
};

const LinkedInHistoryPost: React.FC<{ campaign: CampaignHistoryItem; onToast?: (message: string, type: 'success' | 'error' | 'warning') => void }> = ({ campaign, onToast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const shouldShowToggle = campaign.generatedCaption.length > maxLength;
  const displayText = isExpanded ? campaign.generatedCaption : campaign.generatedCaption.slice(0, maxLength);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 w-full relative">
      {/* Platform Tag */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
          LinkedIn
        </span>
      </div>
      {/* LinkedIn Header */}
      <div className="flex items-center space-x-2 sm:space-x-3 p-4 sm:p-6 border-b border-gray-200">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm sm:text-base">B</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Britannia Industries</h3>
          <p className="text-gray-600 text-[10px] sm:text-sm truncate">Food & Beverages</p>
          <p className="text-gray-500 text-[10px] sm:text-xs">
            {new Date(campaign.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* LinkedIn Content */}
      <div className="p-4 sm:p-6">
        <div className="text-gray-900 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
          {displayText}
          {shouldShowToggle && !isExpanded && '...'}
          {shouldShowToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 ml-1 text-[10px] sm:text-xs font-medium hover:text-blue-700"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="mb-3 sm:mb-4 flex flex-wrap gap-1.5 sm:gap-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
            #{campaign.tone}
          </span>
          <span className="inline-block bg-green-100 text-green-800 text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium">
            #{campaign.style}
          </span>
        </div>

        {/* Flavor/Context - collapsible */}
        <FlavorText flavor={campaign.flavor} />

        {/* Image */}
        <div className="aspect-video rounded-lg overflow-hidden mb-3 sm:mb-4 mt-3 sm:mt-4">
          <LazyImageHistory
            src={campaign.imageUrl}
            alt={campaign.productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons */}
        <ActionButtons campaign={campaign} onToast={onToast} />
      </div>
    </div>
  );
};

const EmailHistoryTemplate: React.FC<{ campaign: CampaignHistoryItem; onToast?: (message: string, type: 'success' | 'error' | 'warning') => void }> = ({ campaign, onToast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  const shouldShowToggle = campaign.generatedCaption.length > maxLength;
  const displayText = isExpanded ? campaign.generatedCaption : campaign.generatedCaption.slice(0, maxLength);

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 w-full relative">
      {/* Platform Tag */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
        <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-0.5 sm:mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          Email
        </span>
      </div>
      {/* Email Header */}
      <div className="bg-gray-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
        <div className="text-[10px] sm:text-sm text-gray-600 mb-1 sm:mb-2">From: marketing@britannia.co.in</div>
        <h2 className="text-sm sm:text-lg font-bold text-gray-900 pr-16 sm:pr-20">{campaign.generatedTagline}</h2>
        <div className="text-[10px] sm:text-sm text-gray-600 mt-1">
          {new Date(campaign.createdAt).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Email Content */}
      <div className="p-4 sm:p-6">
        {/* Header Image */}
        <div className="aspect-video rounded-lg overflow-hidden mb-4 sm:mb-6">
          <LazyImageHistory
            src={campaign.imageUrl}
            alt={campaign.productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Email Body */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-base sm:text-xl font-bold text-gray-900">{campaign.productName}</h1>

          <div className="text-gray-700 leading-relaxed text-xs sm:text-base">
            {displayText}
            {shouldShowToggle && !isExpanded && '...'}
            {shouldShowToggle && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-red-600 ml-1 text-[10px] sm:text-sm font-medium hover:text-red-700"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Campaign Details */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <h3 className="font-semibold text-gray-900 mb-2 text-xs sm:text-base">Campaign Details:</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-4 text-[10px] sm:text-sm">
              <div>
                <span className="font-medium text-gray-600">Tone:</span>
                <p className="text-gray-900 capitalize">{campaign.tone}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Style:</span>
                <p className="text-gray-900 capitalize">{campaign.style}</p>
              </div>
            </div>
          </div>

          {/* Flavor/Context - collapsible */}
          <FlavorText flavor={campaign.flavor} />

          {/* Action Buttons */}
          <ActionButtons campaign={campaign} onToast={onToast} />
        </div>
      </div>
    </div>
  );
};

const CampaignPost: React.FC<CampaignPostProps> = ({ campaign, onToast }) => {
  const renderPost = () => {
    switch (campaign.platform.toLowerCase()) {
      case 'instagram':
        return <InstagramHistoryPost campaign={campaign} onToast={onToast} />;
      case 'linkedin':
        return <LinkedInHistoryPost campaign={campaign} onToast={onToast} />;
      case 'email':
        return <EmailHistoryTemplate campaign={campaign} onToast={onToast} />;
      default:
        return <InstagramHistoryPost campaign={campaign} onToast={onToast} />;
    }
  };

  return renderPost();
};

export default CampaignPost;
