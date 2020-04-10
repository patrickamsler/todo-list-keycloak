import React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import styles from './Login.module.scss';
import { login } from "../../services/AuthService";

const Login = () => {
  
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
