import React, { Component } from 'react';
import axios from 'axios';

import './GameCard.css';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class GameCardPage extends Component {
  state = { isLoading: true, game: null };

  componentDidMount() {
    axios
      .get('http://localhost:3100/searchgames/' + this.props.match.params.id)
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
          <h1>Name: {this.state.game.name}</h1>
          <h2>Phone Number: {this.state.game.phoneNumber}</h2>
          <h2>Specialization: {this.state.game.specialization}</h2>
          <p>Total Experience: {this.state.game.totalExperience}</p>
          <p>Working Days: {this.state.game.workingDays}</p>
          <p>Visiting Hours From: {this.state.game.visitingHoursFrom}</p>
          <p>Visiting Hours To: {this.state.game.visitingHoursTo}</p>
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

export default GameCardPage;