import React from 'react';
import styles from './LabelProfileDetail.module.scss';

const Label = ({ children, className, ...props }) => (
  <span {...props} className={`${styles.label} ${className}`}>
    {children}
  </span>
);

export default Label;