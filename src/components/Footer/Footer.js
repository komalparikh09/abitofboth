import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons/';
import { FaBell, FaUser, FaBars } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';

import './Footer.css';

const footer = props => {
  let links = (
    <ul className="main-footer__nav-items">
      <li>
        <a href="https://deloittenet.deloitte.com/" className="logoLink"><span className="logoText">Deloitte</span><span className="logoDot">&#9679;</span></a>
        {/* https://www2.deloitte.com/content/dam/Deloitte/us/Images/promo_images/deloitte/us-deloitte-logo.jpg */}
      </li>
      <li className="navbar-right-icon">
        <SocialIcon url="http://twitter.com/jaketrent" bgColor="#86bc25" />
      </li>
      <li className="navbar-right-icon">
        <SocialIcon url="http://jaketrent.com" network="tumblr" bgColor="#86bc25" />
      </li>
      <li className="navbar-right-icon">
        <SocialIcon url="http://linkedin.com/in/jaketrent" bgColor="#86bc25" />
      </li>
      <li className="navbar-right-icon">
        <SocialIcon url="http://facebook.com/" bgColor="#86bc25" />
      </li>
      <li className="navbar-right-icon">
        <SocialIcon url="http://gmail.com/" bgColor="#86bc25" />
      </li>
    </ul>
  );

  if (!props.authenticated) {
    links = (
      <ul className="main-footer__nav-items">
        <li className="main-footer__nav-item">
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      </ul>
    );
  }

  return (
    <footer className="main-footer sticky">
      <nav className="main-footer__nav">{links}</nav>
    </footer>
  );
};

export default footer;
