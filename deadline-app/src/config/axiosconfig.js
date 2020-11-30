import axios from 'axios';

const config = { baseURL: 'http://localhost:8080/api' };
const instance = axios.create(config);

export default instance;
