import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@services/api';
import EventTemplate from '@templates/EventTemplate/EventTemplate';

const EventPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('ID мероприятия не передан');
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        const data = await api.getEventById(id);
        setEvent(data);
      } catch (err) {
        setError('Не удалось загрузить мероприятие');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <EventTemplate
      event={event}
      loading={loading}
      error={error}
    />
  );
};

export default EventPage;
