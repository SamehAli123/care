//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('instagramCtrl', function ($scope, $state, $ionicHistory, $stateParams, $cordovaOauth, $http) {
    $scope.initialForm = function () {

        // $scope.paging is the variable that store page index of feed data.
        $scope.paging = {
            next: "",
            shouldLoadData: false
        };
        // $scope.userInfo is the variable for store user profile information.
        // It get data from localStorage service.


        // $scope.loading is the variable for loading progress.
        $scope.isLoading = false;

        // $scope.feedList  is the variable that store feed data.
        $scope.feedList = [];
    }// End initialForm.

    // getFeedData is for get feed by calling to instagram API.
    // Parameter :  
    // IsInit(bool) = for check that page are loading more data or refresh data.
    $scope.getFeedData = function (IsInit) {

        // Call http service with this api to get instagram feed data.
        // By send parameter access_token that get from instagram user profile from localStorage.
        $http.get("https://api.instagram.com/v1/users/self/feed", {
            params: {
                access_token: "3280942984.883bf94.d900627a693f489baf67d1014796298e"
            }
        })
            .then(function (result) {
                // Success retrieve data by calling http service.

                // store feed data to $scope.feedList variable to show in feed.
                $scope.feedList = result.data.data;

                // If it don't have data. Loading progress will stop and appear empty feed.
                if ($scope.feedList == []) {
                    $scope.paging.shouldLoadData = true;
                }
                // Checking for next page data
                if (result.data.pagination.next_url == null) {

                    $scope.paging.shouldLoadData = true;
                }
                else {
                    $scope.paging.next = result.data.pagination.next_url;
                }// End checking for next page data.

                // To stop loading progress.
                if (IsInit == true) {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } else {
                    $scope.$broadcast('scroll.refreshComplete');
                }

                $scope.isLoading = false;
            }
            , function (error) {
                // Error retrieve data it will log out.
                if (error.data.meta.code = 400) {
                    $scope.logout();
                }
            });
    };// End getFeedData.
   
       
    });
