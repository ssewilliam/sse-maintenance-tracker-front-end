import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../../CSS/style.css';

import { fetchRequest } from '../../../store/actions/fetchRequestAction';
import NoRequest from '../../../components/Requests/NoRequest/NoRequest';
import RequestDetail from '../../../components/Requests/RequestDetail/RequestDetail';

export class SingleRequest extends Component {
  componentDidMount(){
    const { onFetchOne, match } = this.props;
    onFetchOne(match.params.requestId);
  }

  render() {
    const {
      request, hasRequest
    } = this.props;
    return (
      <div className="container">
        <div className="bgwrap large-12">
        </div>
        <div className="col-">         
          <div className="row">
            {
              hasRequest === false ?
                <NoRequest/>
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
      </div>
    );
  }
}
SingleRequest.propTypes = {
  request: PropTypes.array,
  onFetchOne: PropTypes.func,
  hasRequest: PropTypes.bool,
  match: PropTypes.object
};
SingleRequest.defaultProps = {
  request: [],
  hasRequest: false,
  onFetchOne: () => {},
  match:{},
};
const mapStateToProps = state => {
  return {
    request: state.fetchRequest.request,
    hasRequest: state.fetchRequest.hasRequest
  };
};
export const mapDispatchToProps = dispatch =>{
  return {
    onFetchOne: (requestId) => dispatch(fetchRequest(requestId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleRequest);
