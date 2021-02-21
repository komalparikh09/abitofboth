import React from 'react';
import { Link } from 'react-router-dom';

import './QuizCard.css';

const quiz = props => (
  <article className="article-card">
    {/* <div
      className="article-card-image"
      style={{ backgroundImage: "url('" + props.imageUrl + "')" }}
    /> */}
    <div className="div-card">
      <div className="div-card-name">
        <div className="div-card-text">
          <h3>Dr. {props.name}</h3>
        </div>
      </div>
      <div className="div-card-text">
        <br />
          Specialization : {props.specialization}
        <br />
        <br />
          Total Experience : {props.totalExperience} years
          <br />
        <br />
          Address : HealthShades Clinic
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

export default quiz;