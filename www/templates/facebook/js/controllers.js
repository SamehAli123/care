//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('facebookCtrl', function ($scope, $http) {
    get();
    function makeHttpRequest() {
        try {
            return new XMLHttpRequest();

        }
        catch (error) {

        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");

        } catch (error) {

        }
        try {
            return new ActiveXObject("Microsoft.XMLHTTP")

        } catch (error) {

        }
        throw new Error("no request")
    }
    function get() {
        var appID = "1257305947664713";
        var appSecret = "a3be2b4f7b1c146bb98fba5ed07dcda0";

        var accessTokenRq = makeHttpRequest();
        var httpString = 'https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id=' + appID + '&client_secret=' + appSecret;
        accessTokenRq.open("GET", httpString, true);
        accessTokenRq.send(null);
        var access_token;
        access_token = accessTokenRq.responseText;
        $http.get('https://graph.facebook.com/v2.8/349904815136979/feed?access_token=1257305947664713|wey--uLw9agY9ceePw9WSmAgQkE&fields=id,message,picture,icon,likes.summary(true),comments.summary(true),created_time,from,object_id&limit=10)').then(function (response) {
            $scope.data = response.data;

           
        })
    }
});