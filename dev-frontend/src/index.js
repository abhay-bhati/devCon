import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthProvider from "./store/auth";
import DevelopersProvider from "./store/developers";

ReactDOM.render(
  <DevelopersProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </DevelopersProvider>,
  document.getElementById("root")
);
