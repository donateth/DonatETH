import React, { Component } from "react";
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "uikit/dist/css/uikit.min.css";
import 'uikit/dist/css/uikit-rtl.css';
import 'uikit/dist/js/uikit';
import "./App.css";

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";
import Store from "./Store";

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <Router>
            <Route exact path="/" component={MyContainer} />
            <Route exact path="/about" component={Store} />
          </Router>
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
