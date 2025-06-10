import React, { useEffect, useState } from 'react';
import ProfileEditTemplate from '@templates/ProfileEditTemplate/ProfileEditTemplate';
import ProfileEditForm from '@organisms/Profile/ProfileEditForm/ProfileEditForm';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '@services/api';
import ProfileImageUpload from '@molecules/Profile/ProfileImageUpload/ProfileImageUpload';
import profilePhoto from '@assets/img/default_profile.png';
import useAuthCheck from '@hooks/useAuthCheck';
import { useNotification } from '@contexts/NotificationContext';
import DotsLoader  from '@molecules/DotsLoader/DotsLoader.jsx';

const ProfileEditPage = () => {
  useAuthCheck();
  const [userData, setUserData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const location = useLocation();
  const [isAvatarDeleted, setIsAvatarDeleted] = useState(false);

  useEffect(() => {
    const userId = Cookies.get('UserId');
    const token = Cookies.get('Token');

    async function fetchProfileData() {
      try {
        const userDataResponse = await api.getUserData(userId, token);
        if (userDataResponse.dob && userDataResponse.dob.includes('-')) {
          const [year, month, day] = userDataResponse.dob.split('-');
          userDataResponse.dob = `${day}.${month}.${year}`;
        }
        setUserData(userDataResponse);

        try {
          const avatarPath = userDataResponse.profile_image;
  
          if (avatarPath) {
            setAvatarUrl(api.getFullMediaUrl(avatarPath));
          } else { 
            setAvatarUrl(profilePhoto);
          }
        } catch (avatarError) {
          console.error("Ошибка загрузки URL аватара:", avatarError);
          setAvatarUrl(profilePhoto);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        showNotification('error', 'Не удалось загрузить данные профиля');
      }
    }

    if (userId && token) {
      fetchProfileData();
    } else {
      navigate('/');
    }
  }, [navigate, showNotification]);

  if (!userData || !avatarUrl) {
    return <DotsLoader/>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleImageChange = (file) => {
    setSelectedAvatarFile(file);
    setIsAvatarDeleted(false);
  };

  const handleImageDelete = () => {
    setSelectedAvatarFile(null);
    setIsAvatarDeleted(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.email?.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = 'Email некорректен';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const userId = Cookies.get('UserId');
    const token = Cookies.get('Token');
  
    if (!validateForm()) {
      showNotification('error', 'Пожалуйста, исправьте ошибки в форме');
      setIsSubmitting(false);
      return;
    }
  
    try {
      let formattedDob = userData.dob;
      if (formattedDob && formattedDob.includes('.')) {
        const [day, month, year] = formattedDob.split('.');
        formattedDob = `${year}-${month}-${day}`;
      }
      
      const updateResponse = await api.updateUser(userId, {
        ...userData,
        dob: formattedDob,
      }, token);
  
      if (updateResponse.errors) {
        const firstError = Object.values(updateResponse.errors)[0];
        showNotification('error', firstError);
        return;
      }
  
      if (isAvatarDeleted) {
        try {
          await api.deleteAvatar(userId, token);
          setAvatarUrl(profilePhoto);
        } catch (avatarError) {
          console.error('Ошибка при удалении аватара:', avatarError);
        }
      } else if (selectedAvatarFile) {
        try {
          const path = await api.uploadAvatar(userId, selectedAvatarFile, token);
          setAvatarUrl(api.getFullAvatarUrl(path));
        } catch (avatarError) {
          console.error('Ошибка загрузки аватара:', avatarError);
        }
      }
  
      showNotification('success', 'Профиль успешно обновлен!');
      navigate('/profile');
  
    } catch (error) {
      console.error('Ошибка обновления данных профиля:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        'Произошла ошибка при обновлении профиля';
      showNotification('error', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openChangePasswordModal = () => {
    navigate('/change-password', { state: { background: location } });
  };

  return (
    <ProfileEditTemplate>
      <ProfileImageUpload
        imageUrl={avatarUrl || profilePhoto}
        onImageChange={handleImageChange}
        onImageDelete={handleImageDelete}
      />
      <ProfileEditForm
        userData={userData}
        errors={errors}
        handleChange={handleChange}
        handleSave={handleSave}
        isSubmitting={isSubmitting}
        onOpenResetPassword={openChangePasswordModal}
      />
    </ProfileEditTemplate>
  );
};

export default ProfileEditPage;