import React, { useState } from 'react';
import type { CampaignHistoryItem } from '../../services/campaignHistoryService';
import LazyImageHistory from '../LazyImageHistory/LazyImageHistory';

interface CampaignPostProps {
  campaign: CampaignHistoryItem;
}

const InstagramHistoryPost: React.FC<{ campaign: CampaignHistoryItem }> = ({ campaign }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const shouldShowToggle = campaign.generatedCaption.length > maxLength;
  const displayText = isExpanded ? campaign.generatedCaption : campaign.generatedCaption.slice(0, maxLength);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md mx-auto relative">
      {/* Platform Tag */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800 border border-pink-200">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Instagram
        </span>
      </div>
      {/* Instagram Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <div>
            <p className="font-semibold text-sm">britannia_official</p>
            <p className="text-gray-500 text-xs">{campaign.productName}</p>
          </div>
        </div>
        <div className="text-xs text-gray-400">
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
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button className="hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="hover:scale-110 transition-transform duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
          <button className="hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-2">{Math.floor(Math.random() * 5000) + 1000} likes</p>

        {/* Caption */}
        <div className="text-sm">
          <span className="font-semibold">britannia_official</span>{' '}
          <span>
            {displayText}
            {shouldShowToggle && !isExpanded && '...'}
          </span>
          {shouldShowToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-500 ml-1 text-xs font-medium hover:text-gray-700"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="mt-2">
          <div className="flex flex-wrap gap-1">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {campaign.tone}
            </span>
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              {campaign.style}
            </span>
            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
              {campaign.flavor}
            </span>
          </div>
        </div>

        {/* Time */}
        <p className="text-gray-400 text-xs mt-3">
          {new Date(campaign.createdAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
};

const LinkedInHistoryPost: React.FC<{ campaign: CampaignHistoryItem }> = ({ campaign }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const shouldShowToggle = campaign.generatedCaption.length > maxLength;
  const displayText = isExpanded ? campaign.generatedCaption : campaign.generatedCaption.slice(0, maxLength);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-2xl mx-auto relative">
      {/* Platform Tag */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
          </svg>
          LinkedIn
        </span>
      </div>
      {/* LinkedIn Header */}
      <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
        <div className="w-12 h-12 bg-linear-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">B</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Britannia Industries</h3>
          <p className="text-gray-600 text-sm">Food & Beverages • 1,234,567 followers</p>
          <p className="text-gray-500 text-xs">
            {new Date(campaign.createdAt).toLocaleDateString()} • 🌐
          </p>
        </div>
        <div className="text-xs text-gray-400">
          {campaign.productName}
        </div>
      </div>

      {/* LinkedIn Content */}
      <div className="p-6">
        <div className="text-gray-900 text-sm leading-relaxed mb-4">
          {displayText}
          {shouldShowToggle && !isExpanded && '...'}
          {shouldShowToggle && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 ml-1 text-xs font-medium hover:text-blue-700"
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
        
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
            #{campaign.tone}
          </span>
          <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
            #{campaign.style}
          </span>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
            #{campaign.flavor.replace(/\s+/g, '')}
          </span>
        </div>

        {/* Image */}
        <div className="aspect-video rounded-lg overflow-hidden mb-4">
          <LazyImageHistory 
            src={campaign.imageUrl} 
            alt={campaign.productName}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* LinkedIn Actions */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-6 text-gray-600 text-sm">
          <span>👍 ❤️ 🎉 {Math.floor(Math.random() * 500) + 50} reactions</span>
          <span>{Math.floor(Math.random() * 50) + 5} comments</span>
        </div>
      </div>
    </div>
  );
};

const EmailHistoryTemplate: React.FC<{ campaign: CampaignHistoryItem }> = ({ campaign }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  const shouldShowToggle = campaign.generatedCaption.length > maxLength;
  const displayText = isExpanded ? campaign.generatedCaption : campaign.generatedCaption.slice(0, maxLength);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-2xl mx-auto relative">
      {/* Platform Tag */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          Email
        </span>
      </div>
      {/* Email Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="text-sm text-gray-600 mb-2">From: marketing@britannia.co.in</div>
        <h2 className="text-lg font-bold text-gray-900">🎉 {campaign.generatedTagline}</h2>
        <div className="text-sm text-gray-600 mt-1">
          {new Date(campaign.createdAt).toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      {/* Email Content */}
      <div className="p-6">
        {/* Header Image */}
        <div className="aspect-video rounded-lg overflow-hidden mb-6">
          <LazyImageHistory 
            src={campaign.imageUrl} 
            alt={campaign.productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Email Body */}
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-gray-900">{campaign.productName} - {campaign.generatedTagline}</h1>
          
          <div className="text-gray-700 leading-relaxed">
            {displayText}
            {shouldShowToggle && !isExpanded && '...'}
            {shouldShowToggle && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-red-600 ml-1 text-sm font-medium hover:text-red-700"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Campaign Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Campaign Details:</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Tone:</span>
                <p className="text-gray-900 capitalize">{campaign.tone}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Style:</span>
                <p className="text-gray-900 capitalize">{campaign.style}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Theme:</span>
                <p className="text-gray-900">{campaign.flavor}</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center py-4">
            <button className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Explore {campaign.productName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CampaignPost: React.FC<CampaignPostProps> = ({ campaign }) => {
  const renderPost = () => {
    switch (campaign.platform.toLowerCase()) {
      case 'instagram':
        return <InstagramHistoryPost campaign={campaign} />;
      case 'linkedin':
        return <LinkedInHistoryPost campaign={campaign} />;
      case 'email':
        return <EmailHistoryTemplate campaign={campaign} />;
      default:
        return <InstagramHistoryPost campaign={campaign} />;
    }
  };

  return (
    <div className="mb-8">
      {renderPost()}
    </div>
  );
};

export default CampaignPost;