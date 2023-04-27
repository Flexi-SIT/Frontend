import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { gapi } from "gapi-script";
import img1 from "../../assets/7.svg";
import "./AdminLogin.css";

//For OAuth, future scope
const clientID =
  "630166332593-b2k4a2l3lq0rr8d1ko70g12qdnjb5i5a.apps.googleusercontent.com";

function LoginSection() {
  const [cookies, setCookie] = useCookies(["adminLoggedIn"]);
  console.log(cookies.adminLoggedIn);

  const handleFormSubmit = async (event) => {
    //To define custom behavior
    event.preventDefault();

    const emailInput = event.target.email.value;
    const passwordInput = event.target.pass.value;

    //Sending post HTTP request and fetching data asynchronously
    const response = await fetch("http://localhost:3001/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setCookie("adminLoggedIn", true);
      window.location.href = "http://localhost:3000/adminPanel";
    } else {
      alert(data.message);
    }
  };

  //Initializing GAPI after component has rendered
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientID: clientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <Container>
      <Row className="adminn-container">
        <Col className="img-container justify-content-center-align-items-center">
          <img src={img1} className="adminn-container-image" alt="img-1" />
        </Col>
        <Col className="text-container justify-content-center adminn-container-right">
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
            <input type="submit" className="adminn-container-submit" />
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginSection;
