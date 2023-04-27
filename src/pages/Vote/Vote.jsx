import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "swiper/css";
import Web3 from "web3";
import Election from "../../build/Election.json";
import { withCookies } from 'react-cookie';
import "./Vote.css";

class Vote extends Component {
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
    cookies.set('voterLoggedIn', false);
    localStorage.setItem('voter', false)
    window.location.href = 'http://localhost:3000/voter';
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
        window.location.assign("/voting");
      });
  }

  componentDidMount() {
    const pathParts = window.location.pathname.split("/");
    let id = pathParts[pathParts.length - 1];
    this.setState({
      id: id,
    });
  }


  render() {
    //If admin is not logged in display:
    const { cookies } = this.props;
    console.log(cookies.get('voterLoggedIn'));
    if (cookies.get('voterLoggedIn') == 'false') {
      return (
        <>
          <h1>You have not logged in</h1>
        </>
      )
    }
    const electionList = this.state.candidates.map((candidates) => {
      return (
        <div className="vote-item" key={candidates.id}>
          <div className="contact">
            <li className="collection-item avatar">
              <h5 className="vote-ballot">Ballot</h5>
              <p>
                <b>{candidates.name}</b>
              </p>
              <p>{candidates.details}</p>
              <a href="" className="secondary-content">
                <button
                  id={candidates.id}
                  onClick={this.handleInputChange}
                  className="vote-button"
                >
                  Vote
                </button>
              </a>
            </li>
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
              <Nav.Link className="px-4 nav-items" onClick={this.handleLogout}>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="vote-list">
          <ul className="collection">
            <h3>Candidates</h3>
            {electionList}
          </ul>
        </div>
      </>
    );
  }
}

export default withCookies(Vote);
