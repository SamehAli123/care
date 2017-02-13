appControllers.controller('gallaryCtrl', function ($scope, $timeout, $state, $http, Getall, $mdBottomSheet) {
    get();
    function get() {
        Getall.getgallary().then(function (res) {
            $scope.images = res.data;
        });
    };
    $scope.sharedProduct = function ($event, image) {
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-shared.html',
            controller: 'sharedSocialBottomSheetgallaryCtrl',
            targetEvent: $event,
            locals: {
                image: image
            }
        });
    };

    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData
        });
    };
});
appControllers.controller('gallary-only-imgCtrl', function ($scope, $mdToast, $mdBottomSheet, $timeout, $stateParams) {


    $scope.initialForm = function () {

        $scope.img = $stateParams.photo;

    };

    $scope.initialForm();

});
appControllers.controller('sharedSocialBottomSheetgallaryCtrl', function ($scope, $mdBottomSheet, $timeout, image, $mdToast, $cordovaSocialSharing) {

    $scope.sharedFacebook = function () {
        $cordovaSocialSharing
              .shareViaFacebook('', image.url, '')
              .then(function (result) {
                  alert(sucess);
              }, function (err) {
                  alert(err);
              });
    }
    $scope.sharedTwitter = function () {
        $cordovaSocialSharing
              .shareViaTwitter('', image.url, '')
              .then(function (result) {
                  alert(sucess);
              }, function (err) {
                  alert(err);
              });
    }
    $scope.sharedWhatts = function () {
        $cordovaSocialSharing
              .shareViaWhatsApp('', image.url, '')
              .then(function (result) {
                  alert(sucess);
              }, function (err) {
                  alert(err);
              });
    }
    $scope.sharedMore = function () {
        $cordovaSocialSharing.share('', '', image.url, '');

    };

});
