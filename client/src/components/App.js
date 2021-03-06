// 'import' can be used because of webpack on FE; BE has node.js which uses 'require' syntax
import React, { Component } from "react";
/* import helpers from the library
// browswerrouter is the brains of react-router
// route sets up a rule
they are react components*/
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

// Route Setup
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  // react router
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// export newly reacted component
export default connect(
  null,
  actions
)(App);
