import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import AppUrls from '../../AppUrls';
import LoginRegisterImage from '../../../src/components/Forms/LoginRegisterImage/LoginRegisterImage';
import { NavLink } from 'react-router-dom';
import '../../CSS/style.css';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.onDismiss = this.onDismiss.bind(this);
  }
  static propTypes = {
    history: PropTypes.shape(historyPropTypes),
  };

  state = {
    visible: true,
    user: {
      username: '',
      password: '',
    },
    hasFocus: {
      username: false,
    },
  };

  onDismiss() {
    this.setState({
      visible: false,
    });
  }

  eventListener = event => {
    const { user, hasFocus } = this.state;
    this.setState({
      user: { ...user, [event.target.name]: event.target.value },
      hasFocus: {...hasFocus, [event.target.name]: true },
    });
  };

  handleResponse = (key,value) => {
    this.setState({
      [key]:value
    });
  }

  handleLocalStorage = (key,value) => {
    localStorage.setItem([key], value);
  }

  onLoginSubmitEventHandler = event => {
    event.preventDefault();
    this.handleResponse('loading', 'loader');
    const { user, } = this.state;
    axios
      .post(AppUrls.login, user, {
        headers: {
          'Authorization': 'Basic ' + btoa(user.username + ':' + user.password)
        },
      }
      )
      .then(response => {
        return (
          this.handleLocalStorage('token', response.data.token),
          this.handleLocalStorage('username', user.username),
          this.props.history.push('/'),
          this.handleResponse('loading', '')
        );
      })
      .catch((error) => {
        return (
          this.handleResponse('errorsMessage', error.response.data.message),
          this.handleResponse('visible', true),
          this.handleResponse('loading', '')
        );
      });
  };

  render () {
    const { errorsMessage, loading } = this.state;
    return(
      < div className="login_register_wrap">
        <LoginRegisterImage loader={loading}/>
        <h2 className="title text-center">User Login</h2>
        { errorsMessage ?
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            {errorsMessage}
          </Alert>
          :''
        }
        <form autoComplete="off" 
          onSubmit={event => this.onLoginSubmitEventHandler(event)}>
          <div className="form_group">
            <label htmlFor="username"></label>
            <input type="text" name="username" onChange={this.eventListener} required id="username" placeholder="username" />
          </div>

          <div className="form_group">
            <label htmlFor="password"></label>
            <input type="password" required name="password" onChange={this.eventListener} id="password" placeholder="password"/>
          </div>

          <div className="form_group">
            <input type="submit" value="Login" />
            <span className="not-a-member">
              Not a member, <NavLink to="/register">register</NavLink>
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
