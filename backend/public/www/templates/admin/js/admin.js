angular.module('starter.admin', [])

.factory('Admin', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';

    return {
        create: function (member) {

            return $http.post(apiUrl + 'setup', member).then(function (response) {
                return response.data;
            });

        },
        get: function () {

            return $http.get(apiUrl + 'admin').then(function (response) {
                return response.data;
            })
        },
        remove: function (id) {
            return $http.delete(apiUrl + 'admin/' + id);
        }
    }

});