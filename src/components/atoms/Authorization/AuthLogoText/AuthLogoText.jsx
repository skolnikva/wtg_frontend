import React from 'react';
import styles from './AuthLogoText.module.scss';

const AuthLogoText = ({ children }) => <h1 className={`comfortaa-text ${styles.logoText}`}>{children}</h1>;

export default AuthLogoText;