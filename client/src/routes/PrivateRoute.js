import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({children, ...rest}) => {
  
  const [ keycloak ] = useKeycloak();
  
  return (
      <Route
          {...rest}
          render={({location}) =>
              keycloak.authenticated ? (
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
