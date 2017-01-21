angular.module('starter.ourteam', [])

.factory('Ourteam', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';

    return {
        create: function (member) {
            
            return $http.post(apiUrl + 'ourteam', member).then(function (response) {
                return response.data;
            });

        },
        get: function () {

            return $http.get(apiUrl + 'ourteam').then(function (response) {
                return response.data;
            })
        },
        remove: function (id) {
            return $http.delete(apiUrl + 'ourteam/' + id);
        }
    }

});