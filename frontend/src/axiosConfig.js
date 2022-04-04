import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:3500'
});

axiosConfig.defaults.headers.post['Content-Type'] = "application/json";

export default axiosConfig;