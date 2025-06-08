import React from 'react';
import styles from './NotificationOverlay.module.scss';

const NotificationOverlay = ({ children }) => {
  return (
    <div className={styles.notificationOverlay}>
      <div className={styles.notificationInner}>
        {children}
      </div>
    </div>
  );
};

export default NotificationOverlay;
