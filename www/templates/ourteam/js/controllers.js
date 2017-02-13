//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('ourteamCtrl', function ($scope, Getall, $ionicSlideBoxDelegate, $mdBottomSheet) {


    get();
    function get() {
        Getall.getourteam().then(function (res) {
            $scope.images = res.data;
        })
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
        ///    $ionicSlideBoxDelegate.slide($scope.images.length - 1, 1);
        };
    }

    $scope.sharedProduct = function ($event, member) {
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-shared.html',
            controller: 'sharedSocialBottomSheetCtrl',
            targetEvent: $event,
            locals: {
                member: member
            }
        });
    };


}); // End of dashboard controller.

appControllers.controller('sharedSocialBottomSheetCtrl', function ($scope, $mdBottomSheet, $timeout, member, $mdToast, $cordovaSocialSharing) {



    $scope.sharedFacebook = function () {
        $cordovaSocialSharing
              .shareViaFacebook('مركز عنايه لجمال الاسنان', member.url, member.Name + ',' + member.Desc)
              .then(function (result) {
                  alert(sucess);
              }, function (err) {
                  alert(err);
              });
    }



    $scope.sharedTwitter = function () {
        $cordovaSocialSharing
              .shareViaTwitter('مركز عنايه لجمال الاسنان', member.url, member.Name + ',' + member.Desc)
              .then(function (result) {
                  alert(sucess);
              }, function (err) {
                  alert(err);
              });
    }
    $scope.sharedWhatts = function () {
        $cordovaSocialSharing
              .shareViaWhatsApp('مركز عنايه لجمال الاسنان', member.url, member.Name + ',' + member.Desc)
              .then(function (result) {
                  alert(sucess);
              }, function (err) {
                  alert(err);
              });
    }

    $scope.sharedMore = function () {
        $cordovaSocialSharing.share('مركز عنايه لجمال الاسنان', member.url, member.Name + ',' + member.Desc);

    }

});// End of share social bottom sheet controller.
