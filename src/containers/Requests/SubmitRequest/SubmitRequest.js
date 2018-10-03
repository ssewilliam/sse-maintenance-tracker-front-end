import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from 'react-notify-toast';
import { createRequest } from '../../../store/actions/submitRequestAction';
import Overlay from '../../../components/Overlay/Overlay';
import notifyDone from '../../../Utilities';
export class SubmitRequest extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    request: {
      title:'',
      type:'',
      description:''
    }
  };

  eventHandler = event => {
    const {request , hasFocus } = this.state;
    this.setState({
      request: {...request, [event.target.name]: event.target.value},
      hasFocus: {...hasFocus, [event.target.name]: true}
    });
  }

  oncreateRequestEventHandler = event => {
    event.preventDefault();
    const {request } = this.state;
    const {
      onCreate
    } = this.props;
    onCreate({request});
  }

  render() {
    const { errors, loading, createStatus } = this.props;
    return (
      <div className="container">
        { loading ? <Overlay /> : '' }
        { errors.message ? notifyDone(errors.message, 'error', 'red') : ''}
        { createStatus ? notifyDone('Request Successfully created', 'success', 'green') : ''}
        <form id="new_request" className="form new_request" method="post"
          onSubmit={event => this.oncreateRequestEventHandler(event)} >
          <div className="form_group">
            <label htmlFor="title"></label>
            <input type="text" required name="title" id="title" onChange={this.eventHandler} placeholder="Title of the request" />
          </div>
          <div className="form_group">
            <select name="type" required onChange={this.eventHandler} id="type" className="form-control">
              <option value="">----- Choose a request type------</option>
              <option value="repair">Repair</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="form_group">
            <label htmlFor="description"></label>
            <textarea name="description" required id="description" onChange={this.eventHandler} cols="30" rows="10" placeholder="Brief description"></textarea>
          </div>
          <div id="feed" className="text-center" style={{fontSize:'16px', color:'red', fontWeight:'bold'}}></div>
          <div className="form_group">
            <input type="submit" value="create request" />
          </div>
          <Notification />
        </form>
      </div>
    );
  }
}
SubmitRequest.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.object,
  onCreate: PropTypes.func,
  createStatus: PropTypes.bool
};
SubmitRequest.defaultProps = {
  loading: false,
  errors: {message:'hhhhhh'},
  onCreate: () => {},
  createStatus: false
};
const mapStateToProps = state => {
  return {
    request: state.postRequest.request,
    errors: state.postRequest.errors,
    loading: state.postRequest.loading,
    createStatus: state.postRequest.createStatus,
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    onCreate: (userData) => dispatch(createRequest(userData)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitRequest);
