import React, { useState } from 'react';
import AuthForm from '@organisms/AuthForm/AuthForm';
import AuthLogo from '@molecules/AuthLogo/AuthLogo';
import styles from './RegisterModal.module.scss';
import hiSticker from '@/assets/img/hi.png';

const RegisterModal = ({
  onClose,
  onSwitch,
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  onSubmit,
  logoSrc,
  logoAlt
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  return (
    <div className={styles.modalWrapper}>
      <AuthLogo isRegister={true} logoSrc={logoSrc} logoAlt={logoAlt} />
      <AuthForm
        isLogin={false}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        error={error}
        onSubmit={onSubmit}
        onSwitch={onSwitch}
        authTitle="Создать аккаунт"
        authStickerSrc={hiSticker}
        authStickerAlt="Привет"
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
        isConfirmPasswordVisible={isConfirmPasswordVisible}
        setIsConfirmPasswordVisible={setIsConfirmPasswordVisible}
      />
    </div>
  );
};

export default RegisterModal;