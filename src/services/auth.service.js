import axios from 'axios';
import jwt from 'jsonwebtoken';

const API_URL = 'http://127.0.0.1:8000/api/auth/';

export default class AuthService {
    static async login(username, password) {
        return axios.post(API_URL + 'jwt/create/', {
            username: username,
            password: password
        }).then(response => {
            console.log('asdfasdf',username)
            if (response.data.access) {
                let token = response.data.access;
                let decodedToken = jwt.decode(token);
                var result = {
                    id: decodedToken.user_id,
                    username: username,
                    token_exp: decodedToken.exp,
                    access_token: response.data.access,
                    refresh_token: response.data.refresh
                };
                localStorage.setItem('user', JSON.stringify(result));
                return result;
            } else {
                throw Error('Login failed.')
            }
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                if (error.response.status === 401) {
                    return {error: true, message: error.response.data.detail}
                } else {
                    throw Error(`Login failed with HTTP ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw Error(`Login failed HTTP request. ${error.request}`);
              } else {
                // Something happened in setting up the request that triggered an Error
                throw Error(`Login failed: ${error.message}`);
              }
              throw Error(`Login failed: ${error.config}`);
        })
    }

    static async register(username, email, first_name, last_name, password, re_password) {
        return axios.post(API_URL + 'users/', {
            username, email, first_name, last_name, password, re_password
        })
        .then(response => {
            if (response.status === 201) {
                return { data: response.data };
            } else {
                throw Error(`Register faild with HTTP ${response.status}: ${response.data}`);
            }
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 400) {
                    let data = error.response.data;
                    if (data.username) {
                        return { 
                            error: true, 
                            message: { field: 'username', value: data.username[0]},
                        }
                    }
                    else if (data.email) {
                        return { 
                            error: true, 
                            message: { field: 'email', value: data.email[0]},
                        }
                    }
                    else if (data.password) {
                        return { 
                            error: true, 
                            message: { field: 'password', value: data.password[0]},
                        }
                    }
                } else {
                    throw Error(`Register failed with HTTP ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw Error(`Register failed HTTP request ${error.request}`);
              } else {
                // Something happened in setting up the request that triggered an Error
                throw Error(`Register failed: ${error.message}`);
              }
              throw Error(`Register failed: ${error.config}`);
        })
    }

    static logout() {
        localStorage.removeItem('user');
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    static isAuthenticated() {
        let user = this.getCurrentUser();
        let dateNow = new Date();

        if (user && (dateNow.getTime()/1000) < user.token_exp) {
            return true;
        }
        
        this.logout();
        return false;
    }

};