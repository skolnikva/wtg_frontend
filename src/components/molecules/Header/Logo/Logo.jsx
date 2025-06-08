import React from 'react';
import LogoImage from '@atoms/Header/LogoImage/LogoImage';
import LogoText from '@atoms/Header/LogoText/LogoText';
import styles from './Logo.module.scss';

const Logo = ({ logoSrc, logoAlt, logoText, href }) => {
  return (
    <a href={href} className={styles.logoContainer}>
      <LogoImage src={logoSrc} alt={logoAlt} />
      <LogoText>{logoText}</LogoText>
    </a>
  );
};

export default Logo;