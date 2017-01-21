angular.module('starter.dash', [])
.factory('Dashboard', function ($http) {

    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';
    return {

        gettwitter: function () {

            return $http.get(apiUrl + 'user/' + 'twitter').then(function (response) {
                return response.data;
            })
        },
        getfacebook: function () {

            return $http.get(apiUrl + 'user/' + 'facebook').then(function (response) {
                return response.data;
            })
        },
        getgoogle: function () {

            return $http.get(apiUrl + 'user/' + 'google+').then(function (response) {
                return response.data;
            })
        },

        getteeth: function () {

            return $http.get(apiUrl + 'doc').then(function (response) {
                return response.data;
            })
        },

        getnotasked: function () {

            return $http.get(apiUrl + 'askdoc/false').then(function (response) {
                return response.data;
            })
        },
        getasked: function () {
            return $http.get(apiUrl + 'askdoc/true').then(function (response) {
                return response.data;
            })
        }



    };


});