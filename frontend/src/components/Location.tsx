import React from 'react'

import {
  Tabs,
  Tab,
  Card
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faMap } from '@fortawesome/free-solid-svg-icons'

import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { LatLngTuple } from 'leaflet'

import styles from '../scss/Location.module.scss'

import icon from '../assets/location-dot-solid.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

interface GeoProps {
  BUILDINGNAME: string
  ROAD: string
}

interface LatLongProps {
  latitude: number
  longitude: number
}
export interface IndividualLocatonProps {
  geo: GeoProps
  timestamp: string
  location: LatLongProps
}

interface LocationProps {
  locations: IndividualLocatonProps[]
}

const Location = ({locations}: LocationProps) => {

  const ListTitle = () => {
    return <>
      <FontAwesomeIcon icon={faList} /> &nbsp; List View
    </>
  }
  
  const MapTitle = () => {
    return <>
      <FontAwesomeIcon icon={faMap} /> &nbsp; Map View
    </>
  }

  const position: LatLngTuple = [1.2868108, 103.8545349]

  return (
    <>
      <p className='text-secondary'>Pick a location</p>
      <Tabs
        defaultActiveKey="map"
        transition={true}
        className="mb-3"
        variant='pills'
      >
        <Tab eventKey="map" title={<MapTitle />}>
          <div style={{ height: '400px' }}>
            <MapContainer center={position} zoom={11} scrollWheelZoom={false} style={{ height: '400px' }}>
              <TileLayer url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png" />
              {locations.map((loc: IndividualLocatonProps, i: number) => {
                return <Marker position={[loc.location.latitude,  loc.location.longitude]} key={i}>
                <Popup>
                  <p>{loc.geo?.BUILDINGNAME}</p>
                  <p>{loc.geo?.ROAD}</p>
                </Popup>
              </Marker>
              })}
            </MapContainer>
          </div>
        </Tab>
        <Tab eventKey="list" title={<ListTitle />}>
          <div className={styles.locationList}>
            {locations.map((loc: IndividualLocatonProps, i: number) => {
              return <Card key={i} className='mb-1'>
                <Card.Body>
                  <p className='mb-0'><strong className='fs-5'>{loc.geo?.ROAD}</strong> <br /> <small className='text-secondary'>{loc.geo?.BUILDINGNAME}</small></p>
                  <small>{loc.location.latitude}</small>
                </Card.Body>
              </Card>
            })}
          </div>
        </Tab>
      </Tabs>
    </>
  )
}

export default Location