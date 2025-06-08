import React, { useState, useEffect, useRef, useCallback } from 'react';
import rightBlack from '@/assets/img/right-black.png';
import styles from './Slider.module.scss';

const Slider = ({ 
  items = [],
  value: propValue = 0,
  onChange,
  className = '',
  disabled = false
}) => {
  const [selectedIndex, setSelectedIndex] = useState(propValue);
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  const scrollToSelected = useCallback(() => {
    if (!trackRef.current || !wrapperRef.current || items.length === 0) return;
    
    const selectedElement = trackRef.current.children[selectedIndex];
    if (!selectedElement) return;

    const itemWidth = selectedElement.offsetWidth;
    const containerWidth = wrapperRef.current.offsetWidth;
    const elementLeft = selectedElement.offsetLeft;
    const centerOffset = elementLeft - (containerWidth / 2) + (itemWidth / 2);

    trackRef.current.style.transform = `translateX(${-centerOffset}px)`;
  }, [selectedIndex, items]);

  useEffect(() => {
    setSelectedIndex(propValue);
  }, [propValue]);

  useEffect(() => {
    scrollToSelected();
  }, [selectedIndex, items, scrollToSelected]);

  useEffect(() => {
    const handleResize = () => {
      scrollToSelected();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollToSelected]);

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      onChange?.(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedIndex < items.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
      onChange?.(newIndex);
    }
  };

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    onChange?.(index);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    }).replace('.', '');
  };

  const formatFullDate = (date) => {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short'
    }).replace('.', '');
  };

  const formatWeekday = (date) => {
    return date.toLocaleDateString('ru-RU', { weekday: 'short' });
  };

  return (
    <div className={`${styles.sliderContainer} ${className} ${disabled ? styles.disabled : ''}`}>
      <button 
        className={styles.navButton}
        onClick={handlePrev}
        disabled={selectedIndex === 0 || disabled}
      >
        <img src={rightBlack} alt="Назад" className={`${styles.arrowIcon} ${styles.leftArrow}`} />
      </button>

      <div className={styles.sliderWrapper} ref={wrapperRef}>
        <div className={styles.track} ref={trackRef}>
          {items.map((item, index) => (
            <div
              key={`${item.type}-${item.value}`}
              className={`${styles.item} ${item.type === 'hour' ? styles.hourItem : styles.dayItem} ${index === selectedIndex ? styles.active : ''}`}
              onClick={() => handleItemClick(index)}
            >
              {index === selectedIndex ? (
                <div className={styles.selected}>
                  <span className={styles.dateText}>
                    {formatFullDate(item.time)}
                  </span>
                  <span className={styles.timeText}>
                    {item.type === 'hour' ? formatTime(item.time) : formatWeekday(item.time)}
                  </span>
                </div>
              ) : (
                <div className={styles.normal}>
                  <span className={`${styles.dateText} ${styles.hoverable}`}>
                    {formatFullDate(item.time)}
                  </span>
                  <span className={`${styles.timeText} ${styles.hoverable}`}>
                    {item.type === 'hour' ? formatTime(item.time) : formatWeekday(item.time)}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button 
        className={styles.navButton}
        onClick={handleNext}
        disabled={selectedIndex === items.length - 1 || disabled}
      >
        <img src={rightBlack} alt="Вперёд" className={styles.arrowIcon} />
      </button>
    </div>
  );
};

export default Slider;