import React, { useState, useRef, useEffect } from 'react';
import ImageAtom from '@atoms/Profile/Image/Image';
import styles from './ProfileImageUpload.module.scss';
import uploadIcon from '@assets/img/upload.png';
import deleteIcon from '@assets/img/trash.png';
import profilePhoto from '@assets/img/default_profile.png';
import Typography from '@atoms/Text/Typography/Typography';

const ProfileImageUpload = ({ imageUrl, onImageChange, onImageDelete }) => {
  const [previewUrl, setPreviewUrl] = useState(imageUrl);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
      onImageChange(file);
    } else {
      setPreviewUrl(imageUrl);
      onImageChange(null);
    }
  };

  const handleDeleteImage = () => {
    setPreviewUrl(profilePhoto);
    onImageDelete();
  };

  return (
    <div className={styles['form-group-img']}>
      <div className={styles['profile-image-container']}>
        <ImageAtom
          src={previewUrl || profilePhoto}
          alt="Фото профиля"
          className={styles['profile-image']}
        />
      </div>

      <input
        type="file"
        name="avatar"
        id="file-input"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <Typography variant="h4" color="gray">.jpeg .png</Typography>

      <div className={styles['action-buttons']}>
        <div className={styles['file-button']} onClick={() => fileInputRef.current?.click()}>
          <span className={styles['file-icon']}>
            <ImageAtom src={uploadIcon} alt="Загрузить" />
          </span>
        </div>
        <div className={styles['file-button']} onClick={handleDeleteImage}>
          <span className={styles['file-icon']}>
            <ImageAtom src={deleteIcon} alt="Удалить" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
