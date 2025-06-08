import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '@services/api';
import { useNotification } from '@contexts/NotificationContext';
import BaseModalOverlay from '@templates/BaseModalOverlay/BaseModalOverlay';
import crossMark from '@assets/img/cross_mark.png';

const DeleteAccountPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useNotification();

  const handleConfirmDelete = async () => {
    setIsSubmitting(true);
    try {
      const userId = Cookies.get('UserId');
      const token = Cookies.get('Token');

      await api.deleteUser(userId, token);

      Cookies.remove('Token');
      Cookies.remove('UserId');
      localStorage.removeItem('isLoggedIn');

      showNotification('success', 'Ваш профиль был успешно удален');
      navigate(location.state?.background || '/');
    } catch (error) {
      console.error('Ошибка удаления профиля:', error);
      showNotification('error', 'Произошла ошибка при удалении профиля');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <BaseModalOverlay
      title="Удаление профиля"
      stickerSrc={crossMark}
      stickerAlt="Удаление"
      onClose={handleCancel}
      onConfirm={handleConfirmDelete}
      isSubmitting={isSubmitting}
      confirmText="Удалить"
      cancelText="Отменить"
    />
  );
};

export default DeleteAccountPage;