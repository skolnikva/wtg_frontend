import React from 'react';
import LoaderIndicator from '@atoms/LoaderIndicator/LoaderIndicator.jsx';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <LoaderIndicator />
    </div>
  );
};

export default Loader;