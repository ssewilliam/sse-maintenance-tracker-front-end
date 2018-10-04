import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginRegisterImage from '../Forms/LoginRegisterImage/LoginRegisterImage';
import '../../CSS/style.css';


class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mta_logo">
                <LoginRegisterImage />
              </div>
              <div className="nav_bar">
                <ul className="nav_lists">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="submenu">
                    <a href="#">Requests</a>
                    <ul className="">
                      <li>
                        <NavLink to="/new-request">New Request</NavLink>
                      </li>
                      <li>
                        <a href="filter_requests.html">Filter Request</a>
                      </li>
                      <li>
                        <NavLink to="/">View all</NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Navbar;
