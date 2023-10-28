import React, { Component } from "react";
import Web3 from "web3";
import Election from "../../build/Election.json";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NewCandidate.css";
import img1 from "../../assets/5.svg";
import { useCookies } from "react-cookie";
import { withCookies } from "react-cookie";

class NewCandidate extends Component {
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

  componentDidMount() {
    //let id = this.props.match.params.id;
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
          <h1 className="new-candidate-logout">You have not logged in</h1>
        </>
      );
    }
    //DESIGN CODE HERE:
    return (
      <>
        <Navbar
          style={{ backgroundColor: "#0089d6" }}
          bg="#0089d6"
          expand="lg"
          variant="light"
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
        <Container fluid className="candidate-container">
          <div className="container">
            <div
              className="px-4 py-5 px-md-5 my-5 text-center text-lg-start"
              style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
            >
              <div className="row gx-lg-5 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <h1 className="my-5 display-3 fw-bold ls-tight new-candidate-h1">
                    Unleash Your Leadership: <br />
                    <span className="text-primary">
                      Join the Election Adventure.
                    </span>
                  </h1>
                  <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                    "Elevate Your Civic Engagement: Run for Office and Make a
                    Difference. Seize the opportunity to empower your community
                    through active participation in the election process. Join
                    us in shaping a brighter future!"
                  </p>
                </div>

                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="card">
                    <div className="card-body py-5 px-md-5">
                      <form onSubmit={this.handleSubmit}>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="candidate_name"
                                name="candidate_name"
                                onChange={this.handleInputChange}
                                required
                                className="form-control"
                              />
                              <label className="form-label" htmlFor="name">
                                Candidate Name
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <input
                                type="text"
                                id="candidate_details"
                                name="candidate_details"
                                onChange={this.handleInputChange}
                                required
                                className="form-control"
                              />
                              <label className="form-label" htmlFor="name">
                                Candidate Details
                              </label>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary btn-block mb-4"
                          type="submit"
                          name="action"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    );
  }
}

export default withCookies(NewCandidate);
