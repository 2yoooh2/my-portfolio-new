import { useState, useEffect, useRef } from 'react';

/**
 * useScrollAnimation 훅
 *
 * Intersection Observer를 사용하여 스크롤 진입 시 애니메이션을 트리거하는 커스텀 훅
 *
 * @param {Object} options - 옵션 객체
 * @param {number} options.threshold - 요소가 화면에 보이는 비율 [Optional, 기본값: 0.1]
 * @param {string} options.rootMargin - 관찰 영역 마진 [Optional, 기본값: '0px']
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 *
 * Example usage:
 * const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
 */
function useScrollAnimation({ threshold = 0.1, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

export default useScrollAnimation;
