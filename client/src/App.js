import React from 'react';
import './App.module.scss';
import 'semantic-ui-css/semantic.min.css';
import { KeycloakProvider } from '@react-keycloak/web'
import Keycloak from "keycloak-js";
import AppRouter from "./routes/AppRounter";


const App = () => {
  
  const config = {
    clientId: 'todo-list-client',
    realm: 'todo-list-realm',
    url: 'http://localhost:8080/auth/'
  };
  
  const initConfig = {
    onLoad: 'check-sso',
    promiseType: 'native',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
  };
  
  return (
      <KeycloakProvider
          keycloak={new Keycloak(config)}
          initConfig={initConfig}
      >
        <AppRouter/>
      </KeycloakProvider>
  );
};

export default App;
