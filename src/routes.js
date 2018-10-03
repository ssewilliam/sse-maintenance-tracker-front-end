import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import SubmitRequest from './containers/Requests/SubmitRequest/SubmitRequest';
import Navbar from './components/Navbar/Navbar';
export const Routes = (props) => {
  const { authStatus } = props;
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} {...props} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={authStatus ? Home : Login} /> 
          <Route path="/new-request" exact component={authStatus ? SubmitRequest : Login} /> 
        </Switch>
      </div>
    </BrowserRouter>
  );
};
Routes.propTypes = {
  authStatus: PropTypes.bool
};
Routes.defaultProps = {
  authStatus: true
};
const mapStateToProps = state => {
  return {
    authStatus: true,
  };
};
export default connect(mapStateToProps)(Routes);
