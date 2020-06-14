import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

let refreshInProgress = false;
let queue = [];

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/JSON',
        'accept': 'application/json'
    }
});

const processQueue = (error, accessToken = null) => {
    queue.forEach(promise => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(accessToken);
        }
    })

    queue = [];
}

axiosInstance.interceptors.response.use(
    function (response) {
        //This triggers for anything where status code is within 2xx
        return response;
    }, function (error) {

        const originalRequest = error.config;

        if (error.response.status !== 401) {
            console.log(error.response);
            return Promise.reject(error);
        }

        if (originalRequest.url === (API_URL + 'token/refresh/')) {
            localStorage.clear();
            window.location.href = '/login';
            console.log(error.response);
            return Promise.reject(error);
        }

        if (!refreshInProgress) {

            originalRequest._retry = true;
            refreshInProgress = true;

            const refreshToken = localStorage.getItem('refresh_token');

            return new Promise((resolve, reject) => {

                axios.post(API_URL + 'token/refresh/', {
                    refresh: refreshToken
                })
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    axiosInstance.defaults.headers['Authorization'] = 'JWT ' + response.data.access;
                    originalRequest.headers['Authorization'] = 'JWT ' + response.data.access;

                    processQueue(null, response.data.access);

                    resolve(axiosInstance(originalRequest));
                })
                .catch((error) => {
                    processQueue(error, null);
                    reject(error);
                })
                .then(() => {
                    refreshInProgress = false
                })
            })

        } else {
            return new Promise(function(resolve, reject) {
                queue.push({resolve, reject})
            })
            .then(accessToken => {
                originalRequest.headers['Authorization'] = 'JWT ' + accessToken;
                return axiosInstance(originalRequest);
            })
            .catch(error => {
                return Promise.reject(error);
            })
        }
    }
);


export { API_URL, axiosInstance };