import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element enters or leaves the viewport.
 * @param {Object} options - IntersectionObserver configuration options.
 * @param {number} options.threshold - Trigger threshold between 0 and 1. Default: 0.15.
 * @param {string} options.rootMargin - Margin around the root. Default: '0px 0px -40px 0px'.
 * @param {boolean} options.triggerOnce - Whether the animation should only trigger once. Default: true.
 * @returns {[React.RefObject, boolean]} - Element ref and boolean state.
 */
export const useInView = (options = {}) => {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -40px 0px',
    triggerOnce = true
  } = options;

  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          observer.unobserve(element);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    }, {
      threshold,
      rootMargin
    });

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [elementRef, isInView];
};

export default useInView;
