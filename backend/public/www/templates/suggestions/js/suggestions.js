angular.module('starter.suggestion', [])

.factory('Suggestion', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';

    return {
      
        get: function () {

            return $http.get(apiUrl + 'suggestion').then(function (response) {
                return response.data;
            })
        }
    }

});