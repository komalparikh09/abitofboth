import React, { Component } from 'react';
import axios from 'axios';

import './EventCard.css';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class EventCardPage extends Component {
  state = { isLoading: true, event: null };

  componentDidMount() {
    axios
      .get('http://localhost:3100/searchevents/' + this.props.match.params.id)
      .then(eventResponse => {
        this.setState({ isLoading: false, event: eventResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
        this.props.onError('Loading the event details failed. Please try again later');
      });
  }

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Is loading...</p></div>;

    if (!this.state.isLoading && this.state.event) {
      content = (
        <main className="main-page">
          <h1>{this.state.event.eventName}</h1>
          <h2>{this.state.event.eventCreatedBy}</h2>
          <h2>{this.state.event.eventDate}</h2>
          <p>{this.state.event.eventTime}</p>
          <p>{this.state.event.eventDuration}</p>
          <p>{this.state.event.eventDescription}</p>
          <p>{this.state.event.registeredUsers}</p>
          <p>{this.state.event.prizes}</p>
          <h1>{this.state.event.registeredTeams}</h1>
          <h2>{this.state.event.interestCode}</h2>
          <h2>{this.state.event.gameIndicator}</h2>
          <p>{this.state.event.quizIndicator}</p>
          <p>{this.state.event.madePublicIndicator}</p>
          {/* <div
            className="main-page-image"
            style={{
              backgroundImage: "url('" + this.state.event.image + "')"
            }}
          /> }
          {/* <p>{this.state.event.description}</p> */}
        </main>
      );
    }
    if (!this.state.isLoading && !this.state.event) {
      content = (
        <main>
          <p>Found no event. Try again later.</p>
        </main>
      );
    }
    return content;
  }
}

export default EventCardPage;