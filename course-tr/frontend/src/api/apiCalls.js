import axios from 'axios';

export const signUp = (body) => {
    return axios.post('/api/1.0/users/', body);
}

export const login = creds => {
    return axios.post('/api/1.0/auth/', creds);
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const getUsers = (page=0, size=3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}