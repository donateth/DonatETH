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
import Home from "./Home";
import Form from "./Form";

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <Router>
            <MyContainer>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={Form} />
              <Route exact path="/register" component={Form} />
            </MyContainer>
          </Router>
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
