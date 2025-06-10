import React, { useRef } from 'react';
import styles from './SortTemplate.module.scss';
import FullPageModalOverlay from '@templates/FullPageModalOverlay/FullPageModalOverlay';
import Typography from '@atoms/Text/Typography/Typography';
import LittleButtons from '@molecules/Buttons/LittleButtons/LittleButtons';
import EventsGrid from '@organisms/Events/EventsGrid/EventsGrid';
import Calendar from '@atoms/Calendar/Calendar';
import NothingFoundMessage from '@molecules/Events/NothingFoundMessage/NothingFoundMessage';
import rightBlack from '@/assets/img/right-black.png';
import useHorizontalScroll from '@hooks/useHorizontalScroll';

const SortTemplate = ({
  onClose,
  dateRange,
  setDateRange,
  categories,
  selectedCategories,
  toggleCategory,
  loading,
  events,
  actionButtons,
  page,
  totalPages,
  onPageChange,
}) => {
  const {
    scrollRef,
    showLeftArrow,
    showRightArrow,
    scrollLeft,
    scrollRight
  } = useHorizontalScroll();
  const resultsRef = useRef(null);

  const handlePageChange = (newPage) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
    if (resultsRef.current) {
      resultsRef.current.scrollTop = 0;
    }
  };

  return (
    <FullPageModalOverlay onClose={onClose}>
      <div className={styles.wrapper}>
        <Typography variant="h1" className={styles.title}>Сортировка</Typography>

        <div className={styles.filterSection}>
          <div className={styles.calendarSection}>
            <Calendar selectedRange={dateRange} onSelectRange={setDateRange} />
          </div>

          <div className={styles.categoriesSection}>
            {loading.categories ? (
              <div>Загрузка категорий...</div>
            ) : (
              <div className={styles.categoriesScrollContainer}>
                <div className={styles.categoriesWrapper}>
                  {showLeftArrow && (
                    <div className={`${styles.arrowLeft}`} onClick={scrollLeft}>
                      <img src={rightBlack} alt="left" style={{ transform: 'rotate(180deg)' }} />
                    </div>
                  )}

                  <div className={styles.categoriesScroll} ref={scrollRef}>
                    {categories.map(category => (
                      <div
                        key={category.id}
                        className={`${styles.categoryItem} ${
                          selectedCategories.includes(category.id) ? styles.selected : ''
                        }`}
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>

                  {showRightArrow && (
                    <div className={`${styles.arrowRight}`} onClick={scrollRight}>
                      <img src={rightBlack} alt="right" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <LittleButtons buttons={actionButtons} />
        </div>

        {loading.events ? (
          <div>Загрузка мероприятий...</div>
        ) : events.length > 0 ? (
          <div className={styles.results} ref={resultsRef}>
            <EventsGrid
              events={events}
              loading={loading.events}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <div className={styles.noResults}>
            <NothingFoundMessage />
          </div>
        )}
      </div>
    </FullPageModalOverlay>
  );
};

export default SortTemplate;
