import React, { Component } from "react";
import Web3 from "web3";
import Election from "../../build/Election.json";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NewCandidate.css";
import img1 from "../../assets/5.svg";

class NewCandidate extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    console.log("Check");
    await this.loadBlockChain();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  async loadBlockChain() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    console.log(accounts);
    const networkId = await web3.eth.net.getId();
    const networkData = Election.networks[networkId];
    if (networkData) {
      const election = new web3.eth.Contract(Election.abi, networkData.address);
      this.setState({ election });
    } else {
      window.alert("Election contract not deployed to detected network.");
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.addCandidates();
  };

  addCandidates() {
    console.log(this.state);
    this.setState({ loading: true });
    this.state.election.methods
      .addCandidate(
        this.state.candidate_name,
        this.state.candidate_details,
        this.state.id
      )
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        console.log(receipt);
        this.setState({ loading: false });
        window.location.assign("/adminPanel");
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      election: null,
      candidate_name: null,
      candidate_details: null,
      id: null,
    };
    this.addCandidates = this.addCandidates.bind(this);
  }

  componentDidMount() {
    //let id = this.props.match.params.id;
    const pathParts = window.location.pathname.split("/");
    let id = pathParts[pathParts.length - 1];
    this.setState({
      id: id,
    });
  }

  render() {
    //DESIGN CODE HERE:
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
        <Container fluid className="candidate-container">
          <Row>
            <Col className="img-container justify-content-center align-items-center">
              <img src={img1} className="candidate-img" alt="img-1" />
            </Col>
            <Col className="text-container justify-content-center align-items-center candidate-left">
              <h1 className="candidate-left-text">
                ADD <br /> CANDI
                <br />
                DATE
              </h1>
            </Col>
            <Col className="justify-content-center align-items-center candidate-right">
              <div className="container">
                <form onSubmit={this.handleSubmit}>
                  <label htmlFor="name" className="candidate-label">
                    Candidate Name
                  </label>
                  <br />
                  <input
                    type="text"
                    id="candidate_name"
                    name="candidate_name"
                    onChange={this.handleInputChange}
                    required
                    className="candidate-input"
                  />
                  <br />
                  <br />
                  <label htmlFor="name" className="candidate-label">
                    Candidate details
                  </label>
                  <br />
                  <input
                    type="text"
                    id="candidate_details"
                    name="candidate_details"
                    onChange={this.handleInputChange}
                    required
                    className="candidate-input"
                  />

                  <br></br>
                  <br></br>
                  <button
                    className="candidate-submit"
                    type="submit"
                    name="action"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default NewCandidate;
