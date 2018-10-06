import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import SubmitRequest from './containers/Requests/SubmitRequest/SubmitRequest';
import Navbar from './components/Navbar/Navbar';
import SingleRequest from './containers/Requests/SingleRequest/SingleRequest';

export const Routes = (props) => {
  const { loginStatus } = props;
  return (
    <BrowserRouter>
      <div>
        {loginStatus ? <Navbar /> : ''}
        { 
          navigator.onLine ?
            <Switch>
              <Route path="/" exact component={ loginStatus  ? Home : Register} /> 
              <Route path="/new-request" exact component={loginStatus ? SubmitRequest : Register} /> 
              <Route path="/requests/:requestId" exact component={loginStatus ? SingleRequest : Register} />
              <Redirect to="/"/>
            </Switch>
            :
            setInterval(() => {
              alert('Your device is offline, please reconnect to the internet');
            },500)
        }
      </div>
    </BrowserRouter>
  );
};
Routes.propTypes = {
  loginStatus: PropTypes.bool
};
Routes.defaultProps = {
  loginStatus: false
};
const mapStateToProps = state => {
  return {
    loginStatus: localStorage.getItem('isLoggedIn') === 'true' || state.registerLogin.loginStatus,
  };
};
export default connect(mapStateToProps)(Routes);
