import React from "react";
import { Route, Switch } from "react-router-dom"
import Home from "./components/Home"
import Form from "./components/Form"

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/Pizza" component={Form}/>

    </Switch>
  );
};
export default App;
