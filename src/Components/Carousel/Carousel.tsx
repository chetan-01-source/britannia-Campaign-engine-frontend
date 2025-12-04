import React, { useState, useEffect } from 'react';

interface CarouselItem {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoSlide?: boolean;
  slideInterval?: number;
  onSlideChange?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ 
  items, 
  autoSlide = true, 
  slideInterval = 4000,
  onSlideChange 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (autoSlide && items.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
      }, slideInterval);

      return () => clearInterval(interval);
    }
  }, [autoSlide, slideInterval, items.length]);

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  if (!items || items.length === 0) {
    return (
      <div className="relative w-full h-96 bg-linear-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
        <div className="text-gray-400 text-xl">No carousel items available</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-2xl shadow-xl bg-white group">
      {/* Carousel Items */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="min-w-full h-full relative flex items-center justify-center bg-linear-to-br from-red-50 via-yellow-50 to-red-100"
          >
            {/* Background Image */}
            {item.image && (
              <div className="absolute inset-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
            )}
            
            {/* Content Overlay */}
            <div className="relative z-10 text-center text-white px-8 max-w-4xl">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-200 text-sm font-medium mb-4 backdrop-blur-sm">
                {item.category}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {item.title}
              </h2>
              <p className="text-lg md:text-xl mb-6 drop-shadow-md max-w-2xl mx-auto">
                {item.description}
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explore Products
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {items.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;