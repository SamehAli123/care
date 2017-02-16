//var app = angular.module('starter', ['ionic']);
appControllers.controller('instagramCtrl', function ($scope, $http) {


    //Place your own Instagram client_id below. Go to https://instagram.com/developer/clients/manage/ and register your app to get a client ID
    var client_id = '883bf943cec14f559694e62003b6219b';

    //To get your user ID go to http://jelled.com/instagram/lookup-user-id and enter your Instagram user name to get your user ID
    var user_id = '3280942984';

    //https://www.instagram.com/oauth/authorize/?client_id=64a12cb0db7b41da8cd2a8736770c466&redirect_uri=http://127.0.0.1:8080/test&response_type=token
    var access_token = '3280942984.883bf94.d900627a693f489baf67d1014796298e';


    $scope.layout = 'grid';
    $scope.data = {};
    $scope.pics = [];




    var endpoint = 'https://api.instagram.com/v1/users/';
    endpoint += user_id;
    endpoint += '/media/recent/?';
    endpoint += '?count=99';
    endpoint += '&callback=JSON_CALLBACK';
    endpoint += '&access_token=' + access_token;
    $http.jsonp(endpoint)
    .success(function (response) {
        response.data;
        console.log(response.data);

        $scope.pics = response.data;


    })
    .error(function (xhr, status, err) {
        console.error(status, err);
    })




});