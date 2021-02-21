import React, { Component } from 'react';
import axios from 'axios';

import './Game.css';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class GamePage extends Component {
  state = { isLoading: true, game: null };

  componentDidMount() {
    axios
      .get('http://localhost:3100/games/' + this.props.match.params.id)
      .then(gameResponse => {
        this.setState({ isLoading: false, game: gameResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError('Loading the game details failed. Please try again later');
      });
  }

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Is loading...</p></div>;

    if (!this.state.isLoading && this.state.game) {
      content = (
        <main className="main-page">
          <br />
          <div className="div-card">
            <div className="div-card-name">
              <div className="div-card-text">
                <h3>Name: Dr. {this.state.game.name}</h3>
              </div>
            </div>
            <div className="div-card-text">
              <br />
              Phone Number : {this.state.game.phoneNumber}
              <br />
              <br />
              Specialization : {this.state.game.specialization}
              <br />
              <br />
              Total Experience : {this.state.game.totalExperience} years
              <br />
              <br />
              Address : HealthShades Clinic
              <br />
              <br />
              Working Days : {this.state.game.workingDays}
              <br />
              <br />
              Visiting Hours From : {this.state.game.visitingHoursFrom}
              <br />
              <br />
              Visiting Hours To : {this.state.game.visitingHoursTo}
              <br />
              <br />
            </div>
          </div>
          {/* <h1>Name: {this.state.game.name}</h1>
          <h2>Phone Number: {this.state.game.phoneNumber}</h2>
          <h2>Specialization: {this.state.game.specialization}</h2>
          <p>Total Experience: {this.state.game.totalExperience}</p>
          <p>Working Days: {this.state.game.workingDays}</p>
          <p>Visiting Hours From: {this.state.game.visitingHoursFrom}</p>
          <p>Visiting Hours To: {this.state.game.visitingHoursTo}</p> */}
          {/* <div
            className="main-page-image"
            style={{
              backgroundImage: "url('" + this.state.game.image + "')"
            }}
          /> }
          {/* <p>{this.state.game.description}</p> */}
        </main>
      );
    }
    if (!this.state.isLoading && !this.state.game) {
      content = (
        <main>
          <p>Found no game. Try again later.</p>
        </main>
      );
    }
    return content;
  }
}

export default GamePage;