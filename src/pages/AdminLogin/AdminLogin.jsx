import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import img1 from "../../assets/7.svg";
import "./AdminLogin.css";

import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Axios from "axios";

const clientID =
  "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com";

function LoginSection() {
  const navigate = useNavigate();
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // const form = event.target;

    const emailInput = event.target.email.value;
    const passwordInput = event.target.pass.value;
    // const formData = new FormData();
    // formData.append('email', emailInput);
    // formData.append('password', passwordInput);
    // console.log(emailInput, passwordInput)
    // console.log(formData)

    const response = await fetch('http://localhost:3001/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      })
    });
    const data = await response.json();
    console.log(data)
    if (response.ok) {
      // Redirect to admin panel
      window.location.href = 'http://localhost:3000/adminPanel';
    } else {
      // Display error message
      alert(data.message);
    }

    //setting admin logged in state to true
    localStorage.setItem('admin', 'true');
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
    <Container>
      <Row className="adminn-container">
        <Col className="img-container justify-content-center-align-items-center">
          <img src={img1} className="adminn-container-image" alt="img-1" />
        </Col>
        <Col className="text-container justify-content-center adminn-container-right">
          {/* <form method="POST" action="http://localhost:3001/admin"> */}
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name" className="adminn-container-label">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              className="adminn-container-input"
            ></input>
            <br />
            <br />
            <label htmlFor="name" className="adminn-container-label">
              Password
            </label>
            <br />
            <input
              type="password"
              name="pass"
              className="adminn-container-input"
            ></input>
            <br />
            <br />
            <input type="submit" className="adminn-container-submit" />
          </form>
        </Col>
        {/* <Col className="text-container justify-content-center align-items-center admin-container-left">
          <h1 className="admin-container-left-text">
            ADMIN
            <br />
            LOGIN
          </h1>
        </Col> */}
      </Row>
    </Container>
  );
}

export default LoginSection;
