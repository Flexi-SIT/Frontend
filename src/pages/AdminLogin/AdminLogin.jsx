import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import "./AdminLogin.css";

import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Axios from "axios";

const clientID =
  "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com";

function LoginSection() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    console.log("Registered");
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

  return (
    <Row className="container">
      {/* <Col className="img-container justify-content-center align-items-center">
        <img src="./1.svg" alt="login" className="login-img" />
      </Col> */}
      <Col className="text-container justify-content-center">
        <form method="POST" action="http://localhost:3001/voter">
          <input
            type="email"
            id="email"
            // placeholder="Email Address"
            name="email"
            className="email-input"
          />
          <br />
          <label htmlFor="name" className="email-input-label">
            Email
          </label>
          <br />
          <input
            type="password"
            id="password"
            // placeholder="Password"
            name="pass"
            className="password-input"
          />
          <label htmlFor="name">Password</label>
          <br></br>
          <br></br>
          {/* <input type="submit" /> */}
        </form>
        <Button variant="primary" type="submit" className="submit-button">
          SUBMIT
        </Button>
        {/* <Form className="mb-4">
          <Form.Group className="mb-4 login-email" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email Address"
              className="email-input"
            />
          </Form.Group>

          <Form.Group
            className="mb-4 login-password"
            controlId="formBasicEmail"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              className="password-input"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">
            SIGN IN
          </Button>
          <hr className="hrr" />
          <Login />
        </Form> */}
        {/* <Logout /> */}
      </Col>
    </Row>
  );
}

export default LoginSection;
