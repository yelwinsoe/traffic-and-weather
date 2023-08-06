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
        const url = `${process.env.REACT_APP_API_URL}/weather?dateTime=${dateTime}&lat=${loc.location.latitude}&long=${loc.location.longitude}`;
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
    if (wea?.forecast.forecast.includes('cloudy')) {
      res = styles.cloudy
    } else if (wea?.forecast.forecast.includes('sunny')) {
      res = styles.sunny
    } else if (wea?.forecast.forecast.includes('rain')) {
      res = styles.rainy
    } else {
      res = styles.defaultWeather;
    }
    return res;
  }

  return <Card className={styles.card}>
    <Card.Body className={getWeatherStyleClass()}>
      <br /><br />
      {wea !== null && <>
        <h3 className='fw-bold'>{wea.forecast.forecast}</h3>
        <small>{wea.forecast.area}</small>
      </>}
      <br /><br />
      <small>Updated: {moment(wea?.update_timestamp).fromNow()}</small>
    </Card.Body>
  </Card>
}

export default Weather