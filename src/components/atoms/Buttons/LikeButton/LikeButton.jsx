import React from 'react';
import styles from './LikeButton.module.scss';
import filled from '@assets/img/heart-filled.png';
import outline from '@assets/img/heart-outline.png';

const LikeButton = ({ isActive, onClick }) => {
  const iconSrc = isActive ? filled : outline;

  return (
    <button className={styles.iconButton} onClick={onClick}>
      <img src={iconSrc} alt="Избранное" className={styles.iconImage} />
    </button>
  );
};

export default LikeButton;