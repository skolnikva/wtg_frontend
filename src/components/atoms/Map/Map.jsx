import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import { eventIcon } from '@utils/mapIcons';

const Map = ({ center, zoom = 15, events = [] }) => {
  return (
    <MapContainer 
      center={center} 
      zoom={zoom}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Дефолтный маркер центра */}
      <Marker 
        position={center} 
        icon={L.icon(eventIcon)}
      />
      
      {/* Маркеры мероприятий */}
      {events.map(event => (
        <Marker
          key={event.id}
          position={[event.location.latitude, event.location.longitude]}
          icon={L.icon(eventIcon)}
        />
      ))}
    </MapContainer>
  );
};

export default Map;