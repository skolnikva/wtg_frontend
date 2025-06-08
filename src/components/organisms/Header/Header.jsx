import React from 'react';
import Logo from '@molecules/Header/Logo/Logo';
import NavigationLink from '@molecules/Header/NavigationLink/NavigationLink';
import UserActions from '@molecules/Header/UserActions/UserActions';
import styles from './Header.module.scss';
import logo from '@/assets/img/wtg_logo.png';
import mapIcon from '@/assets/img/wtg_map.png';
import searchIcon from '@/assets/img/search.png';
import profileIcon from '@/assets/img/wtg_profile.png';
import { useNavigate } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import { useAuthModal } from '@contexts/AuthModalContext';

const Header = () => {
  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const { openLoginModal } = useAuthModal();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      navigate('/profile');
    } else {
      openLoginModal();
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <Logo
            href="/"
            logoSrc={logo}
            logoAlt="Логотип"
            logoText="Куда сходить?"
          />
        </div>

        <nav className={styles.headerCenter}>
          <NavigationLink href="/events/map" iconSrc={mapIcon} iconAlt="Карта" />
        </nav>

        <div className={styles.headerRight}>
          <UserActions
            isLoggedIn={isLoggedIn}
            profileHref="/profile"
            searchSrc={searchIcon}
            searchAlt="Поиск"
            profileSrc={profileIcon}
            profileAlt="Профиль"
            onProfileClick={handleProfileClick}
          />
        </div>
      </header>
    </div>
  );
};

export default Header;