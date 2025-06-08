import React, { useState } from 'react';
import LabeledInput from '@molecules/Form/LabeledInput/LabeledInput';
import PasswordInput from '@molecules/Form/PasswordInput/PasswordInput';
import SubmitButton from '@atoms/Buttons/SubmitButton/SubmitButton';
import SwitchAuth from '@molecules/Buttons/SwitchAuth/SwitchAuth';
import ForgotPasswordLink from '@atoms/Authorization/ForgotPasswordLink/ForgotPasswordLink';
import ErrorText from '@atoms/Text/ErrorText/ErrorText';
import styles from './AuthForm.module.scss';
import AuthHeader from '@molecules/ModalHeader/ModalHeader';
import { validate, fieldHints } from '@utils/validation';

const AuthForm = ({
  isLogin,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  confirmPassword,
  setConfirmPassword,
  error,
  onSubmit,
  onSwitch,
  authTitle,
  authStickerSrc,
  authStickerAlt,
  isPasswordVisible,
  setIsPasswordVisible,
  isConfirmPasswordVisible,
  setIsConfirmPasswordVisible,
}) => {
  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'email') error = validate.email(value);
    else if (name === 'password') error = validate.password(value);
    else if (name === 'username') error = validate.username(value);
    else if (name === 'confirmPassword') error = validate.confirmPassword(value, password);
    
    setValidationErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleFieldChange = (e, setter) => {
    const { name, value } = e.target;
    setter(value);
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let isValid = true;
    const fieldsToValidate = isLogin 
      ? { email, password }
      : { email, password, username, confirmPassword };
    
    Object.entries(fieldsToValidate).forEach(([name, value]) => {
      if (!validateField(name, value)) isValid = false;
    });
    
    if (!isValid) return;
    
    onSubmit(e);
  };

  return (
    <div className={`${styles.modalContent} ${isLogin ? styles.auth : styles.reg}`}>
      <AuthHeader title={authTitle} stickerSrc={authStickerSrc} alt={authStickerAlt} />
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <LabeledInput
            label="Логин"
            placeholder="Логин"
            name="username"
            value={username}
            onChange={(e) => handleFieldChange(e, setUsername)}
            error={validationErrors.username}
            required
            hint={fieldHints.username}
          />
        )}
        <LabeledInput
          label="Email"
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => handleFieldChange(e, setEmail)}
          error={validationErrors.email}
          required
          hint={fieldHints.email}
        />
        <LabeledInput
          label="Пароль"
          name="password"
          value={password}
          onChange={(e) => handleFieldChange(e, setPassword)}
          error={validationErrors.password}
          required
          hint={fieldHints.password}
        >
          <PasswordInput
            placeholder="Пароль"
            value={password}
            onChange={(e) => handleFieldChange(e, setPassword)}
            isVisible={isPasswordVisible}
            setIsVisible={setIsPasswordVisible}
          />
        </LabeledInput>

        {!isLogin && (
          <LabeledInput
            label="Повторите пароль"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleFieldChange(e, setConfirmPassword)}
            error={validationErrors.confirmPassword}
            required
          >
            <PasswordInput
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => handleFieldChange(e, setConfirmPassword)}
              isVisible={isConfirmPasswordVisible}
              setIsVisible={setIsConfirmPasswordVisible}
            />
          </LabeledInput>
        )}
        {/* {isLogin && <ForgotPasswordLink to="/" children="Забыл пароль?" />} */}
        <SubmitButton type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</SubmitButton>
      </form>
      {error && <ErrorText>{error}</ErrorText>}
      <SwitchAuth isLogin={isLogin} onSwitch={onSwitch} />
    </div>
  );
};

export default AuthForm;