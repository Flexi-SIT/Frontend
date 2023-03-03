import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Login from './Login';
import Logout from './Logout';
import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script'
import './VoterLogin.css'

import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import Axios from 'axios'


const clientID = "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com"


function LoginSection() {

  const navigate = useNavigate();
  const handleSubmit = event => {
    console.log("Registered")
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientID: clientID,
        scope: ""
      })
    };

    gapi.load('client:auth2', start)
  });


  //Axios.post("http://localhost:3002/voterdata", { email: email, password: pass });

  return (
    <Row className='d-flex flex-cloumn container'>
      <Col className='img-container justify-content-center align-items-center'>
        <img src='./1.svg' alt='login' className='login-img' />
      </Col>
      <Col className='text-container d-flex justify-content-center'>
        <form method="POST" action="http://localhost:3001/voter">
          <input type="email" placeholder='Email Address' name="email"></input>
          <input type="password" placeholder='Password' name="pass" ></input>
          <input type="submit" />
        </form>
        {/* <Form className='mb-4' onSubmit={handleSubmit} method="POST" action="/voterdata">
          <Form.Group className="mb-4 login-email" controlId="formBasicEmail">
            <Form.Control type="email" placeholder='Email Address' className='email-input' id="email" />
          </Form.Group>

          <Form.Group className="mb-4 login-password" controlId="formBasicEmail">
            <Form.Control type="password" placeholder='Password' className='password-input' id="pass" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <Button variant="primary" type="submit" className='submit-button'>
            SIGN IN
          </Button>
          <hr className='hrr' />
          <Login />
        </Form> */}
        {/* <Logout /> */}
      </Col>
    </Row>
  )
}

export default LoginSection
