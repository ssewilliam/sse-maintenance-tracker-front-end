import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { history as historyPropTypes } from 'history-prop-types';
import '../../../CSS/style.css';

import { fetchRequest } from '../../../store/actions/fetchRequestAction';
import NoRequest from '../../../components/Requests/NoRequest/NoRequest';
import RequestDetail from '../../../components/Requests/RequestDetail/RequestDetail';

export class SingleRequest extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    history: PropTypes.shape(historyPropTypes),
  }
  componentDidMount(){
    const { onFetch, match } = this.props;
    onFetch(match.params.requestId);
  }
  signOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.props.history.push('/login');
  }


  render() {
    const {
      request, hasRequests
    } = this.props;
    return (
      <div className="container">
        <div className="bgwrap large-12">
        </div>
        <div className="col-">         
          <div className="row">
            {
              hasRequests === false ?
                NoRequest
                :
                request.map((request, index) => (
                  <div className="col-12" key={index}>
                    <h3 className="heading text-center">{request.title}</h3>
                    <RequestDetail {...request} />
                  </div>
                ))
            }

          </div>
        </div>
        <Button color="primary" onClick={this.signOut}>Sign Out</Button>
      </div>
    );
  }
}
SingleRequest.propTypes = {
  request: PropTypes.array,
  onFetch: PropTypes.func,
  hasRequests: PropTypes.bool,
  match: PropTypes.object
};
SingleRequest.defaultProps = {
  request: [],
  hasRequests: false,
  onFetch: () => {},
  match:{},
};
const mapStateToProps = state => {
  return {
    request: state.fetchRequest.requests,
    hasRequests: state.fetchRequest.hasRequests
  };
};
export const mapDispatchToProps = dispatch =>{
  return {
    onFetch: (requestId) => dispatch(fetchRequest(requestId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleRequest);
