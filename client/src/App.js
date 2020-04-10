import React from 'react';
import './App.module.scss';
import TodoList from "./containers/TodoList/TodoList";
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { initKeycloak } from './services/AuthService'


const App = () => {
  
  initKeycloak();
  
  return (
      <Router>
        <Switch>
          <PrivateRoute path="/lists">
            <TodoList/>
          </PrivateRoute>
          <Route path={["/", "/login"]}>
            <Login/>
          </Route>
        </Switch>
      </Router>
  );
};

export default App;
