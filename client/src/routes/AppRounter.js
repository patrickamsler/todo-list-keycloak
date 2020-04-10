import React from 'react';
import TodoList from "../containers/TodoList/TodoList";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "../components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import { useKeycloak } from "@react-keycloak/web";

const AppRouter = () => {
  const [, initialized] = useKeycloak();
  
  if (!initialized) {
    return <div>Loading...</div>
  }
  
  return (
      <Router>
        <Switch>
          <PrivateRoute path="/lists">
            <TodoList/>
          </PrivateRoute>
          <Route path={"/login"}>
            <Login/>
          </Route>
          <Route>
            <Redirect to='/lists'/>;
          </Route>
        </Switch>
      </Router>
  )
};

export default AppRouter;
