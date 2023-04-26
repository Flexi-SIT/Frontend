import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import votingimg from "../../assets/7.svg";
import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import NewCandidate from "./NewCandidate";
import NewElection from "./NewElection";
import VoteCount from "./VoteCount";
import "./CreateElection.css";
import img1 from "../../assets/6.svg";

function handleLogout() {
  localStorage.setItem('admin', false)
  window.location.href = 'http://localhost:3000/voter';
}

const CreateElections = () => {

  return (
    <>
      <Navbar className="color-nav" bg="invisible" expand="lg" variant="light ">
        {/* <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="px-2 mr-auto">
            <Nav.Link className="px-4 nav-items" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/create-election">
              New Election
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/adminPanel">
              Current Elections
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" onClick={handleLogout}>
              Log Out
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="main-container">
        <Row>
          <Col className="img-container">
            <img src={img1} className="img-1" alt="img-1" />
          </Col>
          <Col className="text-container container-left">
            <h1 className="container-left-text">
              NEW
              <br />
              ELECTION
            </h1>
          </Col>
          <Col>
            <NewElection />
          </Col>
        </Row>
      </Container>
      {/* <VoteCount /> */}
    </>
  );
};

export default CreateElections;
