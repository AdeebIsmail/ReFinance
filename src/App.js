import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import LoginHome from "./pages/loginhome";
import Categories from "./pages/categories";
import Transaction from "./pages/transaction";
import TransactionHistory from "./pages/transactionhistory";

import LoginHomeRoute from "./ProtectedRoutes/loginhomeroute";

import Navbar from "./components/navbarsetter.components";

import "bootstrap/dist/css/bootstrap.min.css";

function App(props) {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <LoginHomeRoute path="/loginhome" component={LoginHome} exact />
        <LoginHomeRoute path="/categories" component={Categories} exact />
        <LoginHomeRoute path="/transaction" component={Transaction} exact />
        <LoginHomeRoute
          path="/transactionhistory"
          component={TransactionHistory}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
