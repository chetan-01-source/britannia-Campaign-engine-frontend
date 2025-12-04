import React, { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallback,
  rootMargin = "50px",
  threshold = 0.1
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, isVisible]);

  const handleImageLoad = () => {
    // Add 1-second delay to show skeleton loader
    setTimeout(() => {
      setImageLoaded(true);
    }, 1000);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  if (imageError) {
    return (
      <div className="w-full h-full bg-linear-to-br from-gray-50 via-yellow-50/30 to-gray-100 flex items-center justify-center">
        {fallback || (
          <div className="text-gray-300 text-6xl group-hover:scale-110 transition-transform duration-300">📦</div>
        )}
      </div>
    );
  }

  return (
    <div ref={imgRef} className="relative w-full h-full">
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

export default LazyImage;