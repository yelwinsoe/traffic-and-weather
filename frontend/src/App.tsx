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
  const [selectedLoc, setSelectedLoc] = useState<number | null>(null)

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

  useEffect(() => {
    setSelectedLoc(0)
  }, [locations])

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
              <FormControl type='date' defaultValue={date} max={dateString} onChange={(e) => { setDate(e.target.value) }} />
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
          <Col md={8} xs={12}>
            <Location locations={locations} selectedLoc={selectedLoc} setSelectedLoc={setSelectedLoc}/>
          </Col>
          <Col md={4} xs={12}>
            <p className='mt-5 text-secondary'>Traffic Cam Image</p>
            {(selectedLoc !== null && locations.length > 0) && <TrafficCamImage loc={locations[selectedLoc]}/>}
            <p className='mt-3 text-secondary'>Weather Forecast</p>
            <Weather />
          </Col>
        </Row>
        <br /><br />
      </Container>
    </>
  );
}

export default App;
