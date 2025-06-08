import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavLinkIcon.module.scss';

const NavLinkIcon = ({ src, alt, to, onClick }) => {
  if (to) {
    return (
      <Link to={to} className={styles.navIconLink}>
        <img src={src} alt={alt} className={styles.navIcon} />
      </Link>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} className={styles.navIconButton}>
        <img src={src} alt={alt} className={styles.navIcon} />
      </button>
    );
  }
  return <img src={src} alt={alt} className={styles.navIcon} />;
};

export default NavLinkIcon;