import React from 'react';
import styles from './LogoText.module.scss';

const LogoText = ({ children }) => {
  return <span className={`${styles.comfortaaText} ${styles.logo}`}>{children}</span>;
};

export default LogoText;