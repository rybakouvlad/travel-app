import React from 'react';
import { TileLayer } from 'react-leaflet';
import { Marker, MapContainer } from 'react-leaflet';
import { GeoJSON } from 'react-leaflet';
// import { Feature } from 'geojson';

import './MapCountry.css';
import * as mapData from './data/countriData.json';

import { useParams } from 'react-router';

// const nameCountry: string = 'FR'
let countryIndex: number;

const main=(id2:string):void=>{
  mapData.features.forEach((element,index) => {
    console.log(id2)
    if(id2 === element.properties.ISO_A3){
      // this.centr = [element.properties.capital[0],element.properties.capital[1]]
      countryIndex = index
      console.log(index)

    }
  })
}
interface IParam {
  id: string;
}

export default function MapCountry() {
  
  const { id } = useParams<IParam>();
  console.log("---------------------",id);
  main(id)

  const geojsonFeature: any = {
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

  // console.log(countryStyle)
  // const shirota: number = 10
  // const shirota:any = mapData["pl"].centr[0]
  // const dolgota:any = mapData["pl"].centr[1]
  const shirota: any = 0;
  const dolgota: any = 0;
  // const alpha: string = mapData.features[0].properties.centr
  // console.log("----------------", mapData.features[countryIndex].geometry.type)

  return (
    <div className="mainMap">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"></script>
      <MapContainer className="mapContainer" center={[shirota, dolgota]} zoom={3} scrollWheelZoom={true}>
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
