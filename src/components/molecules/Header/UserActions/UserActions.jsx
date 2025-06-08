import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginButton from '@atoms/Buttons/LoginButton/LoginButton';
import NavLinkIcon from '@atoms/Header/NavLinkIcon/NavLinkIcon';
import styles from './UserActions.module.scss';
import Tooltip from '@atoms/Tooltip/Tooltip';
import { useAuthModal } from '@contexts/AuthModalContext';

const UserActions = ({ isLoggedIn, profileHref, searchSrc, searchAlt, profileSrc, profileAlt }) => {
  const { openLoginModal } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = (event) => {
    event.preventDefault();
    openLoginModal();
  };

  const handleSearchClick = () => {
    navigate('/search', { state: { background: location } });
  };

  return (
    <div className={styles.container}>
      <Tooltip text="Поиск">
        <NavLinkIcon
          src={searchSrc}
          alt={searchAlt}
          onClick={handleSearchClick}
        />
      </Tooltip>
      {isLoggedIn ? (
        <a href={profileHref}>
          <NavLinkIcon src={profileSrc} alt={profileAlt} />
        </a>
      ) : (
        <LoginButton onClick={handleLoginClick} />
      )}
    </div>
  );
};

export default UserActions;