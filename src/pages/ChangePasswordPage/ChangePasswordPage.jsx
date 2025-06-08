import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '@services/api';
import { useNotification } from '@contexts/NotificationContext';
import BaseModalOverlay from '@templates/BaseModalOverlay/BaseModalOverlay';
import lock from '@assets/img/lock.png';
import ChangePasswordForm from '@organisms/Profile/ChangePasswordForm/ChangePasswordForm';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    current: '',
    newPass: '',
    repeat: ''
  });

  const handleCancel = () => navigate(-1);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formValues.current) {
      errors.currentPassword = 'Введите текущий пароль';
      isValid = false;
    }

    if (!formValues.newPass) {
      errors.newPassword = 'Введите новый пароль';
      isValid = false;
    } else if (formValues.newPass.length < 8) {
      errors.newPassword = 'Пароль должен быть не менее 8 символов';
      isValid = false;
    }

    if (formValues.newPass !== formValues.repeat) {
      errors.repeatPassword = 'Пароли не совпадают';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleConfirm = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    const userId = Cookies.get('UserId');
    const token = Cookies.get('Token');

    try {
      await api.changePassword(
        userId, 
        formValues.current,
        formValues.newPass,
        token
      );
      showNotification('success', 'Пароль успешно изменен');
      navigate(location.state?.background || '/profile');
    } catch (error) {
      console.error('Ошибка смены пароля:', error);
      if (error.response?.status === 422) {
        setFormErrors(prev => ({
          ...prev,
          currentPassword: 'Неверный текущий пароль'
        }));
      } else {
        showNotification('error', 'Произошла ошибка при смене пароля');
        navigate(location.state?.background || '/profile');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseModalOverlay
      title="Смена пароля"
      stickerSrc={lock}
      stickerAlt="Ключ"
      onClose={handleCancel}
      onConfirm={handleConfirm}
      isSubmitting={isSubmitting}
      confirmText="Сменить"
      cancelText="Отмена"
    >
      <ChangePasswordForm
        onChange={(values) => setFormValues(values)}
        errors={formErrors}
      />
    </BaseModalOverlay>
  );
};

export default ChangePasswordPage;