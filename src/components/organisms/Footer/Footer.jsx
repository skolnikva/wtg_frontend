import React from 'react';
import TeamInfo from '@molecules/TeamInfo/TeamInfo';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <TeamInfo />
      </div>
    </footer>
  );
};

export default Footer;
