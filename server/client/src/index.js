import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createMySocketMiddleware } from "./middlewares/socketIO";

var socket_url = "http://localhost:5000";
if (process.env.NODE_ENV === "production") socket_url = "/";
const store = createStore(
  reducers,
  {},
  applyMiddleware(reduxThunk, createMySocketMiddleware(socket_url))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
