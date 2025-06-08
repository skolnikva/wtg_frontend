import React from 'react';
import styles from './CopyrightText.module.scss';

const CopyrightText = ({ children }) => {
  return <span className={styles.text}>{children}</span>;
};

export default CopyrightText;