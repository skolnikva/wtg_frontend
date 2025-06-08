import React from 'react';
import styles from './NotificationText.module.scss';

const NotificationText = ({ children }) => <p className={styles.text}>{children}</p>;

export default NotificationText;