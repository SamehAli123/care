//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('insurenceCtrl', function ($scope, $state,$ionicSlideBoxDelegate,Getall) {


    get();
    function get() {
        Getall.getinsurence().then(function (res) {
            $scope.images = res.data;
        })
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
            $ionicSlideBoxDelegate.slide($scope.images.length - 1, 1);
        };
    }

    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData
        });
    };


}); 



appControllers.controller('insurence-detailsCtrl', function ($scope, $mdToast, $mdBottomSheet, $timeout, $stateParams) {


    $scope.initialForm = function () {

        $scope.image = $stateParams.photo;

    };

    $scope.initialForm();

});
