import { useEffect, useCallback, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 200
}: UseInfiniteScrollOptions) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const lastLoadTime = useRef(0);

  const handleScroll = useCallback(() => {
    if (!hasMore || isLoading || loadingRef.current) return;

    const now = Date.now();
    // Minimum 1 second between loads
    if (now - lastLoadTime.current < 1000) return;

    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - threshold) {
      loadingRef.current = true;
      lastLoadTime.current = now;
      onLoadMore();
      
      // Reset loading flag after a delay to prevent rapid firing
      setTimeout(() => {
        loadingRef.current = false;
      }, 1500);
    }
  }, [hasMore, isLoading, onLoadMore, threshold]);

  // Throttled scroll handler
  const throttledHandleScroll = useCallback(() => {
    requestAnimationFrame(handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [throttledHandleScroll]);

  // Intersection Observer approach (primary method)
  useEffect(() => {
    const currentSentinel = sentinelRef.current;
    if (!currentSentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading && !loadingRef.current) {
          const now = Date.now();
          // Minimum 1 second between loads
          if (now - lastLoadTime.current < 1000) return;
          
          loadingRef.current = true;
          lastLoadTime.current = now;
          onLoadMore();
          
          // Reset loading flag after a delay
          setTimeout(() => {
            loadingRef.current = false;
          }, 1500);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, [hasMore, isLoading, onLoadMore]);

  return { sentinelRef };
};