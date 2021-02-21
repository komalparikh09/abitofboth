import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Memory.css';

const memory = props => (
  <article className="article-card">
    {/* <div
      className="article-card-image"
      style={{ backgroundImage: "url('" + props.imageUrl + "')" }}
    /> */}
    {/* <div className="article-card-content">
      <h1>Name: {props.name}</h1>
      <h2>Phone Number: {props.phoneNumber}</h2>
      <h2>Specialization: {props.specialization}</h2>
      <h2>Total Experience: {props.totalExperience} years</h2>
      <h2>Working Days: {props.workingDays}</h2>
      <h2>Visiting Hours From: {props.visitingHoursFrom}</h2>
      <h2>Visiting Hours To: {props.visitingHoursTo}</h2>
      <div className="article-card-controls">
        <Link to={'/memories/' + props.id}>Details</Link>
        <Link to={'/memories/' + props.id + '/edit'}>Edit</Link>
        <button onClick={props.onDelete.bind(this, props.id)}>Delete</button>
      </div>
    </div> */}
    <div className="div-card">
      <div className="div-card-name">
        <div className="div-card-text">
          <h3>{props.title}</h3>
        </div>
      </div>
      <div className="div-card-text div-card-main">
        <br />
          {props.event}
        <br />
      </div>
      {/* <div className="buttonRight">
        <Link to={'/appointment/book/' + props.id}><input type="submit" id="btnBookAppointment" className="blueBtn"
          value="Book Appointment" /></Link>
      </div> */}
    </div>
    <div className="article-card-controls">
      {/* <Link to={'/appointment/book/' + props.id}>Book Appointment</Link> */}
      <Link to={'/memories/' + props.id}>Details</Link>
      <Link to={'/memories/' + props.id + '/edit'}>Edit</Link>
      <button onClick={props.onDelete.bind(this, props.id)}>Delete</button>
    </div>
  </article>
);

export default memory;