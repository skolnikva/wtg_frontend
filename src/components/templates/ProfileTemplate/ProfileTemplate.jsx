import React from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from '@atoms/Buttons/SubmitButton/SubmitButton';
import LittleButtons from '@molecules/Buttons/LittleButtons/LittleButtons';
import MenuButton from '@atoms/Buttons/MenuButton/MenuButton';
import ProfilePhoto from '@molecules/Profile/ProfilePhoto/ProfilePhoto';
import ProfileDetails from '@organisms/Profile/ProfileDetails/ProfileDetails';
import styles from './ProfileTemplate.module.scss';
import profilePhoto from '@assets/img/default_profile.png';

const ProfileTemplate = ({ userData, onLogout, onDelete, avatarUrl, isViewOnly }) => {
  const navigate = useNavigate();

  const littleButtonsData = [
    {
      label: 'Выйти',
      onClick: onLogout,
      variant: 'black',
    },
    {
      label: 'Удалить профиль',
      onClick: onDelete,
      variant: 'danger',
    },
  ];

  return (
    <div className={styles.container}>
      {!isViewOnly && (
        <div className={styles.menu}>
          <MenuButton onClick={() => navigate('/profile/favorites')}>Избранное</MenuButton>
            {/* <MenuButton>История посещений</MenuButton> */}
            {/* <MenuButton>Друзья</MenuButton> */}
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.left}>
          <ProfilePhoto image={avatarUrl || profilePhoto} username={userData.username} />
          {!isViewOnly && (
            <div className={styles.buttons}>
              <SubmitButton
                onClick={() => navigate('/profile/edit')}
              >
                Редактировать профиль
              </SubmitButton>
              <LittleButtons buttons={littleButtonsData} />
            </div>
          )}
        </div>
        <div className={styles.right}>
          <ProfileDetails userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplate;