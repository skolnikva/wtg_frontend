import React from 'react';
import styles from './ModalTitle.module.scss';

const ModalTitle = ({ title }) => (
  <h2 className={`comfortaa-text ${styles.title}`}>{title}</h2>
);

export default ModalTitle;