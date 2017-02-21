//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('instagramCtrl', function ($scope, $http) {


    //Place your own Instagram client_id below. Go to https://instagram.com/developer/clients/manage/ and register your app to get a client ID
    var client_id = 'e87b2d2c305844b2b2d0b2690d74a922';

    //To get your user ID go to http://jelled.com/instagram/lookup-user-id and enter your Instagram user name to get your user ID
    var user_id = '1294478126';

    //https://www.instagram.com/oauth/authorize/?client_id=64a12cb0db7b41da8cd2a8736770c466&redirect_uri=http://127.0.0.1:8080/test&response_type=token
    var access_token = '1294478126.e87b2d2.5407757c6bfa49628b1349fda40e83a7';


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

