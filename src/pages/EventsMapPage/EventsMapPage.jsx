import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@services/api';
import EventsMapTemplate from '@templates/EventsMapTemplate/EventsMapTemplate';

const fetchAllByPagination = async (fetchFn, ...fetchArgs) => {
  const limit = 100;
  let offset = 0;
  let allItems = [];
  let total = 0;

  while (true) {
    const { items, total: fetchedTotal } = await fetchFn(...fetchArgs, limit, offset);
    allItems = [...allItems, ...(items || [])];
    total = fetchedTotal;

    if (allItems.length >= total) break;
    offset += limit;
  }

  return allItems;
};

const EventsMapPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentHour] = useState(new Date().getHours());
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderItems, setSliderItems] = useState([]);

  useEffect(() => {
    const generateSliderItems = () => {
      const now = new Date();
      const today = new Date(now.toISOString().split('T')[0]);
      const items = [];

      for (let hour = currentHour; hour <= 23; hour++) {
        const time = new Date(today);
        time.setHours(hour);
        items.push({
          type: 'hour',
          value: hour,
          time: time,
          date: today.toISOString().split('T')[0]
        });
      }

      for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        items.push({
          type: 'day',
          value: i,
          time: date,
          date: date.toISOString().split('T')[0]
        });
      }

      return items;
    };

    setSliderItems(generateSliderItems());
  }, [currentHour]);

  useEffect(() => {
    if (sliderItems.length === 0) return;

    const loadEvents = async () => {
      setLoading(true);
      const selectedItem = sliderItems[sliderIndex];

      try {
        let allEvents = [];

        if (selectedItem.type === 'hour') {
          allEvents = await fetchAllByPagination(
            api.getEventsByDateAndTimeRange,
            selectedItem.date,
            selectedItem.value
          );
        } else {
          allEvents = await fetchAllByPagination(
            api.getEventsByDate,
            selectedItem.date
          );
        }

        const eventsWithLocations = await loadLocations(allEvents);
        setEvents(eventsWithLocations);
        setFilteredEvents(eventsWithLocations);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [sliderIndex, sliderItems]);

  const loadLocations = async (events) => {
    const eventsWithLocations = await Promise.all(
      events.map(async (event) => {
        if (!event.location?.id) return null;

        try {
          const fullLocation = await api.getLocationById(event.location.id);
          const latitude = parseFloat(fullLocation.latitude);
          const longitude = parseFloat(fullLocation.longitude);

          if (isNaN(latitude) || isNaN(longitude)) return null;

          return {
            ...event,
            location: {
              ...fullLocation,
              latitude,
              longitude,
            },
          };
        } catch {
          return null;
        }
      })
    );

    return eventsWithLocations.filter((event) => event !== null);
  };

  return (
    <EventsMapTemplate
      events={events}
      filteredEvents={filteredEvents}
      selectedEvent={selectedEvent}
      loading={loading}
      sliderItems={sliderItems}
      sliderIndex={sliderIndex}
      onMarkerClick={setSelectedEvent}
      onEventClick={setSelectedEvent}
      onBackToList={() => setSelectedEvent(null)}
      onSliderChange={setSliderIndex}
    />
  );
};

export default EventsMapPage;
