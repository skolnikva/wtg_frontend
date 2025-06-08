import React from 'react';
import styles from './Pagination.module.scss';
import rightBlack from '@/assets/img/right-black.png';
import rightGray from '@/assets/img/right-gray.png';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const isPrevDisabled = page === 1;
  const isNextDisabled = page === totalPages;

  return (
    <div className={styles.loadMoreContainer}>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(page - 1)}
        disabled={isPrevDisabled}
      >
        <img
          src={isPrevDisabled ? rightGray : rightBlack}
          alt="Назад"
          className={`${styles.left}`}
        />
      </button>

      <span className={styles.pageInfo}>
        Страница {page} из {totalPages}
      </span>

      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(page + 1)}
        disabled={isNextDisabled}
      >
        <img
          src={isNextDisabled ? rightGray : rightBlack}
          alt="Вперед"
        />
      </button>
    </div>
  );
};

export default Pagination;
