import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundTemplate from '@templates/NotFoundTemplate/NotFoundTemplate';
import api from '@services/api';
import DotsLoader  from '@molecules/DotsLoader/DotsLoader.jsx';

const NotFoundPage = ({ isServerError = false }) => {
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState(404);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isServerError) {
      setErrorCode(503);
      setIsLoading(false);
      return;
    }

    const checkServer = async () => {
      try {
        const isServerAvailable = await api.checkServerAvailability();
        if (!isServerAvailable) {
          setErrorCode(503);
        }
      } catch {
        setErrorCode(503);
      } finally {
        setIsLoading(false);
      }
    };

    checkServer();
  }, [isServerError]);

  const handleGoBack = isServerError ? () => {} : () => navigate(-1);

  if (isLoading) return <DotsLoader />;

  return (
    <NotFoundTemplate
      errorCode={errorCode}
      onGoBack={handleGoBack}
      isServerError={isServerError}
    />
  );
};

export default NotFoundPage;
