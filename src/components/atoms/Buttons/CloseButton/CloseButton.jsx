import React from 'react';
import styles from './CloseButton.module.scss';

const CloseButton = ({ onClick, variant = 'dark' }) => {
  const buttonClass = variant === 'light'
    ? `${styles.closeButton} ${styles.light}`
    : `${styles.closeButton} ${styles.dark}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      ×
    </button>
  );
};

export default CloseButton;