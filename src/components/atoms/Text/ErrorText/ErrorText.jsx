import React from 'react';
import styles from './ErrorText.module.scss';

const ErrorText = ({ children }) => <p className={styles.errorText}>{children}</p>;

export default ErrorText;