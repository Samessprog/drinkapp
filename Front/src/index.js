import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './JS/App';
import style from './Style/CSS/main.css'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  
);


