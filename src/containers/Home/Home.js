import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../CSS/style.css';

import { fetchRequests } from '../../store/actions/fetchRequestsAction';
import NoRequest from '../../components/Requests/NoRequest/NoRequest';
import RequestItem from '../../components/Requests/RequestItem/RequestItem';
import Overlay from '../../components/Overlay/Overlay';
export class Home extends Component {
  componentDidMount(){
    const { onFetch } = this.props;
    onFetch();
  }

  render() {
    const {
      requests, hasRequests, loginStatus
    } = this.props;
    return (
      <div className="container">
        { 
          hasRequests ?                        
            ''
            :
            <Overlay />
        }
        <div className="col-12">
          <h3 className="title">Requests</h3>
          <div className="row requests">
            <div className="requests request_content">
              <h5 className="title">Current Requests</h5>
            </div>
            {
              !requests ?
                NoRequest
                :
                requests.map((request, index) => (
                  <div className="col-12" key={index}>
                    <div style={{display:'none'}}>{request.is_admin = loginStatus}</div>
                    <RequestItem {...request} />
                  </div>
                ))
            }

          </div>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  requests: PropTypes.array,
  onFetch: PropTypes.func,
  hasRequests: PropTypes.bool,
  loginStatus: PropTypes.bool,
};
Home.defaultProps = {
  requests: [],
  hasRequests: false,
  loginStatus: localStorage.getItem('is_admin') || false,
  onFetch: () => {}
};
const mapStateToProps = state => {
  return {
    requests: state.fetchRequests.requests,
    hasRequests: state.fetchRequests.hasRequests
  };
};
export const mapDispatchToProps = dispatch =>{
  return {
    onFetch: () => dispatch(fetchRequests())
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);
