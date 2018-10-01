import React, { Component } from 'react';
import '../../CSS/style.css';
import Logo from '../../images/mt-logo.jpg';

class Login extends Component {
  render () {
    return(
      < div className="login_register_wrap">
        <div className="login_register_top">
          <div className="login_register_logo">
            <img src={Logo} className="img_class" alt="maintenace tracker" />
          </div>
        </div>
        <h2 className="title text-center">User Login</h2>
        <form action="requests.html" autoComplete="off">
          <div className="form_group">
            <label htmlFor="username"></label>
            <input type="text" name="username" required id="username" placeholder="username" />
          </div>

          <div className="form_group">
            <label htmlFor="password"></label>
            <input type="password" required name="password" id="password" placeholder="password"/>
          </div>

          <div className="form_group">
            <input type="submit" value="Login" />
            <span className="not-a-member">
                    Not a member, <a href="register.html">register</a>
            </span>
            <span className="not-a-member">
                    OR
            </span>
            <span className="not-a-member">
              <a href="admin/login.html">Login as an Admin</a>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
export default Login;
