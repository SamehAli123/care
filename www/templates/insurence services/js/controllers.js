//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('insurenceCtrl', function ($scope, $state) {

    $scope.images = [
     {
         "img": "img/aldr3.jpg",
         "detail": "شركه الدرع ",
         "desc":"ندعم بكل الاقسام  بنسبه 50%"

     },
     {
         "img": "img/arabia-t3awnia.jpg",
         "detail": "شركه العربيه التعاونيه",
         "desc": "ندعم بكل الاقسام  بنسبه 50%"



     },
     {
         "img": "img/brog.jpg",
         "detail": "البروج",
         "desc": "ندعم بكل الاقسام  بنسبه 50%"



     },
     {
         "img": "img/elt3awnia.jpg",
         "detail": " الشركه التعاونيه",
         "desc": "ندعم بكل الاقسام  بنسبه 50%"


     },
     {
         "img": "img/malas.jpg",
         "detail": "شركه الملاس",
         "desc": "ندعم بكل الاقسام  بنسبه 50%"


     }, {
         "img": "img/rajhi.png",
         "detail": "شركه الراجحى",
         "desc": "ندعم بكل الاقسام  بنسبه 50%"



     }
    ]

    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData
        });
    };


}); 



appControllers.controller('insurence-detailsCtrl', function ($scope, $mdToast, $mdBottomSheet, $timeout, $stateParams) {


    $scope.initialForm = function () {

        $scope.img = $stateParams.photo;

    };

    $scope.initialForm();

});
