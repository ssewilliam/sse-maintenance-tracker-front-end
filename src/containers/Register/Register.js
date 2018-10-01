import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../store/actions/registerAction';
import LoginRegisterImage from '../../../src/components/Forms/LoginRegisterImage/LoginRegisterImage';
import '../../CSS/style.css';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.onDismiss = this.onDismiss.bind(this);
  }

  state = {
    visible: true,
    user: {
      username: '',
      email: '',
      password: '',
    },
    hasFocus:{
      username: false,        
    }
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

  validationHandler = inputName => {
    const { user, hasFocus } = this.state;
    switch (inputName) {
    case 'username':
      if (user.username.length < 6 && hasFocus.username) {
        return (
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            Username needs to be at least 6 characters long.
          </Alert>
        );
      }
      break;
    case 'email':
      if (!user.email.match(/\S+@\S+\.\S+/) && hasFocus.email) {
        return (
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            Enter a valid email format.
          </Alert>);
      }
      break;
    case 'password':
      if (user.password.length < 8 && hasFocus.password) {
        return (
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            Password needs to be at least 8 characters long.
          </Alert>);
      }
      if (user.password.match(/^[a-zA-Z0-9_]+$/) && hasFocus.password) {
        return (
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
              A password must have a number and a symbol @,#,!,$,%,&,*,(,)
          </Alert>
        );
      }
      break;
    default:
      break;
    }
    return false;
  };

  onRegistrationSubmitEventHandler = event => {
    event.preventDefault();
    const {
      onRegister
    } = this.props;
    const {
      user
    } = this.state;
    if (user.username === '') {
      this.validationHandler('username');
    }
    if (user.email === '') {
      this.validationHandler('email');
    }
    if (user.password === '') {
      this.validationHandler('password');
    } 
    if(user.username && user.email && user.password){
      onRegister({
        user
      });
    }
  };

  render() {
    const { errors, loading } = this.props;
    return(
      <div className="login_register_wrap">
        {
          loading ?
            <LoginRegisterImage loader={'loader'}/>
            : <LoginRegisterImage />
        }
        <h2 className="title text-center">User Registration</h2>
        <form id="registractionForm" autoComplete="Off" action="login.html" method="post"
          onSubmit={event => this.onRegistrationSubmitEventHandler(event)}
        >
          <div className="form_group">
            <label htmlFor="username"></label>
            <input type="text" className="form-control" onChange={this.eventListener} name="username" id="username" placeholder="username"/>
            {errors.message ?
              <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                {errors.message}
              </Alert>
              : ''
            }
            {this.validationHandler('username')}
          </div>       
          <div className="form_group">
            <label htmlFor="email"></label>
            <input type="email" className="form-control" onChange={this.eventListener} name="email" id="email" placeholder="name@example.com"/>
            {errors.message ?
              <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                {errors.message}
              </Alert>
              : ''
            }
            {this.validationHandler('email')}
          </div>
          <div className="form_group">
            <label htmlFor="password"></label>
            <input type="password" className="form-control" onChange={this.eventListener} name="password" id="password" placeholder="password"/>
            {this.validationHandler('password')}
          </div>
          <div className="form_group">
            <input type="submit" name="submit" value="Sign Up" />
            <span className="already-a-member">
                Already a member,
              <NavLink to="login">Sign in</NavLink>
            </span>
          </div>
        </form>
      </div>
    );
  }
}
Register.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.object,
  onRegister: PropTypes.func,
};
Register.defaultProps = {
  loading: false,
  errors: {},
  onRegister: () => {},
};

const mapStateToProps = state => {
  return {
    user: state.registration.user,
    errors: state.registration.errors,
    loading: state.registration.loading,
    registrationStatus: state.registration.registrationStatus,
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    onRegister: (userData) => dispatch(registerUser(userData)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
