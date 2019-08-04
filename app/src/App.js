import React, { Component } from "react";
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Drizzle, generateStore } from "drizzle";

import "uikit/dist/css/uikit.min.css";
import "uikit/dist/css/uikit-rtl.css";
import "uikit/dist/js/uikit-core";
import "uikit/dist/js/uikit-icons";
import "uikit/dist/js/uikit";
import "./App.css";

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Form from "./Form";
import StoreDetail from "./StoreDetail";
import Admin from "./Containers/Admin";
import Donate from "./Containers/Donate";
import Stores from "./Stores";
import AddStore from "./Containers/AddStore";

const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

console.log({ drizzle, drizzleStore });

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions} drizzle={drizzle}>
        <LoadingContainer>
          <Router>
            <MyContainer drizzle={drizzle} drizzleState={drizzleStore}>
              <Route exact path="/" component={(props) => <Home {...props} drizzle={drizzle} drizzleState={drizzleStore} />} />
              <Route exact path="/dashboard" component={(props) => <Dashboard {...props} drizzle={drizzle} drizzleState={drizzleStore} />} />
              <Route exact path="/about" component={(props) => <Form {...props} drizzle={drizzle} drizzleState={drizzleStore} />} />
              <Route exact path="/register" component={(props) => <Form {...props} drizzle={drizzle} drizzleState={drizzleStore} />} />
              <Route exact path="/admin" component={(props) => <Admin {...props} drizzle={drizzle} drizzleState={drizzleStore} />} />
              <Route exact path="/donate" component={(props) => <Donate {...props} drizzle={drizzle} drizzleState={drizzleStore} />} />
              <Route exact path="/stores" component={(props) => <Stores {...props} drizzle={drizzle} drizzleState={drizzleStore} />} />
              <Route exact path="/store/:id" component={(props) => <StoreDetail {...props} drizzle={drizzle} drizzleState={drizzleStore} />} />
              <Route exact path="/create-store" component={(props) => <AddStore {...props} drizzle={drizzle} drizzleState={drizzleStore} />} />
            </MyContainer>
          </Router>
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
