import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from "@services/api";
import ProfileTemplate from '@templates/ProfileTemplate/ProfileTemplate';
import profilePhoto from '@assets/img/default_profile.png';
import { useNotification } from '@contexts/NotificationContext';
import DotsLoader  from '@molecules/DotsLoader/DotsLoader.jsx';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage({ isViewOnly = false }) {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfileData() {
      setLoading(true);
      
      try {
        const targetUserId = isViewOnly ? userId : Cookies.get('UserId');
        
        if (!targetUserId) {
          navigate('/');
          return;
        }

        const userDataResponse = await api.getUserData(targetUserId);
        setUserData(userDataResponse);

        try {
          const avatarPath = userDataResponse.profile_image;
          setAvatarUrl(avatarPath ? api.getFullMediaUrl(avatarPath) : profilePhoto);
        } catch {
          setAvatarUrl(profilePhoto);
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        showNotification('error', 'Не удалось загрузить данные профиля');
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [userId, isViewOnly, navigate, showNotification]);

  const handleLogout = async () => {
    try {
      await api.logout();
      Cookies.remove('Token');
      Cookies.remove('UserId');
      localStorage.removeItem("isLoggedIn");
      navigate('/');
      showNotification('info', 'Вы вышли из системы');
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const openDeleteModal = () => {
    navigate('/delete-account', { state: { background: location } });
  };

  if (loading) return <DotsLoader />;
  if (!userData) return <div>Ошибка загрузки данных пользователя</div>;
  if (!avatarUrl) return <DotsLoader />;

  return (
    <ProfileTemplate
      userData={userData}
      onLogout={isViewOnly ? null : handleLogout}
      onDelete={isViewOnly ? null : openDeleteModal}
      avatarUrl={avatarUrl}
      isViewOnly={isViewOnly}
    />
  );
}