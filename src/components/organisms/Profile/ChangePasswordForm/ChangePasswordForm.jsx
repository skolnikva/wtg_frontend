import React, { useState } from 'react';
import LabeledInput from '@molecules/Form/LabeledInput/LabeledInput';
import PasswordInput from '@molecules/Form/PasswordInput/PasswordInput';
import styles from './ChangePasswordForm.module.scss';
import { validate, fieldHints } from '@utils/validation';

const ChangePasswordForm = ({ onChange, errors }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    current: false,
    new: false,
    repeat: false
  });

  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'currentPassword') {
      error = validate.currentPassword(value);
    } else if (name === 'newPassword') {
      error = validate.password(value);
      if (repeatPassword) {
        validateField('repeatPassword', repeatPassword);
      }
    } else if (name === 'repeatPassword') {
      error = validate.confirmPassword(value, newPassword);
    }
    
    setValidationErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleFieldChange = (e, setter, fieldName) => {
    const { value } = e.target;
    setter(value);
    validateField(fieldName, value);
    
    if (onChange) {
      onChange({ 
        current: fieldName === 'currentPassword' ? value : currentPassword,
        newPass: fieldName === 'newPassword' ? value : newPassword,
        repeat: fieldName === 'repeatPassword' ? value : repeatPassword
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setIsPasswordVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const getError = (fieldName) => {
    return errors?.[fieldName] || validationErrors[fieldName];
  };

  return (
    <div className={styles.form}>
      <LabeledInput
        label="Текущий пароль"
        name="currentPassword"
        value={currentPassword}
        onChange={(e) => handleFieldChange(e, setCurrentPassword, 'currentPassword')}
        error={getError('currentPassword')}
        required
        hint={fieldHints.currentPassword}
      >
        <PasswordInput
          placeholder="Текущий пароль"
          value={currentPassword}
          onChange={(e) => handleFieldChange(e, setCurrentPassword, 'currentPassword')}
          required
          isVisible={isPasswordVisible.current}
          setIsVisible={() => togglePasswordVisibility('current')}
        />
      </LabeledInput>

      <LabeledInput
        label="Новый пароль"
        name="newPassword"
        value={newPassword}
        onChange={(e) => handleFieldChange(e, setNewPassword, 'newPassword')}
        error={getError('newPassword')}
        required
        hint={fieldHints.newPassword}
      >
        <PasswordInput
          placeholder="Новый пароль"
          value={newPassword}
          onChange={(e) => handleFieldChange(e, setNewPassword, 'newPassword')}
          required
          isVisible={isPasswordVisible.new}
          setIsVisible={() => togglePasswordVisibility('new')}
        />
      </LabeledInput>

      <LabeledInput
        label="Повторите новый пароль"
        name="repeatPassword"
        value={repeatPassword}
        onChange={(e) => handleFieldChange(e, setRepeatPassword, 'repeatPassword')}
        error={getError('repeatPassword')}
        required
        hint={fieldHints.confirmPassword}
      >
        <PasswordInput
          placeholder="Повторите новый пароль"
          value={repeatPassword}
          onChange={(e) => handleFieldChange(e, setRepeatPassword, 'repeatPassword')}
          required
          isVisible={isPasswordVisible.repeat}
          setIsVisible={() => togglePasswordVisibility('repeat')}
        />
      </LabeledInput>
    </div>
  );
};

export default ChangePasswordForm;