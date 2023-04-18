import React, { Component } from "react";
import axios from "axios";
import "./NewElection.css";

class NewElection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      election_name: "",
      election_organizer: "",
      election_password: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { election_name, election_organizer, election_password } = this.state;
    console.log(election_name);
    axios
      .post("http://localhost:3001/api/electionName", {
        election_name: election_name,
        election_organizer: election_organizer,
        election_password: election_password,
      })
      .then(function (response) {
        console.log("success");
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  render() {
    return (
      <div className="container">
        {/* <h4>Create New Election</h4> */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name" className="election-container-text">
            Election Name
          </label>
          <br />
          <input
            type="text"
            id="election_name"
            name="election_name"
            onChange={this.handleInputChange}
            required
            className="election-container"
          />
          <br></br>
          <label htmlFor="name" className="election-container-text">
            Election Organizer
          </label>
          <br />
          <input
            type="text"
            id="election_organizer"
            name="election_organizer"
            onChange={this.handleInputChange}
            required
            className="election-container"
          />

          <br></br>
          <label htmlFor="name" className="election-container-text">
            Election Password
          </label>
          <br />
          <input
            type="password"
            id="election_password"
            name="election_password"
            onChange={this.handleInputChange}
            required
            className="election-container"
          />

          <br></br>
          <br></br>
          <button
            className="election-container-submit"
            type="submit"
            name="action"
          >
            Submit
            {/* <i className="material-icons right">send</i> */}
          </button>
        </form>
      </div>
    );
  }
}

export default NewElection;
