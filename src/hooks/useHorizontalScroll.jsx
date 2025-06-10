import { useRef, useState, useEffect } from 'react';

const SCROLL_AMOUNT = 150;

const useHorizontalScroll = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef?.addEventListener('scroll', checkScrollPosition);
    
    // Проверяем позицию при изменении элементов
    checkScrollPosition();
    
    return () => {
      currentRef?.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return {
    scrollRef,
    showLeftArrow,
    showRightArrow,
    scrollLeft,
    scrollRight
  };
};

export default useHorizontalScroll;