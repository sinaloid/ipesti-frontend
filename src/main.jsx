import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./services/context";
//import ReactGA from 'react-ga4';
//ReactGA.initialize("G-BB8B6R3F8P")

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </AppContextProvider>
);
