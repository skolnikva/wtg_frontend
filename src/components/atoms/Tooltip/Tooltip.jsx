import React from 'react';
import styles from './Tooltip.module.scss';

const Tooltip = ({ children, text }) => {
  return (
    <div className={styles.tooltipWrapper}>
      {children}
      <span className={styles.tooltipText}>{text}</span>
    </div>
  );
};

export default Tooltip;
