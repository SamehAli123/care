angular.module('starter.user', [])
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

    };

});