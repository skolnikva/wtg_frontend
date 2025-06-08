import React from 'react';
import styles from './Label.module.scss';

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className={styles.label}>
    {children}
  </label>
);

export default Label;