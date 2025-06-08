import React from 'react';
import NavLinkIcon from '@atoms/Header/NavLinkIcon/NavLinkIcon';
import Tooltip from '@atoms/Tooltip/Tooltip';
import styles from './NavigationLink.module.scss';

const NavigationLink = ({ href, iconSrc, iconAlt }) => {
  return (
    <Tooltip text="Посмотреть на карте">
      <a href={href} className={styles.link}>
        <div className={styles.iconWrapper}>
          <NavLinkIcon src={iconSrc} alt={iconAlt} />
        </div>
      </a>
    </Tooltip>
  );
};

export default NavigationLink;
