import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";

const pathname = window.location.pathname;
const pathSegments = pathname.split("/").filter((segment) => segment !== "");
const firstEndpoint = pathSegments[0];
if (firstEndpoint !== "login" && !localStorage.getItem("access_token")) {
  window.location.href = `${window.location.protocol}//${window.location.host}/login`;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
