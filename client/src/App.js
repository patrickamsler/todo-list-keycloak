import React from 'react';
import './App.module.scss';
import TodoList from "./containers/TodoList/TodoList";
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./containers/Login/Login";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/lists">
            <TodoList/>
          </Route>
          <Route path={["/", "/login"]}>
            <Login/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
