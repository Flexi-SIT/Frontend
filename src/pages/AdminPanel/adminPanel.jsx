import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import votingimg from "../../assets/7.svg";
import election1 from "../../assets/9.jpg";
import Card from "react-bootstrap/Card";
import "swiper/css";
import NewElection from "./NewElection";
import "./AdminPanel.css";
import { useParams } from "react-router";
import NewCandidate from "./NewCandidate";
import VoteCount from "./VoteCount";
import axios from "axios";
import { Link } from "react-router-dom";

// const AdminPanel = () => {
//   const [showComponent, setShowComponent] = useState(false);

//   const handleClick = () => {
//     setShowComponent(true);
//   };

//   return (
//     <>
//       <Navbar className="color-nav" bg="invisible" expand="lg" variant="light ">
//         {/* <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand> */}
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
//           <Nav className="px-2 mr-auto">
//             <Nav.Link className="px-4 nav-items" href="/vote">
//               New Election
//             </Nav.Link>
//             <Nav.Link className="px-4 nav-items" href="/vote">
//               Current Elections
//             </Nav.Link>
//             <Nav.Link className="px-4 nav-items" href="/addPoll">
//               Add Poll
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//       <Container fluid className="container-1">
//         <Row>
//           <Col className="justify-content-center align-items-center">
//             <img src={votingimg} className="img1" alt="main-img" />
//           </Col>
//           <Col className="text-container justify-content-center align-items-center admin-left-text-1">
//             <h1 className="admin-text-1">ONGOING POLLS</h1>
//             <h5 className="admin-text-2">
//               Add a poll to conduct an election <br />
//               The voters can then vote
//             </h5>
//           </Col>
//           <Col></Col>
//         </Row>
//       </Container>
//       <Container fluid className="container-2 py-2">
//         <Row className="election-1">
//           <Col className="img-container justify-content-center align-items-center">
//             <Link to="/vote">
//               <img src={election1} className="election-img-1" alt="election" />
//             </Link>
//           </Col>
//           <Col className="text-container justify-content-center align-items-center">
//             <h1 className="election-text">SIT MONITOR ELECTION</h1>
//             <Col>
//               <button className="election-button">EDIT DETAILS</button>
//               <button onClick={handleClick} className="election-button">
//                 ADD CANDIDATE
//               </button>
//               {showComponent && <NewCandidate />}
//             </Col>
//             <Col>
//               <button className="election-button">ADD PHOTOS</button>
//               <button className="election-button">VIEW VOTE COUNT</button>
//             </Col>
//           </Col>
//         </Row>
//       </Container>
//       <Container>
//         <Row>
//           <Col>
//             <NewElection />
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

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
    const electionList = this.state.final.map((election) => {
      return (
        <div className="admin-panel-item" key={election.election_id}>
          <div className="contact">
            {/* <li className="collection-item avatar"> */}
            <h5 className="admin-panel-ballot">Ballot</h5>
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
                className="admin-panel-candidate-button"
              >
                Add candidate
              </button>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link
              to={"/voteCount/" + election.election_id}
              className="title"
              onClick={this.handleInputChange}
            >
              <button
                id={election.election_id}
                className="admin-panel-candidate-button"
              >
                View vote Count
              </button>
              <br />
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
              <Nav.Link className="px-4 nav-items" href="/create-election">
                New Election
              </Nav.Link>
              <Nav.Link className="px-4 nav-items" href="/adminPanel">
                Current Elections
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

export default AdminPanel;
