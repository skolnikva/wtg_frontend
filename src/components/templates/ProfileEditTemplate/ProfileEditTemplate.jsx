import React from 'react';
import styles from './ProfileEditTemplate.module.scss';

const ProfileEditTemplate = ({ children }) => (
  <div className={styles['edit-profile-container']}>
    {children}
  </div>
);

export default ProfileEditTemplate;