import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import styles from './Login.module.scss';
import { useKeycloak, withKeycloak } from "@react-keycloak/web";

const Login = () => {
  const [ keycloak ] = useKeycloak();
  
  const login = () => {
    keycloak.login({
      redirectUri: 'http://localhost:3000/lists'
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

export default withKeycloak(Login)
