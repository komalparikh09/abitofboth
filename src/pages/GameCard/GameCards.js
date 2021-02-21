import React, { Component } from 'react';
import axios from 'axios';

import GameCards from '../../components/GameCards/GameCards';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class GameCardsPage extends Component {
  state = { isLoading: true, games: [] };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('http://localhost:3100/searchgames')
      .then(gamesResponse => {
        this.setState({ isLoading: false, games: gamesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, games: [] });
        this.props.onError('Loading search results for games failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading games...</p></div>;

    if (!this.state.isLoading && this.state.games.length > 0) {
      content = (
        <GameCards
          games={this.state.games}
          // onDeleteGame={this.gameDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.games.length === 0) {
      content = <p>Found no games. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default GameCardsPage;