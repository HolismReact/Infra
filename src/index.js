import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Holism from './Base/Holism';
import { BrowserRouter } from 'react-router-dom';
import KeycloakClient from './Accounts/KeycloakClient';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Panel from './Panel/Panel';
import app from './Base/App';
import Push from './Base/Push';

window.KeycloakClient = KeycloakClient;
window.Holism = Holism;
window.app = app;
window.Pusher = Pusher;

KeycloakClient.checkLogin(
  () => {
    Push.configPusher();
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
