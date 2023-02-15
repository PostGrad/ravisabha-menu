import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SampleForm from "./components/SampleForm";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <SampleForm />
  </React.StrictMode>
);
