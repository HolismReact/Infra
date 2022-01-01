import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import AdapterJalali from '@date-io/date-fns-jalali';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { BrowserRouter } from 'react-router-dom';
import Panel from './Panel/Panel';
import app from './Base/App';
import { get } from './Base/Api';

const renderReact = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Panel />
        </LocalizationProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const render = () => {
  app.configPusher();
  if (process.env.REACT_APP_HAS_MULTIPLE_LOCALES) {
    get('/locale/data')
      .then(data => {
        app.setTranslations(data.translations);
        app.setLocale(data.locale);
        renderReact();
      }, error => {
        console.error(error);
        renderReact();
        alert(error);
      });
  }
  else {
    renderReact();
  }
}

window.app = app;

window.React1 = require('react');

if (process.env.REACT_APP_SECURITY === 'off') {
  render();
}
else {
  app.checkLogin(
    () => {
      render();
    }
  );
}
