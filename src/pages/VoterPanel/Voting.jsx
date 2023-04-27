import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "swiper/css";
import "./Voting.css";
import axios from "axios";
import { Link } from "react-router-dom";

class Voting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election_name: [],
      election_organizer: [],
      election_id: [],
      final: [],
      id: null,
    };
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
    // console.log(e.target.innerHTML);
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

  handleLogout() {
    localStorage.setItem('voter', false)
    window.location.href = 'http://localhost:3000/voter';
  }

  render() {
    const electionList = this.state.final.map((election) => {
      return (
        <div className="election-item" key={election.election_id}>
          <div className="voting-contact">
            {/* <li className="collection-item avatar"> */}
            <Link
              to={"/vote/" + election.election_id}
              className="voting-title"
              onClick={this.handleInputChange}
            >
              {election.election_name}
            </Link>
            {/* </li> */}
          </div>
        </div>
      );
    });
    return (
      <>
        <Navbar
          className="color-nav"
          bg="invisible"
          expand="lg"
          variant="light "
        >
          {/* <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="px-2 mr-auto">
              <Nav.Link className="px-4 nav-items" href="/voting">
                Elections
              </Nav.Link>
              <Nav.Link className="px-4 nav-items" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="px-4 nav-items" onClick={this.handleLogout}>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <h1 class="title">Elections:</h1>
        <div className="election-list">

          {/* <ul className="collection">
            <li className="collection-item avatar">
              <h3>Elections</h3>
            </li>
          </ul> */}
          {electionList}
        </div>
      </>
    );
  }
}

export default Voting;
