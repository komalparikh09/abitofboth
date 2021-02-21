import React, { Component } from 'react';
import axios from 'axios';

import InitiativeCards from '../../components/InitiativeCards/InitiativeCards';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class InitiativeCardsPage extends Component {
  state = { isLoading: true, initiatives: [] };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('http://localhost:3100/searchinitiatives')
      .then(initiativesResponse => {
        this.setState({ isLoading: false, initiatives: initiativesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, initiatives: [] });
        this.props.onError('Loading search results for initiatives failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading initiatives...</p></div>;

    if (!this.state.isLoading && this.state.initiatives.length > 0) {
      content = (
        <InitiativeCards
          initiatives={this.state.initiatives}
          // onDeleteInitiative={this.initiativeDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.initiatives.length === 0) {
      content = <p>Found no initiatives. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default InitiativeCardsPage;