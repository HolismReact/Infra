import axios from "axios"
import app from "./App";
import Holism from "./Holism";

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

axiosApi.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  config.headers['X-Client'] = 'React';
  config.headers.Authorization = `Bearer ${app.token()}`;
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
      var url = new URL(app.createLogoutUrl());
      url.search = app.createLoginUrl();
      window.newUrl = url;
      app.checkLogin();
      return;
    }
    if (error.response && error.response.status === 403) {
      throw new Error('you are logged in, but you do not have access to this section');
      // todo: redirect user to "403" page.
    }
    if (error.response.status === 404) {
      throw new Error('404\nService does not exist');
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
        app.checkLogin();
        return;
        //app.updateToken();
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