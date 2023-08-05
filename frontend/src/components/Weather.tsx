import React from 'react'

import {
  Card
} from 'react-bootstrap'

import styles from '../scss/Weather.module.scss'

const Weather = () => {
  return <Card className={styles.card}>
    <Card.Body>
      <h3>63 Degree</h3>
    </Card.Body>
  </Card>
}

export default Weather