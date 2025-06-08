import React from 'react';
import styles from './Price.module.scss';

const Price = ({ price }) => {
  if (!price) return null;

  return (
    <div className={styles.priceBadge}>
      <span className={styles.price}>{price}</span>
      {/* <span className={styles.currency}>₽</span> */}
    </div>
  );
};

export default Price;