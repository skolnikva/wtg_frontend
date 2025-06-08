import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '@organisms/Events/EventCard/EventCard';
import styles from './CategoryEventsSection.module.scss';
import rightBlack from '@/assets/img/right-black.png';
import rightGray from '@/assets/img/right-gray.png';
import Typography from '@atoms/Text/Typography/Typography';

const CARD_WIDTH = 308;
const GAP = 15;

const CategoryEventsSection = ({ categoryId, categoryName, events = [] }) => {
  const containerRef = useRef(null);
  const [page, setPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [transitionDirection, setTransitionDirection] = useState('right');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const maxCards = Math.floor((containerWidth + GAP) / (CARD_WIDTH + GAP));
      setCardsPerPage(prev => {
        const totalPages = Math.ceil(events.length / maxCards);
        if (page >= totalPages) {
          setPage(Math.max(0, totalPages - 1));
        }
        return maxCards;
      });
    };

    const observer = new ResizeObserver(updateCardsPerPage);
    if (containerRef.current) observer.observe(containerRef.current);

    updateCardsPerPage();

    return () => observer.disconnect();
  }, [events.length, page]);

  const totalPages = Math.ceil(events.length / cardsPerPage);
  const startIndex = page * cardsPerPage;
  const pagedEvents = events.slice(startIndex, startIndex + cardsPerPage);

  const canGoPrev = page > 0;
  const canGoNext = page < totalPages - 1;

  const handleCategoryClick = () => {
    navigate(`/category/${categoryName}/${categoryId}`);
  };

  const goToPage = (newPage, direction) => {
    if (isTransitioning || newPage < 0 || newPage >= totalPages) return;
    
    setTransitionDirection(direction > 0 ? 'right' : 'left');
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.headerRow}>
        <div
          className={styles.categoryLink}
          onClick={handleCategoryClick}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCategoryClick(); }}
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
        >
          <Typography variant="h1" className={styles.title}>
            {categoryName}
          </Typography>
          <img src={rightBlack} alt="Перейти в категорию" className={styles.rightArrow} />
        </div>
        <div className={styles.pagination}>
          <button
            className={styles.arrowButton}
            onClick={() => canGoPrev && setPage(page - 1)}
            disabled={!canGoPrev}
            aria-label="Предыдущая страница"
          >
            <img
              src={canGoPrev ? rightBlack : rightGray}
              alt="стрелка влево"
              className={styles.leftArrow}
            />
          </button>
          <button
            className={styles.arrowButton}
            onClick={() => canGoNext && setPage(page + 1)}
            disabled={!canGoNext}
            aria-label="Следующая страница"
          >
            <img
              src={canGoNext ? rightBlack : rightGray}
              alt="стрелка вправо"
            />
          </button>
        </div>
      </div>

      <div className={`${styles.gridContainer} ${isTransitioning ? styles[transitionDirection] : ''}`}>
        <div className={styles.grid}>
          {pagedEvents.map(event => (
            <EventCard key={event.id} event={event} origin={null}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryEventsSection;
