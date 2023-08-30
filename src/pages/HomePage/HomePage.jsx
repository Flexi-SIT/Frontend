import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import mainimg from "../../assets/1.svg";
import vote from "../../assets/3.svg";
import result from "../../assets/4.svg";
import "./HomePage.css";

import BarcodeScannerApp from "../../components/barcodeScan/BarcodeScanApp";


const HomePage = () => {
  const [index1, setIndex1] = useState(0);

  const handleSelect1 = (selectedIndex1) => {
    setIndex1(selectedIndex1);
  };

  return (
    <>
      <Navbar className="color-nav" bg="invisible" expand="lg" variant="light ">
        {/* <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="px-2 mr-auto">
            <Nav.Link className="px-4 nav-items" href="/voter">
              Voter Registration
            </Nav.Link>
            {/* <Nav.Link className="px-4 nav-items" href="/voting">
              Voting
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/votecount">
              Vote Counting
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/audit">
              Audit
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <BarcodeScannerApp />

      <Carousel activeIndex={index1} onSelect={handleSelect1}>
        {/* First slide */}
        <Carousel.Item>
          <Container fluid className="main-container vh-100 d-flex flex-column">
            <Row className="flex-grow-1">
              <Col className="justify-content-center align-items-center">
                <img src={mainimg} className="main-img" alt="main-img" />
              </Col>
              <Col className="text-container justify-content-center align-items-center left-text">
                <h1 className="web-text-left">
                  WEB <br />
                  CHAIN
                  <br />
                  VOTE
                </h1>
              </Col>
              <Col className="text-container justify-content-center align-items-center right-text">
                <h3 className="web-text-right">
                  WEB <br />
                  CHAIN
                  <br />
                  VOTE
                </h3>
                <h5 className="web-text-right-p">
                  <span>"Your Voice, Your Vote!"</span>
                  <br />
                  Make it count with our secure
                  <br />
                  e-voting platform.
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  type="submit"
                  className="submit-button-admin"
                  href="/voter"
                >
                  Voter Login
                </Button>
                <Button
                  variant="dark"
                  type="submit"
                  className="submit-button-company"
                  href="/admin"
                >
                  Admin Login
                </Button>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>

        {/* Second slide */}
        <Carousel.Item>
          <Container fluid className="main-container vh-100 d-flex flex-column">
            <Row className="flex-grow-1">
              <Col className="justify-content-center align-items-center">
                <img src={mainimg} className="main-img" alt="main-img" />
              </Col>
              <Col className="text-container justify-content-center align-items-center left-text">
                <h1 className="web-text-left">
                  WEB <br />
                  CHAIN
                  <br />
                  VOTE
                </h1>
              </Col>
              <Col className="text-container justify-content-center align-items-center right-text">
                <h3 className="web-text-right-2">ONGOING POLL</h3>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="dark"
                  type="submit"
                  className="submit-button-register"
                  href="/voter"
                >
                  Register
                </Button>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      </Carousel>
      {/* <Container fluid className="main-container-2">
        <Row xs={1} md={3} className="mt-5 mb-5 g-1">
          <Col>
            <Card className="container-uses-register">
              <Card.Img variant="top" src={result} />
              <Card.Body>
                <Card.Title>Register yourself a voter</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Card className="container-uses-vote px-5">
            <Card.Img
              className="container-uses-vote-img"
              variant="top"
              src={vote}
            />
            <Card.Body>
              <Card.Title>Cast your vote</Card.Title>
            </Card.Body>
          </Card>
          <Card className="container-uses-result px-4">
            <Card.Img
              className="container-uses-result-img"
              variant="top"
              src={result}
            />
            <Card.Body>
              <Card.Title>Check the results</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container> */}
    </>
  );
};

export default HomePage;
