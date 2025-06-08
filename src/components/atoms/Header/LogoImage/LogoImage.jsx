import React from 'react';
import styles from './LogoImage.module.scss';

const LogoImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className={styles.logoImage} />;
};

export default LogoImage;