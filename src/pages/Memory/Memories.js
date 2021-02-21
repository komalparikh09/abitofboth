import React, { Component } from 'react';
import axios from 'axios';

import Memories from '../../components/Memories/Memories';
import { config } from 'process';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class MemoriesPage extends Component {
  state = { isLoading: true, memories: [] };
  componentDidMount() {
    this.fetchData();
  }

  memoryDeleteHandler = memoryId => {
    axios
      .delete('http://localhost:3100/memories/' + memoryId)
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the memory account failed. Please try again later'
        );
        console.log(err);
      });
  };

  fetchData = () => {
    axios
      .get('http://localhost:3100/memories')
      .then(memoriesResponse => {
        this.setState({ isLoading: false, memories: memoriesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, memories: [] });
        this.props.onError('Loading memory accounts failed. Please try again later');
        console.log(err);
      });
  };

  searchMemoryHandler = () => {
    axios
      .get('http://localhost:3100/searchmemories')
      .then(memoriesResponse => {
        this.setState({ isLoading: false, memories: memoriesResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, memories: [] });
        this.props.onError('Search failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading memories...</p></div>;

    if (!this.state.isLoading && this.state.memories.length > 0) {
      content = (
        <Memories
          memories={this.state.memories}
          onDeleteMemory={this.memoryDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.memories.length === 0) {
      content = <p>Found no memories. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default MemoriesPage;