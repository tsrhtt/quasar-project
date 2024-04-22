import axios from 'axios';
import { boot } from 'quasar/wrappers';

const api = axios.create({
  //baseURL: 'http://localhost:5008/weblab/',        //error w/ url for API
  baseURL: 'https://public.ehealth.by/lab-test/api/integration',  // for testing (no results, 401 Unauthorized)
  timeout: 1000,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
