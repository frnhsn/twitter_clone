import axios from 'axios';
import AuthService from "./auth.service.js";

const USER = AuthService.getCurrentUser();
const API_URL = 'http://localhost:8000/api/';
const OPTIONS = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + (USER && USER.access_token || ''),
    },
} 

class TweetService {
    static async getFeeds() {
        return axios({
            method: 'get',
            url: API_URL + 'feeds/',
            headers: OPTIONS.headers
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
            headers: OPTIONS.headers
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
            headers: OPTIONS.headers,
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
            headers: OPTIONS.headers
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
            headers: OPTIONS.headers
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
            headers: OPTIONS.headers
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
            headers: OPTIONS.headers
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