
appControllers.controller('offersCtrl', function ($scope, Getall, $ionicSlideBoxDelegate,$mdBottomSheet) {
    get();
    function get() {
        Getall.getoffer().then(function (res) {
            $scope.offers = res.data;
        })
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
          ///  $ionicSlideBoxDelegate.slide($scope.offers.length - 1, 1);
        };
    }
    $scope.sharedProduct = function ($event, offer) {
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-shared.html',
            controller: 'sharedSocialBottomSheetofferCtrl',
            targetEvent: $event,
            locals: {
                offer: offer
            }
        });
    };


});


appControllers.controller('sharedSocialBottomSheetofferCtrl', function ($scope, $mdBottomSheet, $timeout, offer, $mdToast, $cordovaSocialSharing) {

    var text = 'السعر قبل الحسم ' + offer.PriceBefore + 'السعر بعد الحسم' + offer.PriceAfter


    $scope.sharedFacebook = function () {
        $cordovaSocialSharing    
              .shareViaFacebook('مركز عنايه لجمال الاسنان', offer.url, offer.Name + ',' + offer.Details + ',' + text)
              .then(function (result) {
                  alert(sucess);
              }, function (err) {
                  alert(err);
              });
    }



    $scope.sharedTwitter = function () {
        $cordovaSocialSharing
              .shareViaTwitter('مركز عنايه لجمال الاسنان', offer.url, offer.Name + ',' + offer.Details + ',' + text)
              .then(function (result) {
                  alert(sucess);
              }, function (err) {
                  alert(err);
              });
    }
    $scope.sharedWhatts = function () {
        $cordovaSocialSharing
              .shareViaWhatsApp('مركز عنايه لجمال الاسنان', offer.url, offer.Name + ',' + offer.Details + ',' + text)
              .then(function (result) {
                  alert(sucess);
              }, function (err) {
                  alert(err);
              });
    }

    $scope.sharedMore = function () {
        $cordovaSocialSharing.share('مركز عنايه لجمال الاسنان', offer.url, offer.Name +','+ offer.Details +','+ text);

    }

});// End of share social bottom sheet controller.


