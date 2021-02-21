import React, { Component } from 'react';
import axios from 'axios';

import './MemoryCard.css';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class MemoryCardPage extends Component {
  state = { isLoading: true, memory: null };

  componentDidMount() {
    axios
      .get('http://localhost:3100/searchmemories/' + this.props.match.params.id)
      .then(memoryResponse => {
        this.setState({ isLoading: false, memory: memoryResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError('Loading the memory details failed. Please try again later');
      });
  }

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Is loading...</p></div>;

    if (!this.state.isLoading && this.state.memory) {
      content = (
        <main className="main-page">
          <h1>Name: {this.state.memory.name}</h1>
          <h2>Phone Number: {this.state.memory.phoneNumber}</h2>
          <h2>Specialization: {this.state.memory.specialization}</h2>
          <p>Total Experience: {this.state.memory.totalExperience}</p>
          <p>Working Days: {this.state.memory.workingDays}</p>
          <p>Visiting Hours From: {this.state.memory.visitingHoursFrom}</p>
          <p>Visiting Hours To: {this.state.memory.visitingHoursTo}</p>
          {/* <div
            className="main-page-image"
            style={{
              backgroundImage: "url('" + this.state.memory.image + "')"
            }}
          /> }
          {/* <p>{this.state.memory.description}</p> */}
        </main>
      );
    }
    if (!this.state.isLoading && !this.state.memory) {
      content = (
        <main>
          <p>Found no memory. Try again later.</p>
        </main>
      );
    }
    return content;
  }
}

export default MemoryCardPage;