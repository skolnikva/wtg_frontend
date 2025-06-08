import React, { useState } from 'react';
import AuthForm from '@organisms/AuthForm/AuthForm';
import AuthLogo from '@molecules/AuthLogo/AuthLogo';
import styles from './LoginModal.module.scss';
import hiSticker from '@/assets/img/hi.png';

const LoginModal = ({ 
  onClose, 
  onSwitch, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  error, 
  onSubmit, 
  logoSrc, 
  logoAlt 
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className={styles.modalWrapper}>
      <AuthForm
        isLogin={true}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        onSubmit={onSubmit}
        onSwitch={onSwitch}
        authTitle="Добро пожаловать!"
        authStickerSrc={hiSticker}
        authStickerAlt="Привет"
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
      />
      <AuthLogo logoSrc={logoSrc} logoAlt={logoAlt} />
    </div>
  );
};

export default LoginModal;