import React, { useEffect, useState } from 'react'

import {
  Card
} from 'react-bootstrap'
import moment from 'moment'

import styles from '../scss/Weather.module.scss'

import { IndividualLocatonProps } from './IndividualLocation'
import axios from 'axios'

interface Props {
  dateTime: string
  loc: IndividualLocatonProps
}

interface WeaProps {
  forecast: {
    area: string
    forecast: string
  }
  update_timestamp: string
  valid_period: {
    start: string
    end: string
  }
}

const Weather = ({ dateTime, loc }: Props) => {

  const [wea, setWea] = useState<WeaProps | null>(null)

  useEffect(() => {
    const getWeather = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/weather?dateTime=${dateTime}&latLong=${loc.location.latitude},${loc.location.longitude}`;
        const res = await axios.get(url)
        setWea(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getWeather()
  }, [dateTime, loc])

  const getWeatherStyleClass = () => {
    let res = styles.weatherCardBody;
    switch(wea?.forecast.forecast) {
      case 'Partly Cloudy (Day)':
        res = styles.partlyCloudy
        break;
      case 'Heavy Rain (Day)':
        res = styles.heavyRain;
        break;
    }
    return res;
  }

  return <Card className={styles.card}>
    <Card.Body className={getWeatherStyleClass()}>
      <br /><br /><br />
      {wea !== null && <>
        <h3 className='fw-bold'>{wea.forecast.forecast}</h3>
        <small>{wea.forecast.area}</small>
      </>}
      <br /><br /><br />
      <small>Updated: {moment(wea?.update_timestamp).fromNow()}</small>
    </Card.Body>
  </Card>
}

export default Weather