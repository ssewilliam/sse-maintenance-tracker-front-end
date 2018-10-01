import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { history as historyPropTypes } from 'history-prop-types';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    history: PropTypes.shape(historyPropTypes),
  }

  signOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('username');
    this.props.history.push('/login');
  }
  render() {
    return(
      <div>
        This is a home
        <Button color="primary" onClick={this.signOut}>primary</Button>{' '}
      </div>
    );
  }
}
export default Home;
