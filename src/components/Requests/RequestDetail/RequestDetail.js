import React from 'react';
import { Button } from 'reactstrap';
const request = (props) => {
  const { ...prop } = props;
  return (
    <div className="reaction_list">
      <div className="reaction_body">
        <div>
          <span>
            Status: <strong>{prop.status}</strong><br/>
            Description: <strong>{prop.description}</strong><br/>
            Date Published: <strong>{prop.create_date}</strong><br/>
            <Button color="danger">Delete</Button>&nbsp;&nbsp;
            <Button color="warning">Edit</Button>
          </span>
        </div>
      </div>
    </div>
  );
};
export default request;
