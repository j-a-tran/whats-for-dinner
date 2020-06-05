import axios from 'axios';

export const API_URL = "http://127.0.0.1:8000/api/";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/JSON',
        'accept': 'application/json'
    }
});