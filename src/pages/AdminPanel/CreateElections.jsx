import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "swiper/css";
import NewCandidate from "./NewCandidate";
import NewElection from "./NewElection";
import VoteCount from "./VoteCount";
import "./CreateElection.css";
import bgImage from "../../assets/bg-team.svg";

import { useCookies } from "react-cookie";
import { withCookies } from "react-cookie";

const CreateElections = () => {
  const [cookies, setCookie] = useCookies(["adminLoggedIn"]);

  function handleLogout() {
    console.log(cookies.adminLoggedIn);
    setCookie("adminLoggedIn", false);
    localStorage.setItem("admin", false);
    window.location.href = "http://localhost:3000/voter";
  }
  console.log(cookies.adminLoggedIn);
  if (cookies.adminLoggedIn == "false") {
    return (
      <>
        <h1 className="create-election-logout">You have not logged in</h1>
      </>
    );
  }
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
      <header
        className="create-election-header"
        style={{ backgroundColor: "#0089d6" }}
      >
        <div className="create-election-header-content">
          <div className="create-election-header-text">
            <h1 className="create-election-header-title">Start New Election</h1>
            <p className="create-election-header-description">
              "Empower Change with Your Vote." Begin a new election and inspire
              others to participate in the democratic process
            </p>
          </div>
          <div className="create-election-header-image">
            <img src={bgImage} alt="Election Team" />
          </div>
        </div>
      </header>
      <Container fluid className="main-container">
        <Col className="container-right">
          <NewElection />
        </Col>
      </Container>
      {/* <VoteCount /> */}
    </>
  );
};

export default CreateElections;
