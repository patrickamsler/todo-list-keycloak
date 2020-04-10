import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import styles from './Login.module.scss';
import { useKeycloak } from "@react-keycloak/web";

const Login = () => {
  const [ keycloak ] = useKeycloak();
  
  const login = () => {
    keycloak.login({
      redirectUri: process.env.REACT_APP_REDIRECT_URI
    })
  };
  
  return (
      <Segment placeholder className={styles.login}>
        <Header icon>
          <Icon name='clipboard list'/>
          Todo List App
        </Header>
        <Button primary onClick={login}>Login</Button>
      </Segment>
  );
};

export default Login;
