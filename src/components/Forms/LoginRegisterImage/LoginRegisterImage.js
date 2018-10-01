import React, { Component } from 'react';
import Logo from '../../../images/mt-logo.jpg';
class LoginRegisterImage extends Component {
  render (){
    const { loader } = this.props
    return(
      <div className="login_register_top">
        <div className={`${loader} login_register_logo`}>
          <img src={Logo} className="img_class" alt="maintenace tracker" />
        </div>
      </div>
    );
  }
}
export default LoginRegisterImage;