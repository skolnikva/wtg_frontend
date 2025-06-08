import React from 'react';
import styles from './DotsLoader.module.scss';

const DotsLoader = () => {
  return (
    <div className={styles.dotsWrapper}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  );
};

export default DotsLoader;
