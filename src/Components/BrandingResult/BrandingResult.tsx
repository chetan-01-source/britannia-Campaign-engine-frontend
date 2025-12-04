import React from 'react';
import type { BrandingResponse } from '../../services/brandingService';

interface BrandingResultProps {
  result: BrandingResponse;
  onClose: () => void;
}

const InstagramPost: React.FC<{ data: BrandingResponse['data'] }> = ({ data }) => (
  <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-md mx-auto">
    {/* Instagram Header */}
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-linear-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">B</span>
        </div>
        <div>
          <p className="font-semibold text-sm">britannia_official</p>
          <p className="text-gray-500 text-xs">Sponsored</p>
        </div>
      </div>
      <button className="text-gray-600">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </div>

    {/* Instagram Image */}
    <div className="aspect-square bg-gray-100">
      <img 
        src={data.imageUrl} 
        alt={data.productName}
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
          <button className="hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
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
      <p className="font-semibold text-sm mb-2">2,847 likes</p>

      {/* Caption */}
      <div className="text-sm">
        <span className="font-semibold">britannia_official</span>{' '}
        <span className="whitespace-pre-line">{data.caption}</span>
      </div>

      {/* Hashtags */}
      <div className="mt-2">
        <span className="text-blue-600 text-sm">
          {data.hashtags.join(' ')}
        </span>
      </div>

      {/* CTA */}
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-800">{data.cta}</p>
      </div>

      {/* Time */}
      <p className="text-gray-400 text-xs mt-3">2 minutes ago</p>
    </div>
  </div>
);

const LinkedInPost: React.FC<{ data: BrandingResponse['data'] }> = ({ data }) => (
  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-2xl mx-auto">
    {/* LinkedIn Header */}
    <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
      <div className="w-12 h-12 bg-linear-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold">B</span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">Britannia Industries</h3>
        <p className="text-gray-600 text-sm">Food & Beverages • 1,234,567 followers</p>
        <p className="text-gray-500 text-xs">2m • 🌐</p>
      </div>
      <button className="text-gray-600 hover:bg-gray-100 p-2 rounded-full">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </div>

    {/* LinkedIn Content */}
    <div className="p-6">
      <div className="text-gray-900 text-sm leading-relaxed whitespace-pre-line mb-4">
        {data.caption}
      </div>
      
      {/* Hashtags */}
      <div className="mb-4">
        <span className="text-blue-600 text-sm font-medium">
          {data.hashtags.join(' ')}
        </span>
      </div>

      {/* Image */}
      <div className="rounded-lg overflow-hidden mb-4">
        <img 
          src={data.imageUrl} 
          alt={data.productName}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-blue-800 font-medium text-sm">{data.cta}</p>
      </div>
    </div>

    {/* LinkedIn Actions */}
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <div className="flex items-center space-x-6 text-gray-600 text-sm">
        <span>👍 ❤️ 🎉 267 reactions</span>
        <span>42 comments</span>
        <span>18 reposts</span>
      </div>
    </div>
    
    <div className="flex items-center justify-around px-6 py-3 border-t border-gray-200">
      {['👍 Like', '💬 Comment', '🔄 Repost', '📤 Send'].map((action) => (
        <button key={action} className="flex items-center space-x-2 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors duration-200">
          <span className="text-sm font-medium">{action}</span>
        </button>
      ))}
    </div>
  </div>
);

const EmailTemplate: React.FC<{ data: BrandingResponse['data'] }> = ({ data }) => (
  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 max-w-2xl mx-auto">
    {/* Email Header */}
    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div className="text-sm text-gray-600 mb-2">From: marketing@britannia.co.in</div>
      <h2 className="text-lg font-bold text-gray-900">🎉 {data.tagline}</h2>
      <div className="text-sm text-gray-600 mt-1">To: you@example.com</div>
    </div>

    {/* Email Content */}
    <div className="p-6">
      {/* Header Image */}
      <div className="rounded-lg overflow-hidden mb-6">
        <img 
          src={data.imageUrl} 
          alt={data.productName}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Email Body */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">{data.tagline}</h1>
        
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {data.caption}
        </div>

        {/* CTA Button */}
        <div className="text-center py-6">
          <button className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            {data.cta}
          </button>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-8 h-8 bg-linear-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-gray-900">Britannia Industries</span>
          </div>
          
          <p className="text-gray-600 text-sm">
            Follow us: {data.hashtags.join(' ')}
          </p>
          
          <p className="text-gray-500 text-xs mt-4">
            This email was sent to you because you subscribed to Britannia updates.
            <br />
            <a href="#" className="text-blue-600 hover:underline">Unsubscribe</a> | 
            <a href="#" className="text-blue-600 hover:underline ml-1">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  </div>
);

const BrandingResult: React.FC<BrandingResultProps> = ({ result, onClose }) => {
  const { data } = result;
  
  const renderPlatformPost = () => {
    switch (data.platform.toLowerCase()) {
      case 'instagram':
        return <InstagramPost data={data} />;
      case 'linkedin':
        return <LinkedInPost data={data} />;
      case 'email':
        return <EmailTemplate data={data} />;
      default:
        return <InstagramPost data={data} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Campaign Generated! 🎉</h2>
            <p className="text-sm text-gray-600 mt-1">
              {data.platform.charAt(0).toUpperCase() + data.platform.slice(1)} • {data.tone.charAt(0).toUpperCase() + data.tone.slice(1)} Tone • {data.style.charAt(0).toUpperCase() + data.style.slice(1)} Style
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Platform Post Preview */}
        <div className="p-8">
          {renderPlatformPost()}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4 p-6 border-t border-gray-200 bg-white rounded-b-3xl">
          <button
            onClick={() => navigator.clipboard.writeText(data.caption)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Copy Caption</span>
          </button>
          
          <button
            onClick={() => window.open(data.imageUrl, '_blank')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Download Image</span>
          </button>
          
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
          >
            <span>Generate New Campaign</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandingResult;