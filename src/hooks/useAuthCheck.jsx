import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotification } from '@contexts/NotificationContext';

export default function useAuthCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useNotification();

  useEffect(() => {
    const token = Cookies.get('Token');

    const isProtectedRoute = location.pathname.startsWith('/profile');

    if (!token && isProtectedRoute) {
      showNotification('info', 'Вы вышли из системы');
      navigate('/');
    }
  }, [navigate, location]);
}