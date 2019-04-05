import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use(requestConfig => {
  const token = localStorage.getItem("token");
  requestConfig.headers.authorization = token;
  return requestConfig;
});

/* Higher Order Component that renders a component path after testing the local storage for the authentication token.
  If the authentication token is not found in the localStorage the user will be redirected to the login page. This is used for all
  protected paths for dynamic routing and rendering of paths. 

                            ***Used as alternative to browserRouter Route in app.JS***
*/
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
