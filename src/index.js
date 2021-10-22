import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Panel from './Panel/Panel';
import app from './Base/App';
import { get } from './Base/Api';
import Push from './Base/Push';

const renderReact = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Panel />
        </MuiPickersUtilsProvider>
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
        app.setTranslations(data.Translations);
        app.setLocale(data.Locale);
        renderReact();
      }, error => {
        console.error(error);
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
