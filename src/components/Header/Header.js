import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons/';
import { FaBell, FaUser, FaBars } from 'react-icons/fa';

import './Header.css';

const header = props => {
  let links = (
    <ul className="main-header__nav-items">
      <li>
        <a href="https://deloittenet.deloitte.com/" className="logoLink"><span className="logoText">Deloitte</span><span className="logoDot">&#9679;</span></a>
        {/* https://www2.deloitte.com/content/dam/Deloitte/us/Images/promo_images/deloitte/us-deloitte-logo.jpg */}
      </li>
      <li className="main-header__nav-item">
        <NavLink to="/home">Home</NavLink>
      </li>
      <li className="main-header__nav-item">
        <NavLink to="/events">Events</NavLink>
      </li>
      <li className="main-header__nav-item">
        <NavLink to="/initiatives">Initiatives</NavLink>
      </li>
      <li className="main-header__nav-item">
        <NavLink to="/firmimpact">Firm Impact</NavLink>
      </li>
      {/* <li className="main-header__nav-item">
        <NavLink to="/users">Users</NavLink>
      </li>
      <li className="main-header__nav-item">
        <NavLink to="/games">Games</NavLink>
      </li>
      <li className="main-header__nav-item">
        <NavLink to="/quizzes">Quizzes</NavLink>
      </li> */}
      <li className="main-header__nav-item">
        <NavLink to="/posts">Our People</NavLink>
      </li>
      <li className="main-header__nav-item">
        <button onClick={props.onLogout}>Logout</button>
      </li>
      <li className="navbar-right-icon bell">
        <NavLink to="/events">
          <IconContext.Provider value={{ color: "#86bc25", className: "global-class-name", size: "2.0em" }}>
            <div>
              <FaBell />
            </div>
          </IconContext.Provider>
        </NavLink>
      </li>
      <li className="navbar-right-icon user">
        <NavLink to="/posts">
          <IconContext.Provider value={{ color: "#86bc25", className: "global-class-name", size: "2.0em" }}>
            <div>
              <FaUser />
            </div>
          </IconContext.Provider>
        </NavLink>
      </li>
      <li className="navbar-right-icon bars">
        <NavLink to="/menu">
          <IconContext.Provider value={{ color: "#86bc25", className: "global-class-name", size: "2.3em" }}>
            <div>
              <FaBars />
            </div>
          </IconContext.Provider>
        </NavLink>
      </li>
    </ul>
  );

  if (!props.authenticated) {
    links = (
      <ul className="main-header__nav-items">
        <li className="main-header__nav-item">
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <header className="main-header sticky">
      <nav className="main-header__nav">{links}</nav>
    </header>
  );
};

export default header;
