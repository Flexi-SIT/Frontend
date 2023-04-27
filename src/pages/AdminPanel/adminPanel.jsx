import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "swiper/css";
import "./AdminPanel.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { withCookies } from 'react-cookie';

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
    cookies.set('adminLoggedIn', false);
    localStorage.setItem('admin', false)
    window.location.href = 'http://localhost:3000/admin';
  }
  componentDidMount() {
    let currentComponent = this;
    axios
      .get("http://localhost:3001/api/electionName", {})
      .then(function (response) {
        var data = response.data;
        currentComponent.setState({
          // election_name: data[0],
          // election_organizer: data[1],
          // election_id: data[2],
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
    console.log(cookies.get('adminLoggedIn'));
    if (cookies.get('adminLoggedIn') == 'false') {
      console.log("sauoyduasydiu")
      return (
        <>
          <h1>You have not logged in</h1>
        </>
      )
    }

    //if admin is logged in carry all of this out
    const electionList = this.state.final.map((election) => {
      return (
        <div className="election-list" key={election.election_id}>
          <div className="election-box">
            {/* <li className="collection-item avatar"> */}
            <p>
              <b>{election.election_name}</b>
            </p>
            <br></br>
            <Link
              to={"/candidates/" + election.election_id}
              className="title"
              onClick={this.handleInputChange}
            >
              <button
                id={election.election_id}
                className="add-candidate-btn"
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
                className="view-count-btn"
              >
                View vote Count
              </button>
              <br />
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
        <div className="admin-panel-container">
          {/* <h1 className="admin-container-text">Election</h1> */}
          {electionList}
          {/* <ul className="collection">
            <li className="collection-item avatar">
              <h3>Elections</h3>
            </li>
          </ul> */}
        </div>
      </>
    );
  }
}

export default withCookies(AdminPanel);
