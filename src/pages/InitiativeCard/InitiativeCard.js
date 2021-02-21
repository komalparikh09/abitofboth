import React, { Component } from 'react';
import axios from 'axios';

import './InitiativeCard.css';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class InitiativeCardPage extends Component {
  state = { isLoading: true, initiative: null };

  componentDidMount() {
    axios
      .get('http://localhost:3100/searchinitiatives/' + this.props.match.params.id)
      .then(initiativeResponse => {
        this.setState({ isLoading: false, initiative: initiativeResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError('Loading the initiative details failed. Please try again later');
      });
  }

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Is loading...</p></div>;

    if (!this.state.isLoading && this.state.initiative) {
      content = (
        <main className="main-page">
          <h1>Name: {this.state.initiative.name}</h1>
          <h2>Phone Number: {this.state.initiative.phoneNumber}</h2>
          <h2>Specialization: {this.state.initiative.specialization}</h2>
          <p>Total Experience: {this.state.initiative.totalExperience}</p>
          <p>Working Days: {this.state.initiative.workingDays}</p>
          <p>Visiting Hours From: {this.state.initiative.visitingHoursFrom}</p>
          <p>Visiting Hours To: {this.state.initiative.visitingHoursTo}</p>
          {/* <div
            className="main-page-image"
            style={{
              backgroundImage: "url('" + this.state.initiative.image + "')"
            }}
          /> }
          {/* <p>{this.state.initiative.description}</p> */}
        </main>
      );
    }
    if (!this.state.isLoading && !this.state.initiative) {
      content = (
        <main>
          <p>Found no initiative. Try again later.</p>
        </main>
      );
    }
    return content;
  }
}

export default InitiativeCardPage;