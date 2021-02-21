import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


import './Menu.css';
import '../../../src/elements.css';
import '../../../src/util.js';
// import Input from '../../components/Input/Input';
// import Button from '../../components/Button/Button';
// import $ from 'jquery';

class MenuPage extends Component {
  state = {
    isLoading: false
  };

  render() {
    let content = (
    <div className="menu-content">
      <ul className="menu-items">
        <li className="menu-item">
          <NavLink to="/events">Events</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/initiatives">Initiatives</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/memories">Memories</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/posts">Our People</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/jointeam">Code With Us</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/shoutout">Be Grateful</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/contact">Contact Us</NavLink>
        </li>
      </ul>
    </div>);
    if (this.state.isLoading) {
      content = <p>Is loading...</p>;
    }
    return <main>{content}</main>;
  }
}


export default MenuPage;