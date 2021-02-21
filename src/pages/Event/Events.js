import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import Events from '../../components/Events/Events';
import { config } from 'process';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class EventsPage extends Component {
  state = { isLoading: true, events: [] };
  componentDidMount() {
    this.fetchData();
  }

  eventDeleteHandler = eventId => {
    axios
      .delete('http://localhost:3100/events/' + eventId)
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the event account failed. Please try again later'
        );
        console.log(err);
      });
  };

  fetchData = () => {
    axios
      .get('http://localhost:3100/events')
      .then(eventsResponse => {
        this.setState({ isLoading: false, events: eventsResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, events: [] });
        this.props.onError('Loading event accounts failed. Please try again later');
        console.log(err);
      });
  };

  searchEventHandler = () => {
    axios
      .get('http://localhost:3100/searchevents')
      .then(eventsResponse => {
        this.setState({ isLoading: false, events: eventsResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, events: [] });
        this.props.onError('Search failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{ display: "none" }}>Loading events...</p></div>;

    if (!this.state.isLoading && this.state.events.length > 0) {
      content = (
        <div>
          <ul className="main-button__nav-items">
            <li className="main-button__nav-item">
              <NavLink to="/games">Games</NavLink>
            </li>
            <li className="main-button__nav-item">
              <NavLink to="/quizzes">Quizzes</NavLink>
            </li>
          </ul>
          <Events
            events={this.state.events}
            onDeleteEvent={this.eventDeleteHandler}
          />
        </div>
      );
    }
    if (!this.state.isLoading && this.state.events.length === 0) {
      content = <p>Found no events. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default EventsPage;