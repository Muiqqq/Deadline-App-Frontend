import axios from 'axios';
// Heroku url:
// https://tamk-4a00ez62-3001-group11.herokuapp.com/api
const config = {
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://tamk-4a00ez62-3001-group11.herokuapp.com/api'
      : 'http://localhost:8080/api',
};
const instance = axios.create(config);

export default instance;
