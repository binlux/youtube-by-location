var Fetch = require('whatwg-fetch');
var Promise = require('es6-promise').Promise; // supporting old browsers
var geoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?';
var API_KEY = require('./api-key');
var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?type=video&videoType=any&videoLiscense=any&order=date&part=snippet&locationRadius=10km&maxResults=50&key=' + API_KEY + '&location=';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

module.exports = {
    getCountries: function (adress) {
        //return fetch(rootURL + clientID + adress)
        return fetch(geoCodeURL + "key=" + API_KEY + "&address=" + adress)
            .then(checkStatus)
            .then(function (response) {
                return response.json()
            }).catch(function (error) {
                alert('request failed = ' + error)
            })
    },
    getVideos: function (location) {
        return fetch(youtubeURL + location)
            .then(checkStatus)
            .then(function (response) {
                return response.json()
            }).catch(function (error) {
                alert('request failed = ' + error)
            })
    },
    getYoutubePage: function (loca, pageToken) {
        return fetch(youtubeURL + loca + '&pageToken=' + pageToken)
            .then(checkStatus)
            .then(function (response) {
                return response.json()
            }).catch(function (error) {
                alert('request failed = ' + error)
            })
    }
};