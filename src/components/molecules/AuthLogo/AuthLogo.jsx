import React from 'react';
import AuthLogoImage from '@atoms/Authorization/AuthLogoImage/AuthLogoImage';
import AuthLogoText from '@atoms/Authorization/AuthLogoText/AuthLogoText';
import styles from './AuthLogo.module.scss';

const AuthLogo = ({ isRegister, href, logoSrc, logoAlt }) => (
  <a href={href} className={`${styles.modalLogo} ${isRegister ? styles.reg : ''}`}>
    <div className={styles.modalInLogo}>
      <AuthLogoImage src={logoSrc} alt={logoAlt} />
      <AuthLogoText>Куда</AuthLogoText>
      <AuthLogoText>сходить?</AuthLogoText>
    </div>
  </a>
);

AuthLogo.defaultProps = {
  logoAlt: 'Логотип',
};

export default AuthLogo;