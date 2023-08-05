import React from 'react';
import './App.scss';

import {
  Container,
  Navbar,
  Row,
  Col
} from 'react-bootstrap'

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
    </>
  );
}

export default App;
