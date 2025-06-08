import React from 'react';
import styles from './SubmitButton.module.scss';

const SubmitButton = ({ type, children, onClick }) => (
  <button className={styles.submitButton} type={type} onClick={onClick}>
    {children}
  </button>
);

export default SubmitButton;