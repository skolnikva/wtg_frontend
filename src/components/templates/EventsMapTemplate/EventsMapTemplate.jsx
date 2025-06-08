import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { eventIcon } from '@utils/mapIcons';
import EventsGrid from '@organisms/Events/EventsGrid/EventsGrid';
import EventCard from '@organisms/Events/EventCard/EventCard';
import Slider from '@atoms/Slider/Slider';
import NothingFoundMessage from '@molecules/Events/NothingFoundMessage/NothingFoundMessage';
import LittleButton from '@atoms/Buttons/LittleButton/LittleButton';
import EventInfo from '@molecules/Events/EventInfo/EventInfo'
import styles from './EventsMapTemplate.module.scss';

const EventsMapTemplate = ({
  events = [],
  filteredEvents = [],
  selectedEvent = null,
  loading = false,
  sliderItems = [],
  sliderIndex = 0,
  onMarkerClick,
  onEventClick,
  onBackToList,
  onSliderChange,
  center = [56.4846, 84.9476],
  zoom = 13,
  page,
  totalPages,
  onPageChange,
}) => {
  const mapRef = React.useRef();

  const groupedByCoordinates = React.useMemo(() => {
    const map = new Map();

    filteredEvents.forEach(event => {
      const key = `${event.location.latitude},${event.location.longitude}`;
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(event);
    });

    return map;
  }, [filteredEvents]);

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <MapContainer 
          center={center} 
          zoom={zoom}
          className={styles.map}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Маркеры по координатам */}
          {Array.from(groupedByCoordinates.entries()).map(([coords, eventsGroup]) => {
            const [lat, lng] = coords.split(',').map(Number);

            return (
              <Marker
                key={coords}
                position={[lat, lng]}
                icon={L.icon(eventIcon)}
              >
                <Popup>
                  <div className={styles.popupContent}>
                    {eventsGroup.map((event) => (
                      <div key={event.id} className={styles.popupItem}>
                        <EventInfo
                          title={event.title}
                          location={event.location}
                          date={event.closest_date}
                          onTitleClick={() => {
                            onEventClick(event);
                            onMarkerClick?.(event);
                          }}
                        />
                        <hr />
                      </div>
                    ))}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        <div className={styles.sliderContainer}>
          {sliderItems.length > 0 && (
            <Slider
              items={sliderItems}
              value={sliderIndex}
              onChange={onSliderChange}
            />
          )}
        </div>
      </div>

      <div className={styles.eventsPanel}>
        {selectedEvent ? (
          <div className={styles.selectedEvent}>
            <EventCard 
              event={selectedEvent} 
              onClick={() => onEventClick(selectedEvent)}
            />
            <div className={styles.onBackToList}>
              <LittleButton variant="black" onClick={onBackToList}>
                Назад к списку
              </LittleButton>
            </div>
          </div>
        ) : (
          <>
            {filteredEvents.length === 0 && !loading ? (
              <div className={styles.noEventsMessage}>
                <NothingFoundMessage />
              </div>
            ) : (
              <EventsGrid
                events={filteredEvents}
                loading={loading}
                className={styles.grid}
                page={page}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsMapTemplate;
