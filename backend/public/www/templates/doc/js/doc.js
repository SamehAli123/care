angular.module('starter.doc', [])

.factory('Doc', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';

    return {
        create: function (member) {

            return $http.post(apiUrl + 'doc', member).then(function (response) {
                return response.data;
            });

        },
        get: function () {

            return $http.get(apiUrl + 'doc').then(function (response) {
                return response.data;
            })
        },
        remove: function (id) {
            return $http.delete(apiUrl + 'doc/' + id);
        }
    }

});