angular.module('starter.offer', [])

.factory('Offer', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';

    return {
        create: function (offer) {
            
            return $http.post(apiUrl + 'offer', offer).then(function (response) {
                return response.data;
            });

        },
        get: function () {

            return $http.get(apiUrl + 'offer').then(function (response) {
                return response.data;
            })
        },
        remove: function (id) {
            return $http.delete(apiUrl + 'offer/' + id);
        }
    }

});