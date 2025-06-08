import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LoginButton.module.scss';

const LoginButton = ({ onClick }) => {
  return (
    <Link to="/" onClick={onClick} className={`${styles.comfortaaText} ${styles.logo}`}>
      Войти
    </Link>
  );
};

export default LoginButton;