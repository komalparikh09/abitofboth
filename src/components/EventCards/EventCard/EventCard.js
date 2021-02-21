import React from 'react';
import { Link } from 'react-router-dom';

import './EventCard.css';

const event = props => (
  <article className="article-card">
    {/* <div
      className="article-card-image"
      style={{ backgroundImage: "url('" + props.imageUrl + "')" }}
    /> */}
    <div className="div-card">
      <div className="div-card-name">
        <div className="div-card-text">
          <h3>{props.eventName}</h3>
        </div>
      </div>
      <div className="div-card-text">
        <br />
        {props.eventCreatedBy}
        <br />
        <br />
        {props.eventDate}
        <br />
        <br />
        {props.eventTime}
        <br />
        <br />
        {props.eventDuration}
        <br />
        <br />
        {props.eventDescription}
        <br />
        <br />
        {props.registeredUsers}
        <br />
        <br />
        {props.prizes}
        <br />
        <br />
        {props.registeredTeams}
        <br />
        <br />
        {props.interestCode}
        <br />
        <br />
        {props.gameIndicator}
        <br />
        <br />
        {props.quizIndicator}
        <br />
        <br />
        {props.madePublicIndicator}
        <br />
      </div>
      {/* <div className="buttonRight">
        <Link to={'/appointment/book/' + props.id}><input type="submit" id="btnBookAppointment" className="blueBtn"
          value="Book Appointment" /></Link>
      </div> */}
    </div>
    {/* <div className="article-card-controls">
      <Link to={'/appointment/book/' + props.id}>Book Appointment</Link>
    </div> */}
  </article>
);

export default event;