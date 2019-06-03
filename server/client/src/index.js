import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createMySocketMiddleware } from "./middlewares/socketIO";

const store = createStore(
  reducers,
  {},
  applyMiddleware(
    reduxThunk,
    createMySocketMiddleware(
      window.location.origin + ":" + process.env.REACT_APP_PORT
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
