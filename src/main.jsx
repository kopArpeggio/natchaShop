import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-alice-carousel/lib/alice-carousel.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      // theme="light"
    />
    <CssBaseline />
    <App />
  </React.StrictMode>
);
