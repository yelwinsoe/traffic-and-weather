import React from 'react'

import {
  Tabs,
  Tab,
  Card
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faMap, faMapMarker } from '@fortawesome/free-solid-svg-icons'

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

const Location = () => {

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
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </Tab>
        <Tab eventKey="list" title={<ListTitle />}>
          <div className={styles.locationList}>
            {[0, 1, 2, 3, 4].map((i) => {
              return <Card key={i} className='mb-1'>
                <Card.Body>
                  <p className='mb-0'><strong className='fs-4'>Lakeside</strong> <br /> <small className='text-secondary'>201 Boon Lay Wy, Singapore 649845</small></p>
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