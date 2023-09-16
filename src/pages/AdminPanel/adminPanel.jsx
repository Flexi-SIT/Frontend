import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import mainimg from "../../assets/1.svg";
import Button from "react-bootstrap/Button";
import { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "swiper/css";
import "./AdminPanel.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election_name: [],
      election_organizer: [],
      election_id: [],
      final: [],
      id: null,
    };
    this.handleLogout = this.handleLogout.bind(this); // bind the method to the component's context
  }

  handleLogout() {
    const { cookies } = this.props;
    cookies.set("adminLoggedIn", false);
    localStorage.setItem("admin", false);
    window.location.href = "http://localhost:3000/admin";
  }

  componentDidMount() {
    let currentComponent = this;
    axios
      .get("http://localhost:3001/api/electionName", {})
      .then(function (response) {
        var data = response.data;
        currentComponent.setState({
          final: data,
        });
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  handleInputChange = (e) => {
    var name = e.target.innerHTML;
    var index = 0;
    for (let i = 0; i < this.state.election_name.length; i++) {
      if (name === this.state.election_name[i]) {
        index = i;
        break;
      }
    }
    var id = this.state.election_id[index];
    this.setState({
      id: id,
    });
  };

  render() {
    //If admin is not logged in display:
    const { cookies } = this.props;
    console.log(cookies.get("adminLoggedIn"));
    if (cookies.get("adminLoggedIn") == "false") {
      return (
        <>
          <h1 className="admin-panel-logout">You have not logged in</h1>
        </>
      );
    }

    //to display list of elections
    const electionList = this.state.final.map((election) => {
      return (
        <div className="election-list" key={election.election_id}>
          <div className="election-box">
            <p className="election-name">
              <b>{election.election_name}</b>
            </p>
            <div className="button-container">
              <Link
                to={"/candidates/" + election.election_id}
                className="title"
                onClick={this.handleInputChange}
              >
                <button
                  id={election.election_id}
                  className="small-btn add-candidate-btn"
                >
                  Add candidate
                </button>
              </Link>
              <Link
                to={"/voteCount/" + election.election_id}
                className="title"
                onClick={this.handleInputChange}
              >
                <button
                  id={election.election_id}
                  className="small-btn view-count-btn"
                >
                  View vote Count
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });

    return (
      <>
        <Navbar
          style={{ backgroundColor: "#0089d6" }}
          bg="#0089d6"
          expand="lg"
          variant="light"
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
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
              <Nav.Link className="px-4 nav-items" onClick={this.handleLogout}>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container
          fluid
          className="admin-panel-container vh-100 d-flex flex-column"
        >
          <Row className="flex-grow-1">
            <Col className="justify-content-center align-items-center">
              <img src={mainimg} className="main-img" alt="main-img" />
            </Col>
            <Col className="text-container justify-content-center align-items-center left-text">
              <h1 className="admin-panel-text-left">
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
              <h5 className="admin-panel-text-right-p">
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
                className="admin-panel-button"
                href="/create-election"
              >
                New Election
              </Button>
            </Col>
          </Row>
        </Container>
        <Container>
          <div className="admin-panel-container-2">{electionList}</div>
        </Container>
      </>
    );
  }
}

export default withCookies(AdminPanel);
