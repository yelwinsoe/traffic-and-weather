import React from 'react';
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

import Location from './components/Location'
import Weather from './components/Weather'
import TrafficCamImage from './components/TrafficCamImage'

function App() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
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
              <Form.Label>Select a Date</Form.Label>
              <FormControl type='date' />
            </FormGroup>
          </Col>
          <Col md={3} xs={6}>
            <FormGroup>
              <Form.Label>Select a Time</Form.Label>
              <FormControl type='time' />
            </FormGroup>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col md={9} xs={12}>
            <Location />
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
