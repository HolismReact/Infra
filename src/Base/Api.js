import axios from "axios"
import KeycloakClient from "../Accounts/KeycloakClient";
import Holism from "./Holism";

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

axiosApi.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  config.headers['X-Client'] = 'React';
  config.headers.Authorization = `Bearer ${KeycloakClient.keycloak.token}`;
  return config;
});

axiosApi.interceptors.response.use(
  response =>
    response
  ,
  error => {
    if (error.response === undefined && error.message) {
      Holism.error(error.toString());
      return;
    }
    if (error.response && error.response.status === 401) {
      var url = new URL(KeycloakClient.keycloak.createLogoutUrl());
      url.search = KeycloakClient.keycloak.createLoginUrl();
      window.newUrl = url;
      KeycloakClient.checkLogin();
      return;
    }
    if (error.response && error.response.status === 403) {
      Holism.error('you are logged in, but you do not have access to this section');
      // todo: redirect user to "403" page.
      return;
    }
    if (error.response.status === 400 || error.response.status === 500) {
      var messages = '';
      var data = error.response.data;
      if (typeof data !== "string") {
        for (var item in error.response.data) {
          if (Array.isArray(data[item])) {
            for (var i = 0; i < data[item].length; i++) {
              messages += data[item][i] + "\n";
            }
          }
          else if (typeof data[item] === 'object') {
            console.log(data[item]);
          }
          else {
            messages += data[item] + "\n";
          }
        }
      }
      else {
        messages = data;
      }
      if (messages.indexOf('IDX10223') > -1) {
        KeycloakClient.checkLogin();
        return;
        //KeycloakClient.keycloak.updateToken();
      }
      console.log(messages);
      throw new Error(messages);
    }
  }
)

export async function get(url) {
  return await
    axiosApi.get(url, {
      crossDomain: true
    }).then(response => {
      return response?.data;
    })
}

export async function post(url, data) {
  return await axiosApi
    .post(url, { ...data })
    .then(response => response?.data);
}