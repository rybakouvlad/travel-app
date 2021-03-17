import React from 'react';
import { TileLayer } from 'react-leaflet';
import { Marker, MapContainer } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

import './MapCountry.css';
import * as mapData from './data/countriData.json';
import * as countriesCapitals from './data/countriesCapitals.json';

import { useParams } from 'react-router';

let countryIndex: number;

const main=(id2:string):void=>{
  mapData.features.forEach((element,index) => {
    if(id2 === element.properties.ISO_A3){
      countryIndex = index
    }
  })
}
interface IParam {
  id: string;
}

export default function MapCountry() {
  
  const { id } = useParams<IParam>();
  main(id)

  const geojsonFeature: any = {
    type: 'Feature',
    properties: {
      name: '',
      amenity: '',
      popupContent: '',
    },
    geometry: {
      type: mapData.features[countryIndex].geometry.type,
      coordinates: mapData.features[countryIndex].geometry.coordinates,
    },
  };

  const countryStyle: any = {
    fillColor: 'red',
    fillOpacity: 0.05,
    color: 'green',
    weight: 2,
  };

  const orangeIcon: any = L.icon({
    iconUrl: "https://www.svgrepo.com/show/202744/maps-and-flags-pin.svg",
    iconSize:     [38, 95], 
  });


  const shirota: any = countriesCapitals.features[countryIndex].properties.coord[0];
  const dolgota: any = countriesCapitals.features[countryIndex].properties.coord[1];

  return (
    <div className="mainMap">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
      <MapContainer className="mapContainer" center={[shirota, dolgota]} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[shirota, dolgota]} icon={orangeIcon}></Marker>
        <GeoJSON style={countryStyle} data={geojsonFeature} />
      </MapContainer>
    </div>
  );
}
