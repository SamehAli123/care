angular.module('starter.postall', [])
.factory('Postall', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';
    return {
        createsuggestion: function (suggestion) {
            return $http.post(apiUrl + 'client-suggestion', suggestion).then(function (response) {
                return response.data;
            });
        },
        createuser: function (user) {
            return $http.post(apiUrl + 'user', user).then(function (response) {
                return response.data;
            });
        },
        askdoc: function (ques) {
        return $http.post(apiUrl + 'askdoc', ques).then(function (response) {
            return response.data;
        });
        },
        booking: function (book) {
            return $http.post(apiUrl + 'booking', book).then(function (response) {
                return response.data;
            });
        }
    }
});