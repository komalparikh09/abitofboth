import React, { Component } from 'react';
import axios from 'axios';

import MemoryCards from '../../components/MemoryCards/MemoryCards';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class MemoryCardsPage extends Component {
  state = { isLoading: true, memories: [] };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('http://localhost:3100/searchmemories')
      .then(memoriesResponse => {
        this.setState({ isLoading: false, memories: memoriesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, memories: [] });
        this.props.onError('Loading search results for memories failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading memories...</p></div>;

    if (!this.state.isLoading && this.state.memories.length > 0) {
      content = (
        <MemoryCards
          memories={this.state.memories}
          // onDeleteMemory={this.memoryDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.memories.length === 0) {
      content = <p>Found no memories. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default MemoryCardsPage;