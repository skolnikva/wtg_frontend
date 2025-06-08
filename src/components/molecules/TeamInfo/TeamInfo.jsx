import React from 'react';
import Typography from '@atoms/Text/Typography/Typography';
import styles from './TeamInfo.module.scss';
import locationIcon from '@/assets/img/location.png';

const TeamInfo = () => {
  return (
    <Typography variant="h4" className={`${styles.teamInfo} gray`}>
      <div>
        <img src={locationIcon} alt="location" className={styles.icon} />
        Томск <span className={styles.separator}>•</span>
      </div>
      <div>
        frontend – <a href="https://github.com/skolnikva" target="_blank" rel="noopener noreferrer">Алиса Сокольникова</a> <span className={styles.separator}>•</span>
      </div>
      <div>
        backend – <a href="https://github.com/SteSha28" target="_blank" rel="noopener noreferrer">Анастасия Цыганкова</a>
      </div>
    </Typography>
  );
};

export default TeamInfo;
