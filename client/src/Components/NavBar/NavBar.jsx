import React from 'react';
import './NavBar.scss';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div className="header-information">
        <div className="logo">Drivers Report</div>
        <div className="logo-image-holder">
          <img src="assets/james.jpg" alt="" className="logo-image" />
        </div>
        <div className="name-holder">
          <div className="name">Nnaji Victor</div>
          <div className="title">Main Admin</div>
        </div>
      </div>
      <div className="links">
        <NavLink className="link-item" to="/">
          <i className="mdi mdi-view-dashboard" /> Dashboard
        </NavLink>

        <NavLink className="link-item" to="/trips">
          <i className="mdi mdi-car" /> Trip Details
        </NavLink>

        <NavLink className="link-item" to="/drivers">
          <i className="mdi mdi-account-group" /> Drivers
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
