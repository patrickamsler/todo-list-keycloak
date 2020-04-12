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
    url: process.env.REACT_APP_AUTH_URL
  };
  
  const initConfig = {
    onLoad: 'check-sso',
    promiseType: 'native',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
    enableLogging: true
  };
  
  const onTokens = (tokens) => {
    console.log("tokens refresh");
    console.log(JSON.stringify(tokens, null, 4));
  };
  
  return (
      <KeycloakProvider
          keycloak={new Keycloak(config)}
          initConfig={initConfig}
          onTokens={onTokens}
      >
        <AppRouter/>
      </KeycloakProvider>
  );
};

export default App;
