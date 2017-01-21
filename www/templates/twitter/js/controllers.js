//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('twitterCtrl', function ($scope, $ionicPlatform, $twitterApi, $cordovaOauth) {


    $scope.showHomeTimeline = function () {
        $twitterApi.getHomeTimeline().then(function (data) {
            $scope.home_timeline = data;
        });
    };

    $scope.submitTweet = function () {
        $twitterApi.postStatusUpdate($scope.tweet.message).then(function (result) {
            $scope.showHomeTimeline();
        });
    }

    $scope.doRefresh = function () {
        $scope.showHomeTimeline();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.correctTimestring = function (string) {
        return new Date(Date.parse(string));
    };

    setTimeout(function () {
        var twitterKey = "STORAGE.TWITTER.KEY";
        var clientId = 'rsO1OLCoOxTVsYNjv5UQCQvvi';
        var clientSecret = 'NdREin4JKzMWyRcg7YEmFvqbcF00kzOyJXBZwWEIt1ITtY2Kbq';
        var myToken = '';

        $scope.tweet = {};


        $ionicPlatform.ready(function () {
            myToken = JSON.parse(window.localStorage.getItem(twitterKey));
            if (myToken === '' || myToken === null) {
                $cordovaOauth.twitter(clientId, clientSecret).then(function (succ) {
                    myToken = succ;
                    window.localStorage.setItem(twitterKey, JSON.stringify(succ));
                    $twitterApi.configure(clientId, clientSecret, succ);
                    $scope.showHomeTimeline();
                }, function (error) {
                    console.log(error);
                });
            } else {
                $twitterApi.configure(clientId, clientSecret, myToken);
                $scope.showHomeTimeline();
            }
        });
    }, 3000)

}); // End of dashboard controller.

// Controller of Dashboard Setting.
