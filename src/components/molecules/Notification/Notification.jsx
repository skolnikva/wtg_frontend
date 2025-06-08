import React, { useEffect, useState } from 'react';
import NotificationText from '@atoms/Text/NotificationText/NotificationText';
import CloseButton from '@atoms/Buttons/CloseButton/CloseButton';
import styles from './Notification.module.scss';

const Notification = ({ type, message, onClose }) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(onClose, 500);
    }, 60000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleCloseClick = () => {
    setIsHiding(true);
    setTimeout(onClose, 500);
  };

  return (
    <div
      className={`${styles.notification} ${styles[type]} ${isHiding ? styles.hiding : ''}`}
    >
      <div className={styles.content}>
        <NotificationText>{message}</NotificationText>
        <CloseButton
          onClick={handleCloseClick}
          variant={type === 'error' ? 'light' : 'dark'}
        />
      </div>
    </div>
  );
};

export default Notification;