import React from 'react';
import { axiosInstance } from '../_auth/axiosConfig';

export const AuthContext = React.createContext({})

export default function Auth({ children }) {

    const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('refresh_token'));

    const login = (username, password) => {
        return axiosInstance.post('/token/obtain/', {
                username: username,
                password: password
            })
            .then(function (response) {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                setIsAuthenticated(true);
            })
    }

    const register = (username, password) => {

        return axiosInstance.post('/user/create/', {
            username: username,
            password: password
          });

    }

    const logout = () => {

        axiosInstance.post('/token/blacklist/', {
            refresh_token: localStorage.getItem('refresh_token')
          })
          .then(function (response) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            axiosInstance.defaults.headers['Authorization'] = null;

            setIsAuthenticated(false);

            return response;
          })
          .catch(function (error) {
            console.log(error.response);
            return error.response;
          });   
    }

    const getUsername = () => { 
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            return JSON.parse(atob(refreshToken.split('.')[1]))['username'];
        } catch (error) {
            return '';
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout, getUsername }}>
            {children}
        </AuthContext.Provider>
    );

}