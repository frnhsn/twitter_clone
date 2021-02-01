import axios from 'axios';
import AuthService from './auth.service.js';

const API_URL = 'https://twitterclone.fhasan.work/api/profile/';


export default class UserService {
    static getHeaders() {
        let user = AuthService.getCurrentUser();
        let headers = (user) ? { 
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + (user.access_token),
          } : {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
          }
        return headers;
    }

    static async getProfile(username) {
        return axios({
            method: 'get',
            url: API_URL + username + '/',
            headers: this.getHeaders()
        }).then(response => {
            if (response.status === 200) {
                return {
                    error: false,
                    message: null,
                    data: response.data
                };
            } else {
                throw Error('Failed to fetch data.')
            }
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                if (error.response.status === 404) {
                    return {error: true, message: error.response.data}
                } else {
                    throw Error(`Failed to fetch data with HTTP ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // Something happened in setting up the request that triggered an Error
                throw Error(`Failed to fetch data. ${error.request}`);
              } else {
                throw Error(`Failed to fetch data. ${error.config}`);
              }
        })
    };

    static async getTweets(username) {
        return axios({
            method: 'get',
            url: API_URL + username + '/tweets/',
            headers: this.getHeaders()
        }).then(response => {
            if (response.status === 200) {
                return {
                    error: false,
                    message: null,
                    data: response.data
                };
            } else {
                throw Error('Failed to fetch data.')
            }
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                if (error.response.status === 401) {
                    return {error: true, message: error.response.data.detail}
                } else {
                    throw Error(`Failed to fetch data with HTTP ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // Something happened in setting up the request that triggered an Error
                throw Error(`Failed to fetch data. ${error.request}`);
              } else {
                throw Error(`Failed to fetch data. ${error.config}`);
              }
        })
    };

    static async me() {
        return axios({
            method: 'get',
            url: API_URL + 'me/',
            headers: this.getHeaders()
        }).then(response => {
            if (response.status === 200) {
                return {
                    error: false,
                    message: null,
                    data: response.data
                };
            } else {
                throw Error('Failed to fetch data.')
            }
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                if (error.response.status === 401) {
                    return {error: true, message: error.response.data.detail}
                } else {
                    throw Error(`Failed to fetch data with HTTP ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // Something happened in setting up the request that triggered an Error
                throw Error(`Failed to fetch data. ${error.request}`);
              } else {
                throw Error(`Failed to fetch data. ${error.config}`);
              }
        })
    };

    static async updateProfile(first_name, last_name, bio, location) {
        let method = (first_name && last_name && bio && location && bio) ? 'put' : 'patch';
        
        return axios({
            method: method,
            url: API_URL + 'me/',
            headers: this.getHeaders(),
            data: {
                first_name,
                last_name,
                bio,
                location
            }
        }).then(response => {
            if (Math.round(response.status/100) === 2) {
                return {
                    error: false,
                    message: null,
                    data: response.data
                };
            } else {
                throw Error('Failed to update profile.')
            }
        })
        .catch(error => {
            if (error.response) {
                if (Math.round(error.response.status/100) === 4) {
                    return {error: true, message: error.response.data.detail}
                } else {
                    throw Error(`Failed to update profile ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // Something happened in setting up the request that triggered an Error
                throw Error(`Failed update profile. ${error.request}`);
              } else {
                throw Error(`Failed to update profile ${error.config}`);
              }
        })
    }

    static async whoToFollow() {
        return axios({
            method: 'get',
            url: API_URL + 'who-to-follow',
            headers: this.getHeaders()
        }).then(response => {
            if (Math.round(response.status/100) === 2) {
                return {
                    error: false,
                    message: null,
                    data: response.data
                };
            } else {
                throw Error(`Failed to fetch who to follow ${response.response.status}: ${response.response.data}`);
            }
        })
        .catch(error => {
            if (error.response) {
                if (Math.round(error.response.status/100) === 4) {
                    return {error: true, message: error.response.data.detail}
                } else {
                    throw Error(`Failed to fetch who to follow ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // Something happened in setting up the request that triggered an Error
                throw Error(`Failed to fetch who to follow ${error.request}`);
              } else {
                throw Error(`Failed to fetch who to follow ${error.config}`);
              }
        })
    }

    static async followProfile(username) {
        return axios({
            method: 'post',
            url: API_URL + username + '/follow/',
            headers: this.getHeaders(),
        }).then(response => {
            if (Math.round(response.status/100) === 2) {
                return {
                    error: false,
                    message: null,
                    data: response.data
                };
            } else {
                throw Error('Failed to follow profile.')
            }
        })
        .catch(error => {
            if (error.response) {
                if (Math.round(error.response.status/100) === 4) {
                    return {error: true, message: error.response.data.detail}
                } else {
                    throw Error(`Failed to follow profile ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // Something happened in setting up the request that triggered an Error
                throw Error(`Failed follow profile. ${error.request}`);
              } else {
                throw Error(`Failed to follow profile ${error.config}`);
              }
        })
    };

    static async unfollowProfile(username) {
        return axios({
            method: 'post',
            url: API_URL + username + '/unfollow/',
            headers: this.getHeaders(),
        }).then(response => {
            if (Math.round(response.status/100) === 2) {
                return {
                    error: false,
                    message: null,
                    data: response.data
                };
            } else {
                throw Error('Failed to unfollow profile.')
            }
        })
        .catch(error => {
            if (error.response) {
                if (Math.round(error.response.status/100) === 4) {
                    return {error: true, message: error.response.data.detail}
                } else {
                    throw Error(`Failed to unfollow profile ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // Something happened in setting up the request that triggered an Error
                throw Error(`Failed unfollow profile. ${error.request}`);
              } else {
                throw Error(`Failed to unfollow profile ${error.config}`);
              }
        })
    }

    static async following(username) {
        return axios({
            method: 'get',
            url: API_URL + username + '/following/',
            headers: this.getHeaders(),
        }).then(response => {
            if (Math.round(response.status/100) === 2) {
                return {
                    error: false,
                    message: null,
                    data: response.data
                };
            } else {
                throw Error('Failed to get following list')
            }
        })
        .catch(error => {
            if (error.response) {
                if (Math.round(error.response.status/100) === 4) {
                    return {error: true, message: error.response.data.detail}
                } else {
                    throw Error(`Failed to get following list ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // Something happened in setting up the request that triggered an Error
                throw Error(`Failed to get following list ${error.request}`);
              } else {
                throw Error(`Failed to get following list ${error.config}`);
              }
        })
    };

    static async followers(username) {
        return axios({
            method: 'get',
            url: API_URL + username + '/followers/',
            headers: this.getHeaders(),
        }).then(response => {
            if (Math.round(response.status/100) === 2) {
                return {
                    error: false,
                    message: null,
                    data: response.data
                };
            } else {
                throw Error('Failed to get followers list')
            }
        })
        .catch(error => {
            if (error.response) {
                if (Math.round(error.response.status/100) === 4) {
                    return {error: true, message: error.response.data.detail}
                } else {
                    throw Error(`Failed to get followers list ${error.response.status}: ${error.response.data}`);
                }
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // Something happened in setting up the request that triggered an Error
                throw Error(`Failed to get followers list ${error.request}`);
              } else {
                throw Error(`Failed to get followers list ${error.config}`);
              }
        })
    };
};