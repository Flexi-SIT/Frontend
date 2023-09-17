import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import "swiper/css";
import Web3 from "web3";
import Election from "../../build/Election.json";

import "./Vote.css";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js"; // Import the face-api.js package

import BarcodeScanApp from "../../components/barcodeScan/BarcodeScanApp";
import BarcodeScan from "../../components/barcodeScan/BarcodeScan";

class Vote extends Component {
  //1
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
      registeredImage: new Image(),
      imageSrc: null,
      isReadyForPicture: false,
    };
    this.handleReadyForPicture = this.handleReadyForPicture.bind(this);
  }

  //2
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  //3
  async loadWeb3() {
    //loads web3 library
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable(); //enables user's eth acc for use within the application
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  //4
  async loadBlockchainData() {
    const web3 = window.web3; //loads web3 instance
    const accounts = await web3.eth.getAccounts(); //gets current user's account
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId(); //gets networkID
    const networkData = Election.networks[networkId];
    if (networkData) {
      const election = new web3.eth.Contract(Election.abi, networkData.address); //fetches deployed contract
      this.setState({ election }); // setState updates the state that is initialized in the constructor
      const candCount = await election.methods.candidatesCount().call();
      this.setState({ candCount });
      for (var i = 1; i <= candCount; i++) {
        // retrieves no. of candidates
        const candidates = await election.methods.candidates(i).call();
        if (candidates.election_id === this.state.id) {
          this.setState({
            candidates: [...this.state.candidates, candidates], // adds candidates to components state
          });
        }
      }
    } else {
      window.alert("Election contract not deployed to detected network.");
    }
  }

  //5
  handleInputChange = (e) => {
    //sets selected CandidateID in the components state and calls vote method
    this.setState({
      selectedId: e.target.id,
    });
    this.vote(e.target.id);
  };

  //6
  vote(id) {
    //sends a vote transaction to the Election contract with the selected candidate's ID and user's account
    this.setState({ loading: true });
    this.state.election.methods
      .vote(id)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
        window.location.assign("/voting");
      });
  }

  //7
  async componentDidMount() {
    //retrives ID of election from URL and sets it in components state
    const pathParts = window.location.pathname.split("/");
    let id = pathParts[pathParts.length - 1];
    this.setState({
      id: id,
    });

    //NEW CODE to get user images

    var image = new Image();

    axios
      .get("http://localhost:3001/api/getImages", {
        params: {
          email: "vardhjainrox@gmail.com",
        },
      })
      .then(function (response) {
        image.src = response.data.idFrontImage;
      })
      .catch(function (err) {
        console.error(err);
      });

    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

    this.registeredImage.src = image.src;
  }

  compareImages = async () => {
    if (this.state.imageSrc) {
      if (this.state.imageSrc && this.state.registeredImage) {
        // Convert base64 image data to Blob
        const webcamImageBlob = this.dataURItoBlob(this.state.imageSrc);
        const referenceImageBlob = this.dataURItoBlob(
          "data:image/jpeg;base64," + this.state.registeredImage
        );

        // Fetch images from Blobs
        const webcamFace = await faceapi.bufferToImage(webcamImageBlob);
        const referenceFace = await faceapi.bufferToImage(referenceImageBlob);

        // ... continue with face detection and comparison ...
        if (webcamFace && referenceFace) {
          // Calculate face descriptors
          const webcamDescriptor = await faceapi.computeFaceDescriptor(
            webcamFace
          );
          const referenceDescriptor = await faceapi.computeFaceDescriptor(
            referenceFace
          );

          // Calculate the Euclidean distance between the descriptors
          const distance = faceapi.euclideanDistance(
            webcamDescriptor,
            referenceDescriptor
          );

          console.log(`Distance: ${distance}`);
        } else {
          console.log("No face detected in one of the images.");
        }
      }

      // const webcamImage = await faceapi.fetchImage(this.state.imageSrc);
      // const referenceImage = await faceapi.fetchImage(this.state.registeredImage);

      // // Detect faces and landmarks
      // const webcamFace = await faceapi.detectSingleFace(webcamImage).withFaceLandmarks();
      // const referenceFace = await faceapi.detectSingleFace(referenceImage).withFaceLandmarks();
    }
  };

  dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  handleReadyForPicture = () => {
    this.setState({ isReadyForPicture: true }); // Set user's readiness to true
    console.log(this.state.isReadyForPicture);
  };

  handleLogout() {
    localStorage.setItem("voter", false);
    window.location.href = "http://localhost:3000/voter";
  }

  render() {
    const videoConstraints = {
      width: 200,
      height: 120,
      facingMode: "user",
    };
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
    const webcamComponent = this.state.isReadyForPicture ? (
      <Webcam
        audio={false}
        height={120}
        screenshotFormat="image/jpeg"
        width={120}
        videoConstraints={videoConstraints}
      >
        {({ getScreenshot }) => (
          <button
            onClick={() => {
              const capturedImageSrc = getScreenshot();
              this.setState({ imageSrc: capturedImageSrc });
            }}
          >
            Capture photo
          </button>
        )}
      </Webcam>
    ) : (
      <button onClick={this.handleReadyForPicture}>
        Ready to Take Picture
      </button>
    );

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
              <Nav.Link className="px-4 nav-items" href="/voting">
                Elections
              </Nav.Link>
              <Nav.Link className="px-4 nav-items" onClick={this.handleLogout}>
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* {webcamComponent} */}

        {this.state.imageSrc && (
          <img src={this.state.imageSrc} alt="Captured" />
        )}

        {/* <button onClick={this.compareImages}>Compare Images</button> */}

        <BarcodeScanApp />
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

export default Vote;
