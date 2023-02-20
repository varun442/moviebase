import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Container from "./layouts/Container";
import AppProvider from "./context/movieContext";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Container>
          <App />
        </Container>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
