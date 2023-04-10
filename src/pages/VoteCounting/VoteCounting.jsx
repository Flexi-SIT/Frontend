import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import mainimg from "../../assets/1.svg";
import votecountingimg from "../../assets/5.svg";
import "./VoteCounting.css";

const VoteCounting = () => {
  return (
    <>
      <Navbar className="color-nav" bg="invisible" expand="lg" variant="light ">
        {/* <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="px-2 mr-auto">
            <Nav.Link className="px-4 nav-items" href="/voter-registration">
              Voter Registration
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/voting">
              Voting
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/votecount">
              Vote Counting
            </Nav.Link>
            <Nav.Link className="px-4 nav-items" href="/audit">
              Audit
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="main-container">
        <Row>
          <Col className="justify-content-center align-items-center">
            <img src={votecountingimg} className="main-img" />
          </Col>
          <Col className="text-container justify-content-center align-items-center left-text">
            <h1 className="web-text-left-1">
              POLL <br />
              RESULT
            </h1>
          </Col>
          <Col className="text-container justify-content-center align-items-center right-text">
            <h3 className="web-text-right-1">
              WEB <br />
              CHAIN
              <br />
              VOTE
            </h3>
            <h5 className="web-text-right-p">
              Login as an admin to add a poll for the voters
            </h5>
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

export default VoteCounting;
