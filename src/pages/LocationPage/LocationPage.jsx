import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@services/api';
import LocationTemplate from '@templates/LocationTemplate/LocationTemplate';
import usePaginatedEvents from '@hooks/usePaginatedEvents';

const LocationPage = () => {
  const { locationId } = useParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const {
    events,
    loading,
    page,
    totalPages,
    handlePageChange,
  } = usePaginatedEvents(api.getEventsByLocation, locationId);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const locationData = await api.getLocationById(locationId);
        setLocation(locationData);
      } catch (err) {
        console.error('Ошибка при загрузке локации:', err);
        setError('Не удалось загрузить данные локации');
      }
    };

    fetchLocation();
  }, [locationId]);

  if (error) return <div>{error}</div>;

  return (
    <LocationTemplate
      location={location}
      events={events}
      loading={loading}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};


export default LocationPage;
