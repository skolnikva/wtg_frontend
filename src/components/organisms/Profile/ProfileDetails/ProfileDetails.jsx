import React from 'react';
import ProfileInfo from '@molecules/Profile/ProfileInfo/ProfileInfo';
import TagList from '@molecules/Profile/TagList/TagList';
import Typography from '@atoms/Text/Typography/Typography';
import Label from '@atoms/Profile/LabelProfileDetail/LabelProfileDetail';
import styles from './ProfileDetails.module.scss';

const ProfileDetails = ({ userData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <Typography variant="h3" weight="thin">Информация</Typography>
        </div>
        <ProfileInfo userData={userData} />
      </div>

      <div className={styles.card}>
        <div className={styles.title}>
          <Typography variant="h3" weight="thin">Описание</Typography>
        </div>
        <div className={styles.block}>
          <Typography variant="h4" weight="bold">{userData.description || 'Нет описания'}</Typography>
        </div>
      </div>

      {/* <div className={styles.card}>
        <div className={styles.title}>
          <Typography variant="h3" weight="thin">Популярные теги</Typography>
        </div>
        <div className={styles.block}>
          <TagList tags={userData.tags}/>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileDetails;