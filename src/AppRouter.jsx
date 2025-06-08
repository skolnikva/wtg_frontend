import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '@pages/HomePage/HomePage.jsx';
import ProfilePage from '@pages/ProfilePage/ProfilePage.jsx';
import FavoritesPage from '@pages/FavoritesPage/FavoritesPage';
import ProfileEditPage from '@pages/ProfileEditPage/ProfileEditPage.jsx';
import LoginPage from '@pages/LoginPage/LoginPage.jsx';
import RegisterPage from '@pages/RegisterPage/RegisterPage.jsx';
import MainTemplate from '@components/templates/MainTemplate/MainTemplate.jsx';
import Loader from '@molecules/Loader/Loader.jsx';
import DeleteAccountPage from '@pages/DeleteAccountPage/DeleteAccountPage.jsx';
import ChangePasswordPage from '@pages/ChangePasswordPage/ChangePasswordPage';
import EventPage from '@pages/EventPage/EventPage';
import CategoryPage from '@pages/CategoryPage/CategoryPage';
import LocationPage from '@pages/LocationPage/LocationPage';
import SearchPage from '@pages/SearchPage/SearchPage';
import SortPage from '@pages/SortPage/SortPage';
import EventsMapPage from '@pages/EventsMapPage/EventsMapPage';
import NotFoundPage from '@pages/NotFoundPage/NotFoundPage';
import api from '@services/api';

const AppRouter = () => {
  const location = useLocation();
  const state = location.state;
  const background = state && state.background;

  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const available = await api.checkServerAvailability();
        if (!available) {
          setServerError(true);
        }
      } catch {
        setServerError(true);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    checkServer();
  }, []);

  if (loading) return <Loader />;
  if (serverError) {
    return <NotFoundPage isServerError />;
  }

  return (
    <MainTemplate>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:userId" element={<ProfilePage isViewOnly={true} />} />
        <Route path="/profile" element={<ProfilePage isViewOnly={false} />} />
        <Route path="/profile/favorites" element={<FavoritesPage />} />
        <Route path="/profile/edit" element={<ProfileEditPage />} />
        <Route path="/event/:title/:id" element={<EventPage />} />
        <Route path="/category/:categoryName/:categoryId" element={<CategoryPage />} />
        <Route path="/locations/:locationName/:locationId" element={<LocationPage />} />
        <Route path="/events/map" element={<EventsMapPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/delete-account" element={<DeleteAccountPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/sort" element={<SortPage />} />
        </Routes>
      )}
    </MainTemplate>
  );
};

export default AppRouter;
