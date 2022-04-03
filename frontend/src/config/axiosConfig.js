import axios from 'axios';
import { client_credentials } from './config';

const axiosConfig = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4'
});

axiosConfig.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
axiosConfig.defaults.headers.post['Client-ID'] = `${client_credentials.clientId}`;
axiosConfig.defaults.headers.post['Accept'] = "application/json";
axiosConfig.defaults.headers.post['Access-Control-Allow-Origin'] = "*";

export default axiosConfig;