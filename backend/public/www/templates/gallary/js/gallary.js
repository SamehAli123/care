angular.module('starter.gallary', [])

.factory('Gallary', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';

    return {
        create: function (url) {
            return $http.post(apiUrl + 'gallary', url).then(function (response) {
                return response.data;
            });

        },
        get: function () {

            return $http.get(apiUrl + 'gallary').then(function (response) {
                return response.data;
            })
        },
        remove: function (id) {
            return $http.delete(apiUrl + 'gallary/' + id);
        }   
    }   
    
    });