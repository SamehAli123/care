angular.module('starter.localstorge', [])

.factory('$localstorage', ['$window', function ($window) {
    return {
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
            
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}]);

