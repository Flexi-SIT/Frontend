import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import pollimg from "../../assets/5.svg";
import imgform from "../../assets/8.png";
import "./AddPoll.css";
import "swiper/css";

const AdminPanel = () => {
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
      <Container fluid className="addpoll-container">
        <Row>
          <Col className="justify-content-center align-items-center pollimg">
            <img src={pollimg} className="img1" alt="main-img" />
          </Col>
          <Col className="text-container justify-content-center align-items-center poll-left-text-1">
            <h1 className="poll-text-1">ADD POLL</h1>
          </Col>
          <Col className="text-container justify-content-center align-items-center poll-right-text-1">
            <h5 className="poll-text-2">Poll Title</h5>
            <input type="text" className="poll-title-desc" />
            <br />
            <br />
            <h5 className="poll-text-2">Description</h5>
            <input type="text" className="poll-title-desc" />
            <br />
            <br />
            <br />
            <Col className="poll-cal">
              <h5 className="poll-text-3 mx-2">Start Date</h5>
              <input type="date" className="poll-date" />
              <h5 className="poll-text-3 mx-2">End Date</h5>
              <input type="date" className="poll-date" />
            </Col>
            <br />
            <br />
            <Col className="poll-timer">
              <h5 className="poll-text-3 mx-3">Start Time</h5>
              <input type="time" className="poll-time" />
              <h5 className="poll-text-3 mx-3">End Time</h5>
              <input type="time" className="poll-time" />
            </Col>
            <br />
            <h5 className="poll-text-2">Add image</h5>
            <input type="image" src={imgform} className="poll-image" />
            <br />
            <br />
            <Button variant="dark" type="submit" className="poll-submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPanel;
