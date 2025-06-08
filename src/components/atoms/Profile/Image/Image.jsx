import React from 'react';
import styles from './Image.module.scss';

const Image = ({ src, alt, className, ...props }) => {
  return <img {...props} src={src} alt={alt} className={`${styles.image} ${className}`} />;
};

export default Image;