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
  // const [index1, setIndex1] = useState(0);

  // const handleSelect1 = (selectedIndex1) => {
  //   setIndex1(selectedIndex1);

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#0089d6" }}
        bg="#0089d6"
        expand="lg"
        variant="light"
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="px-2 mr-auto">
            <Nav.Link className="px-4 nav-items" href="/voter">
              Voter Registration
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* <BarcodeScannerApp /> */}

      <Container fluid className="main-container vh-100 d-flex flex-column">
        <Row className="flex-grow-1">
          <Col className="justify-content-center align-items-center">
            <img src={mainimg} className="main-img" alt="main-img" />
          </Col>
          <Col className="text-container justify-content-center align-items-center left-text">
            <h1 className="web-text-left">
              WE<span>B</span> <br />
              CHAI<span>N</span>
              <br />
              VOT<span>E</span>
            </h1>
          </Col>
          <Col className="text-container justify-content-center align-items-center right-text">
            {/* <h3 className="web-text-right">
              WEB <br />
              CHAIN
              <br />
              VOTE
            </h3> */}
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
    </>
  );
};

export default HomePage;
