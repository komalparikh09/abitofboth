import React, { Component } from 'react';
import axios from 'axios';

import Initiatives from '../../components/Initiatives/Initiatives';
import { config } from 'process';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class InitiativesPage extends Component {
  state = { isLoading: true, initiatives: [] };
  componentDidMount() {
    this.fetchData();
  }

  initiativeDeleteHandler = initiativeId => {
    axios
      .delete('http://localhost:3100/initiatives/' + initiativeId)
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the initiative account failed. Please try again later'
        );
        console.log(err);
      });
  };

  fetchData = () => {
    axios
      .get('http://localhost:3100/initiatives')
      .then(initiativesResponse => {
        this.setState({ isLoading: false, initiatives: initiativesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, initiatives: [] });
        this.props.onError('Loading initiative accounts failed. Please try again later');
        console.log(err);
      });
  };

  searchInitiativeHandler = () => {
    axios
      .get('http://localhost:3100/searchinitiatives')
      .then(initiativesResponse => {
        this.setState({ isLoading: false, initiatives: initiativesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, initiatives: [] });
        this.props.onError('Search failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading initiatives...</p></div>;

    if (!this.state.isLoading && this.state.initiatives.length > 0) {
      content = (
        <Initiatives
          initiatives={this.state.initiatives}
          onDeleteInitiative={this.initiativeDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.initiatives.length === 0) {
      content = <p>Found no initiatives. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default InitiativesPage;