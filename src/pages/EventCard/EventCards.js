import React, { Component } from 'react';
import axios from 'axios';

import EventCards from '../../components/EventCards/EventCards';
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class EventCardsPage extends Component {
  state = { isLoading: true, events: [] };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get('http://localhost:3100/searchevents')
      .then(eventsResponse => {
        this.setState({ isLoading: false, events: eventsResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, events: [] });
        this.props.onError('Loading search results for events failed. Please try again later');
        console.log(err);
      });
  };

  render() {
    let content = <div className="center-loading"><div className="sweet-loading"><BeatLoader css={override} size={50} color={"#86bc25"} loading={this.state.isLoading} /></div><p style={{display: "none"}}>Loading events...</p></div>;

    if (!this.state.isLoading && this.state.events.length > 0) {
      content = (
        <EventCards
          events={this.state.events}
          // onDeleteEvent={this.eventDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.events.length === 0) {
      content = <p>Found no events. Try again later.</p>;
    }
    return <main>{content}</main>;
  }
}

export default EventCardsPage;