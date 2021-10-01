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

window.KeycloakClient = KeycloakClient;
window.Holism = Holism;
window.app = app;
window.Pusher = Pusher;

const configPusher = () => {
  window.Pusher.logToConsole = true;

  var pusher = new window.Pusher('602dcc9d3bafa088057b', {
    cluster: 'us2'
  });
  window.pusher = pusher;
}

KeycloakClient.checkLogin(
  () => {
    configPusher();
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
