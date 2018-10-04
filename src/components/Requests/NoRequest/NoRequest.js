import React from 'react';
const noRequest = () => {
  return (
    <div id="reaction_list" className="reaction_list col-12">
      <div className="reaction_body">
        <div style={{ padding:'10px', lineHeight: '1.58'}}>
          <span>
            You have no requests.<br/><strong><a href="create_request.html">start creating</a></strong>
          </span>
        </div>
      </div>
    </div>
  );
};
export default noRequest;
