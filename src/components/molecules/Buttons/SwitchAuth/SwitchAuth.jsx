import React from 'react';
import LittleButton from '@atoms/Buttons/LittleButton/LittleButton';
import styles from './SwitchAuth.module.scss';

const SwitchAuth = ({ isLogin, onSwitch }) => (
  <div className={styles.switchContainer}>
    <h6>{isLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}</h6>
    <LittleButton variant="black" onClick={onSwitch}>
      {isLogin ? 'Создать аккаунт' : 'Войти'}
    </LittleButton >
  </div>
);

export default SwitchAuth;