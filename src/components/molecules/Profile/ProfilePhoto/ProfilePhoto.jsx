import React from 'react';
import Image from '@atoms/Profile/Image/Image';
import Typography from '@atoms/Text/Typography/Typography';
import styles from './ProfilePhoto.module.scss';
import profilePhoto from '@/assets/img/default_profile.png';

const ProfilePhoto = ({ image, username }) => (
  <div className={styles.container}>
    <div className={styles['photo-container']}>
      <Image src={image || profilePhoto} alt="Фото профиля" className={styles.photo} />
    </div>
    <Typography variant="h3" weight="bold" className={styles.username}>
      {username}
    </Typography>
  </div>
);

export default ProfilePhoto;