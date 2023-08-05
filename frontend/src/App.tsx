import React, { useEffect, useState } from 'react';
import styles from './App.module.scss'

import {
  Container,
  Navbar,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl
} from 'react-bootstrap'
import axios from 'axios';

import Location from './components/Location'
import Weather from './components/Weather'
import TrafficCamImage from './components/TrafficCamImage'

import { IndividualLocatonProps } from './components/IndividualLocation';

function App() {
  
  var newDate = new Date(); // Or the date you'd like converted.
  const dateTimeString = new Date(newDate.getTime() - (newDate.getTimezoneOffset() * 60000)).toISOString()
  const dateString = dateTimeString.split('T')[0]
  const timeFullString = dateTimeString.split('T')[1]
  const hourMinute = timeFullString.split(':')[0] + ':' + timeFullString.split(':')[1]
  const [date, setDate] = useState<string>(dateString)
  const [time, setTime] = useState<string>(hourMinute)

  const [locations, setLocations] = useState<IndividualLocatonProps[]>([])

  useEffect(() => {
    const dateTime = date + 'T' + time;
    const getLocation = async () => {
      console.log(process.env)
      const url = `${process.env.REACT_APP_API_URL}/traffic?dateTime=${dateTime}`
      const res = await axios.get(url)
      setLocations(res.data)
    }
    getLocation()
  }, [date, time])

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Traffic Cam Images and Weather
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container className='mt-4'>
        <Row>
          <Col md={3} xs={6}>
            <FormGroup>
              <Form.Label className='text-secondary'>Select a Date</Form.Label>
              <FormControl type='date' defaultValue={date} onChange={(e) => { setDate(e.target.value) }} />
            </FormGroup>
          </Col>
          <Col md={3} xs={6}>
            <FormGroup>
              <Form.Label className='text-secondary'>Select a Time</Form.Label>
              <FormControl type='time' defaultValue={time} onChange={(e) => { setTime(e.target.value) }} />
            </FormGroup>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col md={9} xs={12}>
            <Location locations={locations}/>
          </Col>
          <Col md={3} xs={12}>
            <p className='mt-5 text-secondary'>Weather Forecast</p>
            <Weather />
            <br />
            <p className='text-secondary'>Traffic Cam Image</p>
            <TrafficCamImage />
          </Col>
        </Row>
        <br /><br />
      </Container>
    </>
  );
}

export default App;
