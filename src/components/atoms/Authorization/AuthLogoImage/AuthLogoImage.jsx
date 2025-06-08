import React from 'react';
import styles from './AuthLogoImage.module.scss';

const AuthLogoImage = ({ src, alt }) => <img className={styles.logoImage} src={src} alt={alt} />;

export default AuthLogoImage;