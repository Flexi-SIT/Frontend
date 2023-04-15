import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import votingimg from "../../assets/7.svg";
import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "./Voting.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    axios.get('http://localhost:3001/api/electionName', {})
      .then(function (response) {
        var data = response.data;
        currentComponent.setState({
          final: data
        })
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
      id: id
    })
  };
  render() {
    const electionList = this.state.final.map(election => {
      return (
        <div className="contact" key={election.election_id}>
          <li className="collection-item avatar">
            <i className="material-icons circle blue darken-2">ballot</i>
            <Link to={"/vote/" + election.election_id} className="title" onClick={this.handleInputChange}>{election.election_name}</Link>
          </li>
        </div>
      )
    })
    return (
      <>
        <Navbar className="color-nav" bg="invisible" expand="lg" variant="light ">
          {/* <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav className="px-2 mr-auto">
              <Nav.Link className="px-4 nav-items" href="/vote">
                Elections
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <ul className="collection">
            <li className="collection-item avatar">
              <h3>Elections</h3>
            </li>
            {electionList}
          </ul>
        </div>
      </>
    )
  }


};

export default Voting;
