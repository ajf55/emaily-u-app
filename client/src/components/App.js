// 'import' can be used because of webpack on FE; BE has node.js which uses 'require' syntax
import React from 'react';
/* import helpers from the library
// browswerrouter is the brains of react-router
// route sets up a rule
they are react components*/
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

// Route Setup
const App =() => {
  return(
    <div>
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path = "/" component ={Landing} />
        <Route exact path = "/surveys" component ={Dashboard} />
        <Route path = "/surveys/new" component ={SurveyNew} />
      </div>
    </BrowserRouter>
    </div>
  );
};

// export newly reacted component
export default App;
