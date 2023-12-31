import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

// Styles
import "./main.css";

// Fonts
import "@fontsource/ibm-plex-sans/100.css";
import "@fontsource/ibm-plex-sans/200.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";

// Material Icons
import "@fontsource-variable/material-symbols-rounded";
import ToasterProvider from "./components/Context/ToasterContext.tsx";
import UserProvider from "./components/Context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ToasterProvider>
          <App />
        </ToasterProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
