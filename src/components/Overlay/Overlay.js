import React from 'react';
import LoginRegisterImage from '../Forms/LoginRegisterImage/LoginRegisterImage';
const request = () => {
  return (
    <div className="overlay">
      <div className="wrapper">
        <LoginRegisterImage  loader={'loader'}/>
      </div>
    </div>
  );
};
export default request;
