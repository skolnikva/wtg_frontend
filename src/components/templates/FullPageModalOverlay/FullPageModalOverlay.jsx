import React from 'react';
import styles from './FullPageModalOverlay.module.scss';
import CloseButton from '@atoms/Buttons/CloseButton/CloseButton';

const FullPageModalOverlay = ({ onClose, children }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalWrapper}>
        <div className={styles.closeButtonWrapper}>
          <CloseButton onClick={onClose} />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FullPageModalOverlay;