import React, { Component } from 'react';
import axios from 'axios';

import Games from '../../components/Games/Games';
import { config } from 'process';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class GamesPage extends Component {
  state = { isLoading: true, games: [] };
  componentDidMount() {
    this.fetchData();
  }

  gameDeleteHandler = gameId => {
    axios
      .delete('http://localhost:3100/games/' + gameId)
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the game account failed. Please try again later'
        );
        console.log(err);
      });
  };

  fetchData = () => {
    axios
      .get('http://localhost:3100/games')
      .then(gamesResponse => {
        this.setState({ isLoading: false, games: gamesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, games: [] });
        this.props.onError('Loading game accounts failed. Please try again later');
        console.log(err);
      });
  };

  searchGameHandler = () => {
    axios
      .get('http://localhost:3100/searchgames')
      .then(gamesResponse => {
        this.setState({ isLoading: false, games: gamesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, games: [] });
        this.props.onError('Search failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading games...</p></div>;

    if (!this.state.isLoading && this.state.games.length > 0) {
      content = (
        <Games
          games={this.state.games}
          onDeleteGame={this.gameDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.games.length === 0) {
      content = <p>Found no games. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default GamesPage;