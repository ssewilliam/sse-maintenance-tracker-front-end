import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "./containers/Home/Home";
import Login from "./containers/Login/Login";
import Navbar from "./components/Navbar/Navbar";

export const Routes = () => {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
  );
};
export default Routes;