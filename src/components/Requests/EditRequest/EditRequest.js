import React from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
import Notification from 'react-notify-toast';
import AppUrls from '../../../AppUrls';
import notifyDone from '../../../Utilities';

export class EditRequest extends React.Component {
  constructor(props) {
    super(props);

    const {...prop} = this.props;
    this.state = {
      request: {
        title:prop.title,
        type:prop.type,
        description:prop.description,
      }
    };
  }

  eventHandler = event => {
    const {request , hasFocus } = this.state;
    this.setState({
      request: {...request, [event.target.name]: event.target.value},
      hasFocus: {...hasFocus, [event.target.name]: true}
    });
  }
  updateRequest(requestData, RequestId) {
    alert(requestData.request.title);
    return (
      axios
        .put(
          AppUrls.requests+'/'+RequestId,
          requestData.request, {
            headers: {
              'token': `${localStorage.getItem('token')}`,
            },
          },
        ).then(response => {
          notifyDone(response.data.message, 'success', 'green');
        })
    );
  }
  updateRequestEventHandler = event => {
    event.preventDefault();
    const {
      request
    } = this.state;

    const {...prop} = this.props;
    this.updateRequest({request}, prop.id);
  }
  render() {

    const {...prop} = this.props;
    return (
      <div>
        <form id="editRequest" className="form new_request" method="post"
          onSubmit={event => this.updateRequestEventHandler(event)} >
          <div className="form_group">
            <label htmlFor="title"></label>
            <input type="text" defaultValue={prop.title} required name="title" id="title" onChange={this.eventHandler} placeholder="Title of the request" />
          </div>
          <div className="form_group">
            <select name="type" defaultValue={prop.type} required onChange={this.eventHandler} id="type" className="form-control">
              <option value="">----- Choose a request type------</option>
              <option value="repair">Repair</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="form_group">
            <label htmlFor="description"></label>
            <textarea name="description" required id="description" onChange={this.eventHandler} cols="30" rows="10" placeholder="Brief description">{prop.description}</textarea>
          </div>
          <div id="feed" className="text-center" style={{fontSize:'16px', color:'red', fontWeight:'bold'}}></div>
          {
            prop.status === 'approved' ?
              <div className="form_group">
                <input type="submit" value="Update request" />
              </div>
              : 
              <Alert color="info">
                <strong>This Request is {prop.status}</strong>
              </Alert>
          }
          <Notification />
        </form>
      </div>
    );
  }
}

export default EditRequest;