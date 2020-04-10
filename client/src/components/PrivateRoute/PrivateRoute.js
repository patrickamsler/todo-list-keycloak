import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from "../../services/AuthService";

const PrivateRoute = ({children, ...rest}) => {
  
  return (
      <Route
          {...rest}
          render={({location}) =>
              isAuthenticated() ? (
                  children
              ) : (
                  <Redirect
                      to={{
                        pathname: '/login',
                        state: {from: location}
                      }}
                  />
              )
          }
      />
  );
};

export default PrivateRoute;
