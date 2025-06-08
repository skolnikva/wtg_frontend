import React from 'react';
import CloseButton from '@atoms/Buttons/CloseButton/CloseButton';
import styles from './ModalMap.module.scss';

const ModalMap = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.closeButton}>
          <CloseButton className={styles.closeButton} onClick={onClose}/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalMap;