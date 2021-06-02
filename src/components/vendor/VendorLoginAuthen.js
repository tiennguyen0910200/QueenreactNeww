import React, { Component } from "react";
import VendorLoginContainer from "./VendorLoginContainer";
import { withRouter } from "react-router-dom";
class VendorLoginAuthen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: props.location,
    };
  }
  render() {
    return (
      <div className="content">
        <VendorLoginContainer redirect={this.state.redirect} />
      </div>
    );
  }
}
export default withRouter(VendorLoginAuthen);
