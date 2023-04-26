import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import img1 from "../../assets/7.svg";
import "./VoterLogin.css";

import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Axios from "axios";

const clientID =
  "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com";

function LoginSection() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    console.log("Registered");
    localStorage.setItem('voter', 'true')
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientID: clientID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });


  //Axios.post("http://localhost:3002/voterdata", { email: email, password: pass });

  return (
    <Row className="voter-login-container">
      <Col className=" justify-content-center align-items-center voter-login-img">
        <img src={img1} alt="login" className="login-img" />
      </Col>
      <Col className="text-container justify-content-center align-item-center voter-login-container-right">
        <form method="POST" action="http://localhost:3001/voter">
          <label htmlFor="name" className="voter-login-label">
            Email
          </label>
          <br />
          <input
            type="email"
            name="email"
            className="voter-login-input"
          ></input>
          <br />
          <br />
          <label htmlFor="name" className="voter-login-label">
            Password
          </label>
          <br />
          <input
            type="password"
            name="pass"
            className="voter-login-input"
          ></input>
          <br />
          <br />
          <input type="submit" className="voter-login-submit" onClick={handleSubmit} />
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
  );
}

export default LoginSection;
