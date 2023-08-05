import React from 'react'

import {
  Tabs,
  Tab,
  Card
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faMap } from '@fortawesome/free-solid-svg-icons'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { LatLngTuple } from 'leaflet'

import styles from '../scss/Location.module.scss'

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

  return <Tabs
      defaultActiveKey="map"
      transition={true}
      className="mb-3"
    >
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
  </Tabs>
}

export default Location