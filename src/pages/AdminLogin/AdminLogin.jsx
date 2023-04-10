import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import "./AdminLogin.css";

const clientID =
  "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com";

const LoginSection = () => {
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
    <Row className="d-flex flex-cloumn container">
      <Col className="img-container justify-content-center align-items-center">
        <img src="./1.svg" alt="login" className="login-img" />
      </Col>
      <Col className="text-container d-flex justify-content-center">
        <Form className="mb-4">
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
        </Form>
        {/* <Logout /> */}
      </Col>
    </Row>
  );
};

export default LoginSection;
