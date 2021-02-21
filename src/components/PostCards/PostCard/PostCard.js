import React from 'react';
import { Link } from 'react-router-dom';

import './PostCard.css';

const post = props => (
  <article className="article-card">
    {/* <div
      className="article-card-image"
      style={{ backgroundImage: "url('" + props.imageUrl + "')" }}
    /> */}
    <div className="div-card">
      <div className="div-card-name">
        <div className="div-card-text">
          <h3>{props.title}</h3>
        </div>
      </div>
      <div className="div-card-text div-card-main">
        <br />
        {props.caption}
        <br />
        <br />
        {props.tags}
        <br />
        <br />
        {props.postedBy}
        <br />
        <br />
        {props.postedDate}
        <br />
        <br />
        {props.postedTime}
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

export default post;