import React, { createContext, useState, useContext } from 'react';
import NotificationOverlay from '@templates/NotificationOverlay/NotificationOverlay';
import Notification from '@molecules/Notification/Notification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ type: '', message: '' });

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  const hideNotification = () => {
    setNotification({ type: '', message: '' });
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
      
      {notification.message && (
        <NotificationOverlay>
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={hideNotification}
          />
        </NotificationOverlay>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }

  return context;
};