import React from 'react';
import { NavLink } from 'react-router-dom';
import { ManageRequest } from '../ManageRequests/ManageRequests';
const request = (props) => {
  const { ...prop } = props;
  let character;
  switch(prop.status) {
  case 'pending':
    prop.status = 'rejected';
    character = 'U';
    break;
  case 'approved':
    prop.status = 'approved';
    character = 'A';
    break;
  case 'resolved':
    prop.status = 'resolved';
    character = 'R';
    break;
  case 'disapproved':
    prop.status = 'resolved';
    character = 'D';
    break;
  default:
    break;
  }
  return (
    <div className="row reaction_list">
      <NavLink to={`requests/${prop.id}`}>       
        <span className={`_r  ${prop.status}`}>{character}</span>
      </NavLink>
      <div className="reaction_body">
        <div style={{ padding:'10px', lineHeight: '1.58'}}>
          <span>
            {prop.title}
            <small className="float-right">{prop.type}</small>
          </span>
          <NavLink to={`requests/${prop.id}`}>view request</NavLink>
        </div>
      </div>
      <br/>
      {
        prop.is_admin === 'true' ?
          <ManageRequest requestId={prop.id}/>
          :
          ''
      }
    </div>
  );
};
export default request;
