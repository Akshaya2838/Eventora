import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import GlobalStyles from './styles/GlobalStyles';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create root and render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);