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
      election_timer: 0,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleTimerChange = (e) => {
    this.setState({
      election_timer: parseInt(e.target.value, 10),
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      election_name,
      election_organizer,
      election_password,
      election_timer,
    } = this.state;
    console.log(election_name);
    axios
      .post("http://localhost:3001/api/electionName", {
        election_name: election_name,
        election_organizer: election_organizer,
        election_password: election_password,
        election_timer: election_timer,
      })
      .then(function (response) {
        console.log("success");
      })
      .catch(function (err) {
        console.error(err);
      });
    window.location.href = "http://localhost:3000/adminPanel";
  };

  render() {
    return (
      <div className="container">
        <div
          className="px-4 py-5 px-md-5 my-5 text-center text-lg-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                Unlock Your Vote: <br />
                <span className="text-primary">Create Election Magic.</span>
              </h1>
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                "Empowering Citizens: Your Voice, Your Vote. Embrace your civic
                responsibility with our cutting-edge voting platform. Take part
                in shaping the future of your community through active
                participation in elections!"
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
                            id="election_name"
                            name="election_name"
                            onChange={this.handleInputChange}
                            required
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="election_name">
                            Election Name
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="election_organizer"
                            name="election_organizer"
                            onChange={this.handleInputChange}
                            required
                            className="form-control"
                          />
                          <label
                            className="form-label"
                            htmlFor="election_organizer"
                          >
                            Election Organizer
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="election_password"
                        name="election_password"
                        onChange={this.handleInputChange}
                        required
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="election_password">
                        Election Password
                      </label>
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="election_timer"
                        name="election_timer"
                        onChange={this.handleTimerChange}
                        min="1"
                        max="2880"
                        required
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="election_timer">
                        Timer (minutes) :{" "}
                      </label>
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
    );
  }
}

export default NewElection;
