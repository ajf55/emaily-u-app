import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
// temp to test dev
import axios from "axios";
window.axios = axios;
// end temp

// reducer
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// use JSX tags
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
