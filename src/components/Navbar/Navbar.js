import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginRegisterImage from '../Forms/LoginRegisterImage/LoginRegisterImage';
import '../../CSS/style.css';


class Navbar extends Component {
  logOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
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
              <div className="nav_bar float-right">
                <ul className="nav_lists float-right">              
                  <li className="">
                    <a href="/" onClick={() => this.logOut()}>LOG OUT</a>
                  </li>
                </ul>
              </div>
              <div className="nav_bar float-left">                
                <ul className="nav_lists">
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="submenu">
                    <NavLink to="/#">Requests</NavLink>
                    <ul className="">
                      <li>
                        <NavLink to="/new-request">New Request</NavLink>
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
