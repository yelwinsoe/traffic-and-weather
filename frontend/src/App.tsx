import { useEffect, useState } from 'react';
import styles from './App.module.scss'

import {
  Container,
  Navbar,
  Image,
  Row,
  Col,
  InputGroup,
  FormControl
} from 'react-bootstrap'
import axios from 'axios';

import Location from './components/Location'
import Weather from './components/Weather'
import TrafficCamImage from './components/TrafficCamImage'

import { IndividualLocatonProps } from './components/IndividualLocation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function App() {
  
  // Constructing current date and time string
  const newDate = new Date()
  const dateTimeString = new Date(newDate.getTime() - (newDate.getTimezoneOffset() * 60000)).toISOString()
  const dateString = dateTimeString.split('T')[0]
  const timeFullString = dateTimeString.split('T')[1]
  const hourMinute = timeFullString.split(':')[0] + ':' + timeFullString.split(':')[1]
  const [date, setDate] = useState<string>(dateString)
  const [time, setTime] = useState<string>(hourMinute)

  const [locations, setLocations] = useState<IndividualLocatonProps[]>([])
  const [selectedLoc, setSelectedLoc] = useState<number | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const dateTime = date + 'T' + time;
    const getLocation = async () => {
      setIsLoading(true)
      try {
        const url = `${process.env.REACT_APP_API_URL}/traffic?dateTime=${dateTime}`
        const res = await axios.get(url)
        setLocations(res.data)
      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
      setShowSuccess(true)
    }
    getLocation()
  }, [date, time])

  useEffect(() => {
    setSelectedLoc(0)
  }, [locations])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(false)
    }, 2000);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  return (
    <>
      <Navbar bg="white" data-bs-theme="white">
        <Container fluid>
          <Navbar.Brand>
            <img
              alt=""
              src="logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            /> &nbsp;
            Traffic Images and Weather
          </Navbar.Brand>
        </Container>
      </Navbar>
      <hr />
      <Container fluid>
        <Row className='my-3'>
          <Col md={3} className='mt-1'>
            <InputGroup>
              <InputGroup.Text className='text-secondary'>Select a Date</InputGroup.Text>
              <FormControl type='date' defaultValue={date} max={dateString} onChange={(e) => { setDate(e.target.value) }} />
            </InputGroup>
          </Col>
          <Col md={3} className='mt-1'>
            <InputGroup>
              <InputGroup.Text className='text-secondary'>Select a Time</InputGroup.Text>
              <FormControl type='time' defaultValue={time} onChange={(e) => { setTime(e.target.value) }} />
            </InputGroup>
          </Col>
          <Col>
            {isLoading && <Image src='/loading.gif' className={styles.loading} />}
            {showSuccess && <FontAwesomeIcon className={styles.success} icon={faCheckCircle} />}
          </Col>
        </Row>
        <Row>
          <Col md={8} xs={12} className={styles.mapCol}>
            <Location locations={locations} selectedLoc={selectedLoc} setSelectedLoc={setSelectedLoc}/>
          </Col>
          <Col md={4} xs={12}>
            <p className='text-secondary'>Weather Forecast</p>
            {(selectedLoc !== null && locations.length > 0) && <Weather dateTime={`${date}T${time}`} loc={locations[selectedLoc]}/> }
            <p className='mt-4 mb-1 text-secondary'>Traffic Image</p>
            {(selectedLoc !== null && locations.length > 0) && <TrafficCamImage loc={locations[selectedLoc]}/>}
          </Col>
        </Row>
      </Container>
      <br /><br />
    </>
  );
}

export default App;
