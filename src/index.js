import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Panel from './Panel/Panel';
import app from './Base/App';
import Push from './Base/Push';

window.app = app;

app.checkLogin(
  () => {
    app.configPusher();
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
);
