import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Panel/App';
import Holism from './Base/Holism';

window.Holism = Holism;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);