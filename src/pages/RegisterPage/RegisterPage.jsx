import React, { useState } from 'react';
import RegisterModal from '@organisms/RegisterModal/RegisterModal';
import api from '@services/api';
import logo from '@/assets/img/wtg_logo.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotification } from '@contexts/NotificationContext';
import AuthModalOverlay from '@templates/AuthModalOverlay/AuthModalOverlay.jsx';
import { useAuthModal } from '@contexts/AuthModalContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useNotification();
  const { closeAuthModal } = useAuthModal();

  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await api.register({ username, email, password });
      await api.login({ username: email, password });
      showNotification('success', 'Вы успешно вошли в систему');
      closeAuthModal();
      navigate('/');
    } catch (err) {
      console.error('Ошибка при регистрации:', err);
      setError('Такой логин или email уже существует');
    }
  };

  const handleSwitchToLogin = () => {
    navigate('/login', { state: { background: '/' } });
  };

  return (
    <AuthModalOverlay onClose={closeAuthModal}>
      <RegisterModal
        onClose={closeAuthModal}
        onSwitch={handleSwitchToLogin}
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        error={error}
        onSubmit={handleRegister}
        logoSrc={logo}
        logoAlt="Логотип"
        isPasswordVisible={isPasswordVisible}
        setIsPasswordVisible={setIsPasswordVisible}
        isConfirmPasswordVisible={isConfirmPasswordVisible}
        setIsConfirmPasswordVisible={setIsConfirmPasswordVisible}
      />
    </AuthModalOverlay>
  );
};

export default RegisterPage;