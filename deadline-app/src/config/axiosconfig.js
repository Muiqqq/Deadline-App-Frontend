import axios from 'axios';
// Heroku url:
// https://tamk-4a00ez62-3001-group11.herokuapp.com/api
const config = { baseURL: 'http://localhost:8080/api' };
const instance = axios.create(config);

export default instance;
