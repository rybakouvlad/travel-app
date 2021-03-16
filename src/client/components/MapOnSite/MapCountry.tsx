import React from 'react';
import { TileLayer } from 'react-leaflet';
import { Marker, MapContainer } from 'react-leaflet';
// import { StyledMapContainer } from "./App.styled";
import './MapCountry.css';

export default function MapCountry() {
  // const { centre_lat, centre_lon } = geo;
  // const [selectedArea, setSelectedArea] = useState({});
  return (
    <div className="mapContainer">
      <MapContainer center={[10, 0]} zoom={12} scrollWheelZoom={true}>
        {/* <Selector setSelectedArea={setSelectedArea} /> */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Area {...selectedArea} /> */}
        <Marker position={[10, 0]}></Marker>
      </MapContainer>
    </div>
  );
}
