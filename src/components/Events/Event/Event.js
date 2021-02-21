import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Event.css';

const event = props => (
  <article className="article-card">
    <div className="div-card-text div-card-main">
      <Link to={'/events/' + props.id}><h3>{props.eventName}</h3></Link>
    </div>
    <div className="div-card" style={{ content: "url(\"" + props.imageSourceLoc + "\")", padding: "1%" }}>
      {/* <br />
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
        <br /> */}
      {/* <div className="buttonRight">
        <Link to={'/appointment/book/' + props.id}><input type="submit" id="btnBookAppointment" className="blueBtn"
          value="Book Appointment" /></Link>
      </div> */}
    </div>
    <div className="article-card-controls">
      <Link to={'/events/' + props.id + '/edit'} style={{ color: "#86bc25", textDecoration: "none"}}>Edit</Link>
      <button onClick={props.onDelete.bind(this, props.id)} style={{ color: "#86bc25", textDecoration: "none"}}>Delete</button>
    </div>
  </article>
);

export default event;