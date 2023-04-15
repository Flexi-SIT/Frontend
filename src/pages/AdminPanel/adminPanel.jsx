import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import votingimg from "../../assets/7.svg";
import election1 from "../../assets/9.jpg";
import Card from "react-bootstrap/Card";
import "swiper/css";
import NewCandidate from "./NewCandidate";
import NewElection from "./NewElection";
import "./AdminPanel.css";
import { useParams } from "react-router";

const AdminPanel = () => {
  const [showComponent, setShowComponent] = useState(false);

  const handleClick = () => {
    setShowComponent(true);
  };

  return (
    <>
      <Navbar className="color-nav" bg="invisible" expand="lg" variant="light ">
        {/* <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="px-2 mr-auto">
            <Nav.Link className="px-4 nav-items" href="/vote">
              New Election
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/vote">
              Current Elections
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/addPoll">
              Add Poll
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="container-1">
        <Row>
          <Col className="justify-content-center align-items-center">
            <img src={votingimg} className="img1" alt="main-img" />
          </Col>
          <Col className="text-container justify-content-center align-items-center admin-left-text-1">
            <h1 className="admin-text-1">ONGOING POLLS</h1>
            <h5 className="admin-text-2">
              Add a poll to conduct an election <br />
              The voters can then vote
            </h5>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Container fluid className="container-2 py-2">
        <Row className="election-1">
          <Col className="img-container justify-content-center align-items-center">
            <Link to="/vote">
              <img src={election1} className="election-img-1" alt="election" />
            </Link>
          </Col>
          <Col className="text-container justify-content-center align-items-center">
            <h1 className="election-text">SIT MONITOR ELECTION</h1>
            <Col>
              <button className="election-button">EDIT DETAILS</button>
              <button onClick={handleClick} className="election-button">
                ADD CANDIDATE
              </button>
              {showComponent && <NewCandidate />}
            </Col>
            <Col>
              <button className="election-button">ADD PHOTOS</button>
              <button className="election-button">VIEW VOTE COUNT</button>
            </Col>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <NewElection />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPanel;
