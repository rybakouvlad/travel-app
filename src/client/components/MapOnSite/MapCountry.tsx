import React from 'react';
import { TileLayer } from 'react-leaflet';
import { Marker, MapContainer } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet';
// import { Feature } from 'geojson';

import './MapCountry.css';
import * as mapData from './data/countriData.json';

import { useParams } from 'react-router';

export default function MapCountry() {
  interface IParam {
    id: string;
  }
  const { id } = useParams<IParam>();
  console.log(id);

  const geojsonFeature: any = {
    type: 'Feature',
    properties: {
      name: 'Coors Field',
      amenity: 'Baseball Stadium',
      popupContent: 'This is where the Rockies play!',
    },
    geometry: {
      type: 'MultiPolygon',
      coordinates: mapData.features[0].geometry.coordinates,
    },
  };
  const countryStyle: any = {
    fillColor: 'red',
    fillOpacity: 0.05,
    color: 'green',
    weight: 2,
  };

  // console.log(countryStyle)
  // const shirota: number = 10
  // const shirota:any = mapData["pl"].centr[0]
  // const dolgota:any = mapData["pl"].centr[1]
  const shirota: any = 0;
  const dolgota: any = 0;
  // const alpha: string = mapData.features[0].properties.centr
  // console.log("----------------", mapData.features[0].properties.centr)

  return (
    <div className="mainMap">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
      <MapContainer className="mapContainer" center={[shirota, dolgota]} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[shirota, dolgota]}></Marker>
        <GeoJSON style={countryStyle} data={geojsonFeature} />
      </MapContainer>
    </div>
  );
}
