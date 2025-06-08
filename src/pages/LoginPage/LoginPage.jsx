import React, { useState } from 'react';
import LoginModal from '@organisms/LoginModal/LoginModal';
import api from '@services/api';
import logo from '@/assets/img/wtg_logo.png';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotification } from '@contexts/NotificationContext';
import AuthModalOverlay from '@templates/AuthModalOverlay/AuthModalOverlay.jsx';
import { useAuthModal } from '@contexts/AuthModalContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useNotification();
  const { closeAuthModal } = useAuthModal();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await api.login({ username: email, password });

      const userId = Cookies.get('UserId');
      if (userId) {
        showNotification('success', 'Вы успешно вошли в систему');
        closeAuthModal();
        navigate('/');
      } else {
        console.error('UserId не найден в куках');
        setError('Ошибка авторизации');
      }
    } catch (err) {
      console.error('Ошибка при входе:', err);
      setError('Неверный логин или пароль');
    }
  };

  const handleSwitchToRegister = () => {
    navigate('/register', { state: { background: '/' } });
  };

  return (
    <AuthModalOverlay onClose={closeAuthModal}>
      <LoginModal
        onClose={closeAuthModal}
        onSwitch={handleSwitchToRegister}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        onSubmit={handleLogin}
        logoSrc={logo}
        logoAlt="Логотип"
      />
    </AuthModalOverlay>
  );
};

export default LoginPage;