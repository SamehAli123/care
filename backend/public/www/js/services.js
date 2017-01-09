angular.module('starter.user', [])
.factory('User', function ($http, $state) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';
    var status = false;
    return {
        login: function (credentials) {
            return $http.post(apiUrl + 'authenticate', credentials)
            .then(function (response) {
                var Token = response.data.token;
                $http.defaults.headers.common['authentication'] = Token;
                $state.go('app.dashboard');

                loggedIn = true;
            }, function (reason) {
            }, function (update) {
            }
            );
        },
        isLoggedIn: function () {
            return status;
        }
    }
});
