import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('Token'));

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!Cookies.get('Token'));
    }, 1000); // каждые 1 сек

    return () => clearInterval(interval);
  }, []);

  return isLoggedIn;
}