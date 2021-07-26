import axios from "axios"

const axiosApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

axiosApi.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Accept'] = 'application/json';
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const accessToken = user['access_token'];
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  else {
    //location.href = ('/error-page');
    console.error('authUser is not defined in localStorage');
  }
  return config;
});

axiosApi.interceptors.response.use(
  response =>
    response
  ,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("authUser")
      //location.href = ("/error-page")
      console.error('we got unauthorized from API');
      return;
    }
    if (error.response.status === 400 || error.response.status === 500) {
      var messages = '';
      var data = error.response.data;
      for (var item in error.response.data) {
        if (Array.isArray(data[item])) {
          for (var i = 0; i < data[item].length; i++) {
            messages += data[item][i] + "<br />";
          }
        }
        else if (typeof data[item] === 'object') {
          console.log(data[item]);
        }
        else {
          messages += data[item] + "<br />";
        }
      }
      console.log(messages);
    }
    throw error.response.data;
  }
)

export async function get(url) {
  return await
    axiosApi.get(url).then(response => {
      return response.data;
    })
}

export async function post(url, data) {
  return await axiosApi
    .post(url, { ...data })
    .then(response => response.data);
}