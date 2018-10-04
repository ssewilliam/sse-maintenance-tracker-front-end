import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { history as historyPropTypes } from 'history-prop-types';
import '../../CSS/style.css';

import { fetchRequest } from '../../store/actions/fetchRequestsAction';
import NoRequest from '../../components/Requests/NoRequest/NoRequest';
import RequestItem from '../../components/Requests/RequestItem/RequestItem';

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    history: PropTypes.shape(historyPropTypes),
  }
  componentDidMount(){
    const { onFetch } = this.props;
    onFetch();
  }
  signOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this.props.history.push('/login');
  }


  render() {
    const {
      requests, hasRequests
    } = this.props;
    return (
      <div className="container">
        <div className="col-12">
          <h3 className="title">Requests</h3>
          <div className="row requests">
            <div className="requests request_content">
              <h5 className="title">Current Requests</h5>
            </div>
            {
              hasRequests === false ?
                NoRequest
                :
                requests.map((request, index) => (
                  <div className="col-12" key={index}>
                    <RequestItem {...request} />
                  </div>
                ))
            }

          </div>
        </div>
        <Button color="primary" onClick={this.signOut}>primary</Button>{' '}
      </div>
    );
  }
}
Home.propTypes = {
  requests: PropTypes.array,
  onFetch: PropTypes.func,
  hasRequests: PropTypes.bool,
};
Home.defaultProps = {
  requests: [],
  hasRequests: false,
  onFetch: () => {}
};
const mapStateToProps = state => {
  return {
    requests: state.fetchRequest.requests,
    hasRequests: state.fetchRequest.hasRequests
  };
};
export const mapDispatchToProps = dispatch =>{
  return {
    onFetch: () => dispatch(fetchRequest())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);
