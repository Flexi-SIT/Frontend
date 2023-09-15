import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { gapi } from "gapi-script";
import img1 from "../../assets/12.jpg";
import "./AdminLogin.css";

//For OAuth, future scope
const clientID =
  "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com";

function LoginSection() {
  const [cookies, setCookie] = useCookies(["adminLoggedIn"]);
  console.log(cookies.adminLoggedIn);

  const handleFormSubmit = async (event) => {
    //To define custom behavior
    event.preventDefault();

    const emailInput = event.target.email.value;
    const passwordInput = event.target.pass.value;

    //Sending post HTTP request and fetching data asynchronously
    const response = await fetch("http://localhost:3001/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setCookie("adminLoggedIn", true);
      window.location.href = "http://localhost:3000/adminPanel";
    } else {
      alert(data.message);
    }
  };

  //Initializing GAPI after component has rendered
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
    <Container
      className="text-center text-lg-start main-container"
      style={{ height: "100vh" }}
    >
      <Container fluid>
        <Row className="g-0 align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div
              className="card cascading-right"
              style={{
                background: "hsla(0, 0%, 100%, 0.55)",
                backdropFilter: "blur(30px)",
                height: "100%",
              }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Voter Login</h2>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign up
                  </Button>
                </Form>
              </div>
            </div>
          </Col>

          <Col lg={6} className="mb-5 mb-lg-0">
            <img src={img1} className="image-w-100 rounded-4 shadow-4" alt="" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default LoginSection;
