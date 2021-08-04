import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Panel/App';
import Holism from './Base/Holism';
import { BrowserRouter } from 'react-router-dom';
import KeycloakClient from './Accounts/KeycloakClient';

KeycloakClient.checkLogin();
window.KeycloakClient = KeycloakClient;

window.Holism = Holism;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);