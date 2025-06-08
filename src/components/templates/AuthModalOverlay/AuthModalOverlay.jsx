import React from 'react';
import styles from './AuthModalOverlay.module.scss';
import CloseButton from '@atoms/Buttons/CloseButton/CloseButton';
import { useNavigate } from 'react-router-dom';

const AuthModalOverlay = ({ children, onClose }) => {
  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalWrapper}>
        <div className={styles.closeButtonWrapper}>
          <CloseButton  onClick={handleCloseClick}/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthModalOverlay;