angular.module('starter.insurence', [])

.factory('Insurence', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';

    return {
        create: function (insurence) {

            return $http.post(apiUrl + 'insurence', insurence).then(function (response) {
                return response.data;
            });

        },
        get: function () {

            return $http.get(apiUrl + 'insurence').then(function (response) {
                return response.data;
            })
        },
        remove: function (id) {
            return $http.delete(apiUrl + 'insurence/' + id);
        }
    }

});