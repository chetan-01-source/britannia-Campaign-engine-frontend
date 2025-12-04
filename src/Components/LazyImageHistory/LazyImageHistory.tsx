import React, { useState, useRef, useCallback } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

const LazyImageHistory: React.FC<LazyImageProps> = ({ src, alt, className = "", fallback }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (imgRef.current) {
      // Disconnect previous observer
    }
    
    if (node) {
      imgRef.current = node;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: '100px',
          threshold: 0.1,
        }
      );
      
      observer.observe(node);
      
      return () => observer.disconnect();
    }
  }, [isVisible]);

  const handleImageLoad = () => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 800);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  if (imageError) {
    return (
      <div className="w-full h-full bg-linear-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
        {fallback || (
          <div className="text-gray-300 text-4xl">🖼️</div>
        )}
      </div>
    );
  }

  return (
    <div ref={setRef} className="relative w-full h-full">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse overflow-hidden">
          {/* Shimmer effect */}
          <div 
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent transform -skew-x-12"
            style={{
              animation: 'shimmer 1.5s ease-in-out infinite'
            }}
          ></div>
        </div>
      )}
      
      {isVisible && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default LazyImageHistory;