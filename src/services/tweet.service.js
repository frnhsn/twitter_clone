import axios from 'axios';
import AuthService from "./auth.service.js";

const API_URL = 'http://localhost:8000/api/';

class TweetService {
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

    static async getFeeds() {
        return axios({
            method: 'get',
            url: API_URL + 'feeds/',
            headers: this.getHeaders()
        }).then(response => {
            return {
                error: false,
                message: "Success",
                status: response.status,
                data: response.data
            }
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (error.response.status === 404) return {
                error: true, 
                message: "Tweet not found", 
                status: error.response.status,
                data: null
            }
            return {
                error: true, 
                message: "Failed to fetch tweet",
                status: error.response.status,
                data: null
            }
        })
    }

    static async getTweeet(id) {
        return axios({
            method: 'get',
            url: API_URL + 'tweet/' + id,
            headers: this.getHeaders()
        }).then(response => {
            return {
                error: false,
                message: "Success",
                status: response.status,
                data: response.data
            }
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (error.response.status === 404) return {
                error: true, 
                message: "Tweet not found", 
                status: error.response.status,
                data: null
            }
            return {
                error: true, 
                message: "Failed to fetch tweet",
                status: error.response.status,
                data: null
            }
        })
    }

    static async newTweet(content = '', image = null) {
        return axios({
            method: 'post',
            url: API_URL + 'tweets/',
            headers: this.getHeaders(),
            data: { content, image } 
        }).then(response => {
            return {
                error: false,
                message: "Success",
                status: response.status,
                data: response.data
            }
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            }
            else if (error.response.status === 400 ) {
                return {
                    error: true, 
                    message: Object.values(error.response.data).join('. '), 
                    status: error.response.status,
                    data: null
                }
            }
            return {
                error: true, 
                message: "Failed to post new tweet",
                status: error.response.status,
                data: null
            }
        })
    }

    static async likeTweet(id) {
        return axios({
            method: 'post',
            url: API_URL + 'tweet/' + id + '/like/',
            headers: this.getHeaders()
        }).then(response => {
            return {
                error: false,
                message: "Success",
                status: response.status,
                data: response.data
            }
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (error.response.status === 404 ) return {
                error: true, 
                message: Object.values(error.response.data).join('. '), 
                status: error.response.status,
                data: null
            }
            return {
                error: true, 
                message: "Failed to like tweet",
                status: error.response.status,
                data: null
            }
        })
    }

    static async unlikeTweet(id) {
        return axios({
            method: 'post',
            url: API_URL + 'tweet/' + id + '/unlike/',
            headers: this.getHeaders()
        }).then(response => {
            return {
                error: false,
                message: "Success",
                status: response.status,
                data: response.data
            }
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (error.response.status === 404 ) return {
                error: true, 
                message: Object.values(error.response.data).join('. '), 
                status: error.response.status,
                data: null
            }
            return {
                error: true, 
                message: "Failed to unlike tweet",
                status: error.response.status,
                data: null
            }
        })
    }

    static async retweet(id) {
        return axios({
            method: 'post',
            url: API_URL + 'tweet/' + id + '/retweet/',
            headers: this.getHeaders()
        }).then(response => {
            return {
                error: false,
                message: "Success",
                status: response.status,
                data: response.data
            }
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (Math.round(error.response.status/100) === 4) return {
                error: true, 
                message: Object.values(error.response.data).join('. '), 
                status: error.response.status,
                data: null
            }
            return {
                error: true, 
                message: "Failed to perfom retweet",
                status: error.response.status,
                data: null
            }
        })
    }

    static async removeTweet(id) {
        return axios({
            method: 'delete',
            url: API_URL + 'tweet/' + id,
            headers: this.getHeaders()
        }).then(response => {
            return {
                error: false,
                message: "Success",
                status: response.status,
                data: response.data
            }
        }).catch(error => {
            if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (error.response.status === 401) {
                AuthService.logout();
                window.location.reload();
            } else if (Math.round(error.response.status/100) === 4) return {
                error: true, 
                message: Object.values(error.response.data).join('. '), 
                status: error.response.status,
                data: null
            }
            return {
                error: true, 
                message: "Failed to remove tweet",
                status: error.response.status,
                data: null
            }
        })
    }
}

export default TweetService;