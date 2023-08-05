import React, { useEffect, useState } from 'react'

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
import IndividualLocation from './IndividualLocation'
import { IndividualLocatonProps } from './IndividualLocation'

import styles from '../scss/Location.module.scss'

import icon from '../assets/location-dot-solid.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

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

  const [selectedLoc, setSelectedLoc] = useState<number | null>(null)

  useEffect(() => {
    if (selectedLoc !== null) {
      console.log(locations[selectedLoc])
    }
  }, [selectedLoc, locations])

  const position: LatLngTuple = [1.3499, 103.8734]

  return (
    <>
      <p className='text-secondary mb-2'>Pick a location</p>
      <Tabs
        defaultActiveKey="map"
        transition={true}
        className="mb-3"
        variant='pills'
      >
        <Tab eventKey="map" title={<MapTitle />}>
          <div style={{ height: '400px' }}>
            <MapContainer center={position} zoom={11} scrollWheelZoom={true} style={{ height: '400px' }}>
              <TileLayer url="https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png" />
              {locations.map((loc: IndividualLocatonProps, i: number) => {
                if ('geo' in loc) {
                  return <Marker position={[loc.location.latitude,  loc.location.longitude]} key={i}>
                  <Popup>
                    {<IndividualLocation loc={loc} />}
                  </Popup>
                </Marker>
                } else {
                  return ''
                }
              })}
            </MapContainer>
          </div>
        </Tab>
        <Tab eventKey="list" title={<ListTitle />}>
          <div className={styles.locationList}>
            {locations.map((loc: IndividualLocatonProps, i: number) => {
              if ('geo' in loc) {
                return <Card key={i} className={selectedLoc === i ? styles.selectedLocation : styles.location} onClick={() => {
                  setSelectedLoc(i)
                }}>
                  <Card.Body>
                    <IndividualLocation loc={loc} />
                  </Card.Body>
                </Card>
              } else {
                return ''
              }
            })}
          </div>
        </Tab>
      </Tabs>
    </>
  )
}

export default Location