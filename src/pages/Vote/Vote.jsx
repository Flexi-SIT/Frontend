import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import Web3 from "web3";
import Election from "../../build/Election.json";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import img1 from "../../assets/9.jpg";
import img2 from "../../assets/10.jpg";
import img3 from "../../assets/11.jpg";
import "./Vote.css";
import NewElection from "../AdminPanel/NewElection";

class Vote extends Component {
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

  // componentDidMount() {
  //   let id = this.props.match.params.id;
  //   this.setState({
  //     id: id,
  //   })
  // }

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
  }
  render() {
    const electionList = this.state.candidates.map((candidates) => {
      return (
        <div className="contact" key={candidates.id}>
          <li className="collection-item avatar">
            <i className="material-icons circle blue darken-2">ballot</i>
            <p>
              <b>{candidates.name}</b>
            </p>
            <p>{candidates.details}</p>
            <a href="" className="secondary-content">
              <button
                id={candidates.id}
                onClick={this.handleInputChange}
                className="waves-effect waves-light btn blue darken-2"
              >
                Vote
              </button>
            </a>
          </li>
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
              <Nav.Link className="px-4 nav-items" href="/vote">
                Elections
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {/* Design Code Start*/}
        <Container fluid>
          <Row>
            <Col className="container-1 my-3">
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                grabCursor={true}
                centeredSlides={true}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="slider-slider"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  375: {
                    width: 375,
                    slidesPerView: 1,
                    spaceBetween: 100,
                  },
                  425: {
                    slidesPerView: 1,
                    spaceBetween: 405,
                  },
                  768: {
                    width: 768,
                    slidesPerView: 2,
                    spaceBetween: 230,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 490,
                  },
                  1440: {
                    slidesPerView: 3,
                    spaceBetween: 100,
                  },
                  2560: {
                    slidesPerView: 5,
                    spaceBetween: 200,
                  },
                }}
              >
                <SwiperSlide className="swiper-slide">
                  <img src={img1} className="vote-election-img" alt="vote" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img2} className="vote-election-img" alt="vote" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img3} className="vote-election-img" alt="vote" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img2} className="vote-election-img" alt="vote" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img1} className="vote-election-img" alt="vote" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img3} className="vote-election-img" alt="vote" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={img1} className="vote-election-img" alt="vote" />
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
        </Container>
        <Container fluid className="container-2">
          <p className="container-2-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Container>
        <Container fluid className="container-3">
          <Row>
            <Col className="justify-content-center align-items-center">
              <h1 className="container-3-text">VOTE HERE</h1>
            </Col>
            <Row>
              <Col className="justify-content-center align-items-center">
                <h1 className="container-3-text">CREATE NEW ELECTION</h1>
                <NewElection />
              </Col>
            </Row>
          </Row>
        </Container>
        {/* Design Code End */}
        <div className="container">
          <ul className="collection">
            <li className="collection-item avatar">
              <h3>Candidates</h3>
            </li>
            {electionList}
          </ul>
        </div>
      </>
    );
  }
}

export default Vote;
