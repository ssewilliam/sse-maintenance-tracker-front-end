import React from 'react';
import EditRequest from '../EditRequest/EditRequest';
const request = (props) => {
  const { ...prop } = props;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <div className="reaction_list">
      <div className="reaction_body">
        <div>
          <span>
            <strong>Status: </strong>{prop.status}<br/>
            <strong>Description: </strong>{prop.description}<br/>
            <strong>Date Published: </strong>{new Date(prop.create_date).toLocaleDateString('en-BR', options)}<br/>
          </span>
          <EditRequest {...props} />          
        </div>
      </div>
    </div>
  );
};
export default request;
