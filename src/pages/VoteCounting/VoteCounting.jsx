import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import votecountingimg from "../../assets/5.svg";
import Web3 from "web3";
import Election from "../../build/Election.json";
import "./VoteCounting.css";
import { useCookies } from "react-cookie";
import { withCookies } from "react-cookie";
import mainimg from "../../assets/1.svg";
import "./VoteCounting.css";

class VoteCounting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      account: "",
      election: null,
      candCount: 0,
      candidates: [],
      loading: true,
      selectedId: null,
    };
    this.handleLogout = this.handleLogout.bind(this); // bind the method to the component's context
  }

  handleLogout() {
    const { cookies } = this.props;
    cookies.set("adminLoggedIn", false);
    localStorage.setItem("admin", false);
    window.location.href = "http://localhost:3000/admin";
  }
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
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

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Election.networks[networkId];
    if (networkData) {
      const election = new web3.eth.Contract(Election.abi, networkData.address);
      this.setState({ election });
      const candCount = await election.methods.candidatesCount().call();
      this.setState({ candCount });
      for (var i = 1; i <= candCount; i++) {
        const candidates = await election.methods.candidates(i).call();
        if (candidates.election_id === this.state.id) {
          this.setState({
            candidates: [...this.state.candidates, candidates],
          });
        }
      }
      console.log(this.state.candidates);
    } else {
      window.alert("Election contract not deployed to detected network.");
    }
  }

  handleInputChange = (e) => {
    console.log(e.target.id);
    this.setState({
      selectedId: e.target.id,
    });
    this.vote(e.target.id);
  };

  vote(id) {
    console.log(this.state.selectedId);
    this.setState({ loading: true });
    this.state.election.methods
      .vote(id)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
        window.location.assign("/");
      });
  }

  componentDidMount() {
    // let id = this.props.match.params.id;
    // this.setState({
    //     id: id,
    // })
    const pathParts = window.location.pathname.split("/");
    let id = pathParts[pathParts.length - 1];
    this.setState({
      id: id,
    });
  }

  render() {
    const { cookies } = this.props;
    console.log(cookies.get("adminLoggedIn"));
    if (cookies.get("adminLoggedIn") == "false") {
      console.log("sauoyduasydiu");
      return (
        <>
          <h1>You have not logged in</h1>
        </>
      );
    }
    const electionList = this.state.candidates.map((candidates) => {
      return (
        // <div className="contact" key={candidates.id}>
        //   <li className="collection-item avatar">
        //     <i className="material-icons circle blue darken-2">Candidate Name:<p><b>{candidates.name}</b></p></i>

        //     <p>Details: {candidates.details}
        //       <br></br><b>Votes: {candidates.voteCount}</b></p>

        //   </li>
        // </div>
        <div className="col-md-4" key={candidates.id}>
          <div className="candidate-box">
            <h5 className="candidate-name">Candidate Name:</h5>
            <h3 className="candidate-details">
              <b>{candidates.name}</b>
            </h3>
            <h5 className="candidate-details">Details:</h5>
            <h3 className="candidate-details">{candidates.details}</h3>
            <h5 className="candidate-votes">Votes:</h5>
            <p className="candidate-votes">
              <b>{candidates.voteCount}</b>
            </p>
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
              <h5 className="admin-panel-text-right-p">
                <span>"Your Voice, Your Vote!"</span>
                <br />
                Make it count with our secure
                <br />
                e-voting platform.
              </h5>
            </Col>
          </Row>
        </Container>
        <div>
          <h2 className="title">CANDIDATES:</h2>
          <div className="candidates-container">{electionList}</div>
        </div>
      </>
    );
  }
}

export default withCookies(VoteCounting);
