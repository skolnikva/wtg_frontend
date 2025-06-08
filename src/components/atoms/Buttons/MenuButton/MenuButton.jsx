import React from 'react';
import styles from './MenuButton.module.scss';

const MenuButton = ({ children, onClick, className, ...props }) => (
  <button {...props} onClick={onClick} className={`${styles.button} ${className || ''}`}>
    {children}
  </button>
);

export default MenuButton;