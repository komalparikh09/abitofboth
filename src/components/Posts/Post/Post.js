import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Plx from 'react-plx';

import './Post.css';

const parallaxData = [
  {
    start: 0,
    end: 300,
    properties: [
      {
        startValue: 0,
        endValue: 20,
        property: "rotate"
      },
      {
        startValue: 1,
        endValue: 0.75,
        property: "opacity"
      }
    ]
  },
  {
    start: 300,
    duration: 300,
    properties: [
      {
        startValue: -20,
        endValue: 0,
        property: "rotate"
      },
      {
        startValue: 0.75,
        endValue: 1,
        property: "opacity"
      },
      {
        startValue: 0,
        endValue: 20,
        property: "rotate"
      },
      {
        startValue: 1,
        endValue: 0.75,
        property: "opacity"
      }
    ]
  },
  {
    start: 600,
    duration: 300,
    properties: [
      {
        startValue: -20,
        endValue: 0,
        property: "rotate"
      },
      {
        startValue: 0.75,
        endValue: 1,
        property: "opacity"
      }
    ]
  },
];

const post = props => (
  <div>
    <br />
    <br />
    {/* <Plx className='MyAwesomeParallax' parallaxData={parallaxData}>
      <div style={{ content: "url('./../../images/15.jpg')", height: "20%", width: "30%" }} />
    </Plx> */}
    <article className="article-card">
      <div className="div-card-text div-card-main">
        <Link to={'/posts/' + props.id}><h3>{props.title}</h3></Link>
      </div>
      <div className="div-card" style={{ content: "url(\"" + props.imageSourceLoc + "\")", padding: "1%" }}>
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
        <Link to={'/posts/' + props.id}>Details</Link>
        <Link to={'/posts/' + props.id + '/edit'}>Edit</Link>
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
        </div>
        {/* <div className="buttonRight">
          <Link to={'/appointment/book/' + props.id}><input type="submit" id="btnBookAppointment" className="blueBtn"
            value="Book Appointment" /></Link>
        </div> */}
      </div>
      <div className="article-card-controls">
        {/* <Link to={'/appointment/book/' + props.id}>Book Appointment</Link> */}
        <Link to={'/posts/' + props.id}>Details</Link>
        <Link to={'/posts/' + props.id + '/edit'}>Edit</Link>
        <button onClick={props.onDelete.bind(this, props.id)}>Delete</button>
      </div>
    </article>
  </div>
);

export default post;