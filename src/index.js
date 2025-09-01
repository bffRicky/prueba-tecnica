import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store } from "./shared/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
