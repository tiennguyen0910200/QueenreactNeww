import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";
// 3.1
let state_of_state = localStorage["vendorState"];
if (!state_of_state) {
  let vendorState = {
    isLoggedIn: false,
    vendor: {},
  };
  localStorage["vendorState"] = JSON.stringify(vendorState);
}
let state = localStorage["vendorState"];
let VendorState = JSON.parse(state);
// 3.2
const Auth = {
  isLoggedIn: VendorState.isLoggedIn,
  vendor: VendorState,
};
// 3.3
const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    path={path}
    {...rest}
    render={(props) =>
      Auth.isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/home//vendorLogin",
            state: {
              prevLocation: path,
              error: "You need to login first!",
            },
          }}
        />
      )
    }
  />
);
export default withRouter(PrivateRoute);
