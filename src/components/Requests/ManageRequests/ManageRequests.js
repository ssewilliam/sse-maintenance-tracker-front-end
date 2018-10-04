import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from 'react-notify-toast';
import axios from 'axios';
import { Button } from 'reactstrap';
import notifyDone from '../../../Utilities';
import AppUrls from '../../../AppUrls';
export class ManageRequest extends Component {

  manageRequest = (status, RequestId) => {
    return (
      axios
        .put(
          AppUrls.requestsAdmin+'/'+RequestId,{
            status: status
          }, {
            headers: {
              'token': `${localStorage.getItem('token')}`,
            },
          },
        ).then(response => {
          notifyDone(response.data.message, 'success', 'yellow');
        })
        .catch((error) => error)
    );
  }

  render() {
    const { requestId } = this.props;
    return (
      <div className="container">
        <Button onClick={() => this.manageRequest('approve', requestId)} color="primary">Approve</Button>&nbsp;&nbsp;
        <Button onClick={() => this.manageRequest('resolve', requestId)} color="success">Resolve</Button>&nbsp;&nbsp;
        <Button onClick={() => this.manageRequest('disapprove', requestId)} color="danger">Reject</Button>
        <Notification />
      </div>
    );
  }
}
ManageRequest.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.object,
  createStatus: PropTypes.bool,
  requestId: PropTypes.number,
};
ManageRequest.defaultProps = {
  loading: false,
  errors: {message:'hhhhhh'},
  createStatus: false,
  requestId: 0
};
export default ManageRequest;
