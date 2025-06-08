import React, { createContext, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthModalContext = createContext({
  isAuthModalOpen: false,
  isRegister: false,
  openLoginModal: () => {},
  openRegisterModal: () => {},
  closeAuthModal: () => {},
});

export const AuthModalProvider = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openLoginModal = useCallback(() => {
    navigate('/login', { state: { background: location } });
  }, [navigate, location]);

  const openRegisterModal = useCallback(() => {
    navigate('/register', { state: { background: location } });
  }, [navigate, location]);

  const closeAuthModal = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <AuthModalContext.Provider
      value={{
        isAuthModalOpen,
        isRegister,
        openLoginModal,
        openRegisterModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => React.useContext(AuthModalContext);