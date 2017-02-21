angular.module('starter.getall', [])

.factory('Getall', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';
    return {
        getgallary: function () {

            return $http.get(apiUrl + 'client-gallary').then(function (response) {
                return response.data;
            })
        },
        getoffer: function () {

            return $http.get(apiUrl + 'client-offer').then(function (response) {
                return response.data;
            })
        },
        getourteam: function () {

            return $http.get(apiUrl + 'client-ourteam').then(function (response) {
                return response.data;
            })
        },
        getinsurence: function () {
            return $http.get(apiUrl + 'client-insurence').then(function (response) {
                return response.data;
            })
        },
        getuserdashboard: function () {
            return $http.get(apiUrl + 'client-dashboard').then(function (response) {
                return response.data;
            })
        },
        getuserid: function (SocialId, loginway) {
            var url = apiUrl + 'user-id/' + SocialId + '/' + loginway;
            return $http.get(url).then(function (response) {
                return response.data;
            })
        },
        getclientask: function (id) {
            return $http.get(apiUrl + 'client-askdoc/'+ id).then(function (response) {
                return response.data;
            })
        },


    }


});