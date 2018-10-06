import React, { Component } from 'react';
import { Alert, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Notification from 'react-notify-toast';
import notifyDone from '../../Utilities';
import { registerUser } from '../../store/actions/registerAction';
import { loginUser } from '../../store/actions/loginAction';
import { promoteUser } from '../../store/actions/promoteUserAction';
import LoginRegisterImage from '../../../src/components/Forms/LoginRegisterImage/LoginRegisterImage';
import Overlay from '../../components/Overlay/Overlay';
import '../../CSS/style.css';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      visible: true,
      user: {
        username: '',
        email: '',
        password: '',
        promoUsername: '',
        promoEmail: '',
        loginUsername:'',
        loginPassword:'',
      },
      hasFocus: {
        username: false,
      },
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

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
    case 'promoUsername':
      if (user.promoUsername.length < 1 && hasFocus.promoUsername) {
        return (
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            A Username to promote is required
          </Alert>
        );
      }
      break;    
    case 'promoEmail':
      if (user.promoEmail.length < 1 && hasFocus.promoEmail) {
        return (
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            An email to promote is required
          </Alert>
        );
      }
      break;    
    case 'loginUsername':
      if (user.loginUsername.length < 1 && hasFocus.loginUsername) {
        return (
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            A Username is required to login
          </Alert>
        );
      }
      break;    
    case 'loginPassword':
      if (user.loginPassword.length < 1 && hasFocus.loginPassword) {
        return (
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            A Password is required to login
          </Alert>
        );
      }
      break;    
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
      user, hasFocus
    } = this.state;
    if (user.username === '') {
      this.setState({
        hasFocus: {...hasFocus, username: true }
      });
      this.validationHandler('username');
    }
    if (user.email === '') {
      this.validationHandler('email');
      this.setState({
        hasFocus: {...hasFocus, email: true }
      });
    }
    if (user.password === '') {
      this.validationHandler('password');
      this.setState({
        hasFocus: {...hasFocus, password: true }
      });
    } 
    if(user.username && user.email && user.password){
      onRegister({
        user
      });
    }
  };

  onLoginSubmitEventHandler = event => {
    event.preventDefault();
    const {
      onLogin
    } = this.props;
    const {
      user, hasFocus
    } = this.state;
    if (user.loginUsername === '') {
      this.setState({
        hasFocus: {...hasFocus, loginUsername: true }
      });
      this.validationHandler('loginUsername');
    }
    if (user.loginPassword === '') {
      this.setState({
        hasFocus: {...hasFocus, loginPassword: true }
      });
      this.validationHandler('loginPassword');
    } 
    if (user.loginUsername && user.loginPassword) {
      onLogin({
        user
      });
    }
  };
  onPromoteUserEventHandler = event => {
    event.preventDefault();
    alert('here');
    const {
      onPromoteUser
    } = this.props;
    const {
      user, hasFocus
    } = this.state;
    if (user.promoUsername === '') {
      this.setState({
        hasFocus: {...hasFocus, promoUsername: true }
      });
      this.validationHandler('promoUsername');
    }
    if (user.promoEmail === '') {
      this.setState({
        hasFocus: {...hasFocus, promoEmail: true }
      });
      this.validationHandler('promoEmail');
    } 
    if (user.promoUsername && user.promoEmail) {
      onPromoteUser({
        user
      });
    }
  };

  render() {
    const {
      errors,
      errorsLogin,
      loginLoading,
      promoStatus,
      loginStatus
    } = this.props;
    return(
      <div className="login_register_wrap">
        <LoginRegisterImage />
        { loginLoading ? <Overlay /> : '' }    
        {
          errorsLogin.message ? notifyDone(errorsLogin.message, 'error', 'red') : ''
        }
        {
          loginStatus ? notifyDone('Welcome to Maintenance Tracker', 'success', 'green') : ''
        }
        {
          promoStatus ? notifyDone('You have been promoted to Admin', 'success', 'green') : ''
        }
        <Notification />
        <Nav tabs>
          <NavItem>
            <NavLink
              name="tab1"
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Login
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              name="tab2"
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Register
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              name="tab3"
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Promote User to Admin
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <form id="loginForm" autoComplete="Off" 
                  onSubmit={event => this.onLoginSubmitEventHandler(event)}>
                  <h2 className="title text-center">User Login</h2>                  
                  <div className="form_group">
                    <label htmlFor="username"></label>
                    <input type="text" name="loginUsername" onChange={this.eventListener} id="username" placeholder="username" />
                    {errors.message ?
                      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {errors.message}
                      </Alert>
                      : ''
                    }
                    {this.validationHandler('loginUsername')}  
                  </div>
                  <div className="form_group">
                    <label htmlFor="password"></label>
                    <input type="password" name="loginPassword" onChange={this.eventListener} id="password" placeholder="password"/>
                    {errors.message ?
                      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {errors.message}
                      </Alert>
                      : ''
                    }
                    {this.validationHandler('loginPassword')} 
                  </div>
                  <div className="form_group">
                    <input type="submit" value="Login" />
                  </div>
                </form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <form id="registractionForm" autoComplete="Off"
                  onSubmit={event => this.onRegistrationSubmitEventHandler(event)}
                >
                  <h2 className="title text-center">User Registration</h2>
                  <div className="form_group">
                    <label htmlFor="username"></label>
                    <input type="text" className="form-control" onChange={this.eventListener} name="username" id="registerUsername" placeholder="username"/>
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
                    <input type="email" className="form-control" onChange={this.eventListener} name="email" id="registerEmail" placeholder="name@example.com"/>
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
                    <input type="password" className="form-control" onChange={this.eventListener} name="password" id="registerPassword" placeholder="password"/>
                    {this.validationHandler('password')}
                  </div>
                  <div className="form_group">
                    <input type="submit" name="submit" value="Sign Up" />
                  </div>
                </form>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <form id="promoteUserForm" autoComplete="Off" 
                  onSubmit={event => this.onPromoteUserEventHandler(event)}>
                  <h2 className="title text-center">Become an Admin</h2>                  
                  <div className="form_group">
                    <label htmlFor="username"></label>
                    <input type="text" name="promoUsername" onChange={this.eventListener} id="promoUsername" placeholder="username" />
                    {errors.message ?
                      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {errors.message}
                      </Alert>
                      : ''
                    }
                    {this.validationHandler('promoUsername')}  
                  </div>
                  <div className="form_group">
                    <label htmlFor="promoEmail"></label>
                    <input type="email" name="promoEmail" onChange={this.eventListener} id="promoEmail" placeholder="email"/>
                    {errors.message ?
                      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                        {errors.message}
                      </Alert>
                      : ''
                    }
                    {this.validationHandler('promoEmail')} 
                  </div>
                  <div className="form_group">
                    <input type="submit" value="Login" />
                  </div>
                </form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
Register.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.object,
  onRegister: PropTypes.func,
  onLogin: PropTypes.func, 
  onPromoteUser: PropTypes.func,
  loginLoading: PropTypes.bool,
  errorsLogin: PropTypes.object,
  loginStatus: PropTypes.bool,
  promoStatus: PropTypes.bool,
};
Register.defaultProps = {
  loading: false,
  loginStatus: false,
  promoStatus: false,
  errors: { message:''},
  errorsLogin: { message:''},
  loginLoading: false,
  onRegister: () => {},
  onLogin: () => {},
  onPromoteUser: () => {},
};

const mapStateToProps = state => {
  return {
    user: state.registerLogin.user,
    errors: state.registerLogin.errors,
    loading: state.registerLogin.loading,
    registrationStatus: state.registerLogin.registrationStatus,
    loginStatus: state.registerLogin.loginStatus,
    promoStatus: state.registerLogin.promoStatus,
    errorsLogin: state.registerLogin.errors,
    loginLoading: state.registerLogin.loading,
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    onRegister: (userData) => dispatch(registerUser(userData)),
    onLogin: (userData) => dispatch(loginUser(userData)),
    onPromoteUser: (userData) => dispatch(promoteUser(userData)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
