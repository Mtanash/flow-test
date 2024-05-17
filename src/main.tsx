import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { Toaster } from "react-hot-toast";
import { ReactFlowProvider } from "reactflow";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
    <Toaster
      toastOptions={{
        duration: 5000,
      }}
    />
  </React.StrictMode>
);
