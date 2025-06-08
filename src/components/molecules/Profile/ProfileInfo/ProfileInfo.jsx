import React from 'react';
import Label from '@atoms/Profile/LabelProfileDetail/LabelProfileDetail';
import Typography from '@atoms/Text/Typography/Typography';
import styles from './ProfileInfo.module.scss';

const ProfileInfo = ({ userData }) => {
  const genderMap = {
    male: 'Мужской',
    female: 'Женский',
    not_specified: 'Не выбрано',
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" weight="thin" className={styles.row}>
        Имя: <b>{userData.first_name ? userData.first_name : 'Не указано'}</b>
      </Typography>
      <Typography variant="h4" weight="thin" className={styles.row}>
        Фамилия: <b>{userData.last_name ? userData.last_name : 'Не указано'}</b>
      </Typography>
      <Typography variant="h4" weight="thin" className={styles.row}>
        Пол: <b>{genderMap[userData.gender] || 'Не выбрано'}</b>
      </Typography>
      <Typography variant="h4" weight="thin" className={styles.row}>
        Дата рождения:
        <b>{userData.dob ? new Date(userData.dob).toLocaleDateString('ru-RU') : 'дд.мм.гггг.'}</b>
      </Typography>
      <Typography variant="h4" weight="thin" className={styles.row}>
        Email: <b>{userData.email}</b>
      </Typography>
    </div>
  );
};

export default ProfileInfo;