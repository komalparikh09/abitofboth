import React, { Component } from 'react';
import axios from 'axios';

import './Event.css';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class EventPage extends Component {
  state = { isLoading: true, event: null };

  componentDidMount() {
    axios
      .get('http://localhost:3100/events/' + this.props.match.params.id)
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
          <br />
          <div className="div-card">
            <div className="div-card-name">
              <div className="div-card-text">
                <h3>{this.state.event.eventName}</h3>
              </div>
            </div>
            <div className="div-card-text">
            <br />
        {this.state.event.eventCreatedBy}
        <br />
        <br />
        {this.state.event.eventDate}
        <br />
        <br />
        {this.state.event.eventTime}
        <br />
        <br />
        {this.state.event.eventDuration}
        <br />
        <br />
        {this.state.event.eventDescription}
        <br />
        <br />
        {this.state.event.registeredUsers}
        <br />
        <br />
        {this.state.event.prizes}
        <br />
        <br />
        {this.state.event.registeredTeams}
        <br />
        <br />
        {this.state.event.interestCode}
        <br />
        <br />
        {this.state.event.gameIndicator}
        <br />
        <br />
        {this.state.event.quizIndicator}
        <br />
        <br />
        {this.state.event.madePublicIndicator}
              <br />
              <br />
            </div>
          </div>
          {/* <h1>Name: {this.state.event.name}</h1>
          <h2>Phone Number: {this.state.event.phoneNumber}</h2>
          <h2>Specialization: {this.state.event.specialization}</h2>
          <p>Total Experience: {this.state.event.totalExperience}</p>
          <p>Working Days: {this.state.event.workingDays}</p>
          <p>Visiting Hours From: {this.state.event.visitingHoursFrom}</p>
          <p>Visiting Hours To: {this.state.event.visitingHoursTo}</p> */}
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

export default EventPage;