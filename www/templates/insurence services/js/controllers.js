//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('insurenceCtrl', function ($scope, $state,Getall) {


    get();
    function get() {
        Getall.getinsurence().then(function (res) {
       
            $scope.images = res.data;

        });
    }

    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData
        });
    };
    $scope.doRefresh = function () {
        if ($scope.images.length > 0) {

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
            $scope.images = [];
        } else {
            get();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }
    };

}); 



appControllers.controller('insurence-detailsCtrl', function ($scope, $mdToast, $mdBottomSheet, $timeout, $stateParams) {


    $scope.initialForm = function () {

        $scope.image = $stateParams.photo;

    };

    $scope.initialForm();

});
