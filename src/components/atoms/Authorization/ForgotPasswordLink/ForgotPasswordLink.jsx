import React from 'react';
import styles from './ForgotPasswordLink.module.scss';

const ForgotPasswordLink = ({ to, children }) => (
  <a href={to} className={styles.forgotPasswordLink}>
    {children}
  </a>
);

export default ForgotPasswordLink;