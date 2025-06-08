import React from 'react';
import styles from './Typography.module.scss';

const Typography = ({ children, variant = 'body', weight, color, className, ...rest }) => {
  const Tag = variant.startsWith('h') ? variant.substring(0, 2) : 'p';
  const baseClass = styles[variant] || styles.body;
  
  const weightClass = weight ? styles[weight] : '';
  const colorClass = color ? styles[color] : '';
  
  const typographyClass = `${baseClass} ${weightClass} ${colorClass} ${className || ''}`.trim();
  
  return <Tag className={typographyClass} {...rest}>{children}</Tag>;
};

export default Typography;