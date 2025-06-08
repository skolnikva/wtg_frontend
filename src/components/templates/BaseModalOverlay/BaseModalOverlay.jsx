import React from 'react';
import styles from './BaseModalOverlay.module.scss';
import ModalHeader from '@molecules/ModalHeader/ModalHeader';
import CloseButton from '@atoms/Buttons/CloseButton/CloseButton';
import LittleButtons from '@molecules/Buttons/LittleButtons/LittleButtons';

const BaseModalOverlay = ({
  title,
  stickerSrc,
  stickerAlt,
  onClose,
  onConfirm,
  onCancel,
  confirmText = 'Сохранить',
  cancelText = 'Отменить',
  isSubmitting = false,
  children
}) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      onClose();
    }
  };

  const littleButtonsData = [
    {
      variant: 'black',
      onClick: onConfirm,
      disabled: isSubmitting,
      label: isSubmitting ? 'Обработка...' : confirmText,
    },
    {
      variant: 'grey',
      onClick: onCancel || onClose,
      disabled: isSubmitting,
      label: cancelText,
    },
  ];

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalWrapper}>
        <div className={styles.closeButtonWrapper}>
          <CloseButton onClick={onClose} />
        </div>
        <div className={styles.content}>
          <ModalHeader title={title} stickerSrc={stickerSrc} stickerAlt={stickerAlt} />
          {children}
          <LittleButtons buttons={littleButtonsData} />
        </div>
      </div>
    </div>
  );
};

export default BaseModalOverlay;