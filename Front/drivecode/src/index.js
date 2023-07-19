// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./index.css";
import Auth from "./Auth/Index.js";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from ".././src/Redux/Store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Auth>
);
