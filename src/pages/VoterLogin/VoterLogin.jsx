import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import img1 from "../../assets/7.svg";
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

  //cookie:
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const emailInput = event.target.email.value;
    const passwordInput = event.target.pass.value;
    const idFrontImage = event.target.idFrontImage.files[0];
    const idBackImage = event.target.idBackImage.files[0];

    const formData = new FormData();
    formData.append("email", emailInput);
    formData.append("password", passwordInput);
    formData.append("idFrontImage", idFrontImage);
    formData.append("idBackImage", idBackImage);

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
    <Container>
      <Row className="adminn-container">
        <Col className="img-container justify-content-center-align-items-center">
          <img src={img1} className="adminn-container-image" alt="img-1" />
        </Col>
        <Col className="text-container justify-content-center adminn-container-right">
          {/* <form method="POST" action="http://localhost:3001/voter"> */}
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name" className="adminn-container-label">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              className="adminn-container-input"
              required
            ></input>
            <br />
            <br />
            <label htmlFor="name" className="adminn-container-label">
              Password
            </label>
            <br />
            <input
              type="password"
              name="pass"
              className="adminn-container-input"
              required
            ></input>
            <br />
            <br />
            <label htmlFor="idFrontImage" className="adminn-container-label">
              Attach ID Front Image
            </label>
            <br />
            <input type="file" name="idFrontImage" accept="image/*" required />
            <br />
            <br />
            <label htmlFor="idBackImage" className="adminn-container-label">
              Attach ID Back Image
            </label>
            <input type="file" name="idBackImage" accept="image/*" required />
            <br />
            <br />
            <input type="submit" className="adminn-container-submit" />
          </form>
        </Col>
        {/* <Col className="text-container justify-content-center align-items-center admin-container-left">
          <h1 className="admin-container-left-text">
            ADMIN
            <br />
            LOGIN
          </h1>
        </Col> */}
      </Row>
    </Container>
  );
}

export default LoginSection;
