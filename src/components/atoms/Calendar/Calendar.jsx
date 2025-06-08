import React, { useState, useEffect, useRef } from 'react';
import styles from './Calendar.module.scss';
import rightBlack from '@/assets/img/right-black.png';

const Calendar = ({ selectedRange, onSelectRange }) => {
  const today = new Date();
  const [daysToShow, setDaysToShow] = useState([]);
  const scrollContainerRef = useRef(null);
  const [currentMonthLabel, setCurrentMonthLabel] = useState('');
  
  useEffect(() => {
    const generateDays = () => {
      const days = [];
      const totalDays = 360;
      const startDate = new Date();
      startDate.setDate(today.getDate());
      
      let currentMonth = null;
      
      for (let i = 0; i < totalDays; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        days.push({ date });
      }
      
      setDaysToShow(days);
    };
    
    generateDays();
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const todayElement = scrollContainerRef.current.querySelector('.today');
      if (todayElement) {
        todayElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [daysToShow]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const children = container.children;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const rect = child.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        if (rect.left >= containerRect.left) {
          const label = daysToShow[i]?.date?.toLocaleString('ru', { month: 'long' });
          if (label) setCurrentMonthLabel(label);
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [daysToShow]);

  const isSameDay = (d1, d2) =>
    d1 && d2 &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isInRange = (date) => {
    if (selectedRange.length === 2) {
      return date > selectedRange[0] && date < selectedRange[1];
    }
    return false;
  };

  const handleDayClick = (date) => {
    if (selectedRange.length === 0 || selectedRange.length === 2) {
      onSelectRange([date]);
    } else if (selectedRange.length === 1) {
      const [start] = selectedRange;
      if (date < start) onSelectRange([date, start]);
      else onSelectRange([start, date]);
    }
  };

  const scrollDays = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction * 200,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button className={styles.navButton} onClick={() => scrollDays(-1)}>
          <img src={rightBlack} alt="left" style={{ transform: 'rotate(180deg)' }} />
        </button>

        <div className={styles.monthSticky}>
          {currentMonthLabel}
        </div>

        <div ref={scrollContainerRef} className={styles.daysContainer}>
          {daysToShow.map((day, index) => (
            <div key={index} className={styles.dayWrapper}>
              <div
                className={`${styles.day} 
                  ${isSameDay(day.date, selectedRange[0]) ? styles.selected : ''} 
                  ${isSameDay(day.date, selectedRange[1]) ? styles.selected : ''}
                  ${isInRange(day.date) ? styles.inRange : ''}
                  ${isSameDay(day.date, today) ? styles.today : ''}`}
                onClick={() => handleDayClick(day.date)}
              >
                <div className={styles.dayNumber}>{day.date.getDate()}</div>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.navButton} onClick={() => scrollDays(1)}>
          <img src={rightBlack} alt="right" />
        </button>
      </div>
    </div>
  );
};

export default Calendar;