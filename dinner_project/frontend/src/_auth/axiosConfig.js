import axios from 'axios';
import { Auth } from './Auth';

const API_URL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/JSON',
        'accept': 'application/json'
    }
});


axiosInstance.interceptors.response.use(
    function (response) {
        //This triggers for anything where status code is within 2xx
        return response;
    }, function (error) {

        const originalRequest = error.config;

        if (error.response.status !== 401) {
            return Promise.reject(error);
        }

        if (originalRequest.url == (API_URL + 'token/refresh/')) {
            localStorage.clear();
            window.location.href = '/login';
            console.log(error);
            return Promise.reject(error);
        }

        return axiosInstance.post(API_URL + 'token/refresh/', {
            refresh: localStorage.getItem('refresh_token')
        })
        .then(function (response) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
        
            axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access;
            originalRequest.headers['Authorization'] = 'JWT ' + response.data.access;
        
            return axiosInstance(originalRequest);
        })
        .catch(function (error) {
            localStorage.clear();
            window.location.href = '/login';
            console.log(error);
            return Promise.reject(error);
        }); 
    }
);


export { API_URL, axiosInstance};