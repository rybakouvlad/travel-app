import React from 'react';
import { TileLayer } from 'react-leaflet';
import { Marker, MapContainer } from 'react-leaflet';
import './MapCountry.css';

export default function MapCountry() {

  
  return (
    <div className="mainMap">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
      <MapContainer className="mapContainer" center={[10, 0]} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[10, 0]} icon="https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"></Marker>
      </MapContainer>
    </div>
  );
}
