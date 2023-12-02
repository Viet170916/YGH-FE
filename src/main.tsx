import { LoadScript } from "@react-google-maps/api";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App/App.tsx';
import './index.scss';
// import Accommodation from "./Components/App/AccomInfoForAPost/AccomInfoForAPost";
ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
  // <React.StrictMode>
  <BrowserRouter>
    <LoadScript
      id = "script-loader"
      googleMapsApiKey = { import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY }
      version = "weekly"
    >
      <App />
    </LoadScript>
  </BrowserRouter> as React.ReactNode,
  // </React.StrictMode>,
);
// ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement )
//         .render(<Accommodation/>);
