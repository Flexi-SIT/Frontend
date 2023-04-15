import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import img1 from "../../assets/5.svg";
import "./AdminPanel.css";
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
    </>
  );
};

export default AdminPanel;
