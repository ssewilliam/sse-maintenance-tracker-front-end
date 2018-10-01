import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Navbar from './components/Navbar/Navbar';

export const Routes = (props) => {
  const { authStatus } = props;
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={authStatus ? Home : Login} /> 
        </Switch>
      </div>
    </BrowserRouter>
  );
};
Routes.propTypes = {
  authStatus: PropTypes.bool
};
Routes.defaultProps = {
  authStatus: false
};
// const mapStatesToProps = state => {
//   return {
//     // authStatus: state.isAuthentic.isAuthentic,
//   };
// };
export default connect()(Routes);