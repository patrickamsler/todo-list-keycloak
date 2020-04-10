import Keycloak from "keycloak-js";


const config = {
  clientId: 'todo-list-client',
  realm: 'todo-list-realm',
  url: 'http://localhost:8080/auth/'
};

const keycloak = Keycloak(config);

export const initKeycloak = () => {
  keycloak.init({
    onLoad: 'check-sso',
    promiseType: 'native',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
  }).then((authenticated) => {
    if (authenticated) {
      console.log("authenticated");
      // onAuthenticatedCallback();
    } else {
      console.log("not authenticated!");
      // login();
    }
  })
};

export const login = () => {
  keycloak.login({
    redirectUri: 'http://localhost:3000/lists'
  }).then(success =>
      console.log(success)
  )
};

export const logout = () => {

};

export const isAuthenticated = () => {
  return true;
};

export const getToken = () => keycloak.token;
