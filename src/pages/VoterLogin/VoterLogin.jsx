import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import img1 from "../../assets/12.jpg";
import "./VoterLogin.css";
import { useCookies } from "react-cookie";

import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Axios from "axios";

const clientID =
  "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com";

function LoginSection() {
  const [cookies, setCookie] = useCookies(["voterLoggedIn"]);
  console.log(cookies.voterLoggedIn);

  const navigate = useNavigate();

  // const handleFile1Upload = async (e) => {
  //   const file = e.target.files[0];
  //   base64_front = await convertToBase64(file);
  //   console.log(base64)
  // }

  //cookie:
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const emailInput = event.target.email.value;
    const passwordInput = event.target.pass.value;
    // const prnInput = event.target.prn.value;
    const idFrontImage = event.target.idFrontImage.files[0];
    const base64_front = await convertToBase64(idFrontImage);

    const idBackImage = event.target.idBackImage.files[0];
    const base64_back = await convertToBase64(idBackImage);

    const formData = new FormData();
    formData.append("email", emailInput);
    formData.append("pass", passwordInput);
    // formData.append("prn", prnInput);
    formData.append("front", base64_front);
    formData.append("back", base64_back);

    //Cookies

    try {
      const response = await fetch("http://localhost:3001/voter", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setCookie("voterLoggedIn", true);
        navigate("/voting");
      } else {
        const data = await response.json();
        alert(data.message);
      }
      localStorage.setItem("voter", "true");
    } catch (error) {
      console.error("Error submitting form", error);
    }

    // const response = await fetch("http://localhost:3001/voter", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: emailInput,
    //     password: passwordInput,
    //   }),
    // });
    // const data = await response.json();
    // console.log(data);
    // if (response.ok) {
    //   setCookie("voterLoggedIn", true);
    //   // Redirect to admin panel
    //   window.location.href = "http://localhost:3000/voting";
    // } else {
    //   // Display error message
    //   alert(data.message);
    // }

    // //setting admin logged in state to true
    // localStorage.setItem("voter", "true");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientID: clientID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  //Axios.post("http://localhost:3002/voterdata", { email: email, password: pass });

  return (
    // <Container>
    //   <Row className="adminn-container">
    //     <Col className="img-container justify-content-center-align-items-center">
    //       <img src={img1} className="adminn-container-image" alt="img-1" />
    //     </Col>
    //     <Col className="text-container justify-content-center adminn-container-right">
    //       {/* <form method="POST" action="http://localhost:3001/voter"> */}
    //       <form onSubmit={handleFormSubmit}>
    //         <label htmlFor="name" className="adminn-container-label">
    //           Email
    //         </label>
    //         <br />
    //         <input
    //           type="email"
    //           name="email"
    //           className="adminn-container-input"
    //           required
    //         ></input>
    //         <br />
    //         <br />
    //         <label htmlFor="name" className="adminn-container-label">
    //           Password
    //         </label>
    //         <br />
    //         <input
    //           type="password"
    //           name="pass"
    //           className="adminn-container-input"
    //           required
    //         ></input>
    //         <br />
    //         <br />
    //         <label htmlFor="idFrontImage" className="adminn-container-label">
    //           Attach ID Front Image
    //         </label>
    //         <br />
    //         <input type="file" name="idFrontImage" accept="image/*" required />
    //         <br />
    //         <br />
    //         <label htmlFor="idBackImage" className="adminn-container-label">
    //           Attach ID Back Image
    //         </label>
    //         <input type="file" name="idBackImage" accept="image/*" required />
    //         <br />
    //         <br />
    //         <input type="submit" className="adminn-container-submit" />
    //       </form>
    //     </Col>
    //     {/* <Col className="text-container justify-content-center align-items-center admin-container-left">
    //       <h1 className="admin-container-left-text">
    //         ADMIN
    //         <br />
    //         LOGIN
    //       </h1>
    //     </Col> */}
    //   </Row>
    // </Container>

    <Container
      className="text-center text-lg-start main-container"
      style={{ height: "100vh" }}
    >
      <Container fluid>
        <Row className="g-0 align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div
              className="card cascading-right"
              style={{
                background: "hsla(0, 0%, 100%, 0.55)",
                backdropFilter: "blur(30px)",
                height: "100%",
              }}
            >
              <div className="card-body p-5 shadow-5 text-center">
                <h2 className="fw-bold mb-5">Voter Login</h2>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="pass">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </Form.Group>

                  {/* <Form.Group controlId="prn">
                    <Form.Label>PRN</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your PRN"
                      required
                    />
                  </Form.Group> */}

                  <Form.Group controlId="idFrontImage">
                    <Form.Label>Attach ID Front Image</Form.Label>
                    <Form.Control type="file" accept="image/*" required />
                  </Form.Group>

                  <Form.Group controlId="idBackImage">
                    <Form.Label>Attach ID Back Image</Form.Label>
                    <Form.Control type="file" accept="image/*" required />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                  >
                    Sign up
                  </Button>
                </Form>
              </div>
            </div>
          </Col>

          <Col lg={6} className="mb-5 mb-lg-0">
            <img src={img1} className="img1-w-100 rounded-4 shadow-4" alt="" />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default LoginSection;

//Converting file to base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
