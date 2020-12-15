import axios from 'axios';

export const signUp = (body) => {
    return axios.post('/api/1.0/users', body);
}

export const login = creds => {
    console.log("creds objct is ", creds);
    return axios.post('/api/1.0/auth', {}, { auth: { ...creds } });
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const getUsers = (page=0, size=3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({ username, password }) => {
    const authHeaderValue = `Basic ${btoa(username + ':' + password )}`
    console.log('authHeaderValue',authHeaderValue);
    axios.defaults.headers['Authorization'] = authHeaderValue;
}

export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
}