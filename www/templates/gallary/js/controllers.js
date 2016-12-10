
appControllers.controller('gallaryCtrl', function ($scope, $timeout, $state, $http) {


    $scope.images = [
   {
       "img": "img/icons/Logo.jpg"

   },
   {
       "img": "img/app_icon.png"

   },
   {
       "img": "img/bg_cover_01.png"


   },
   {
       "img": "img/contract_us_bg.jpg"

   },
   {
       "img": "img/slide_07.png"

   }, {
       "img": "img/slide_08.png"


   },
   {
       "img": "img/slide_03.png"

   },
   {
       "img": "img/slide_02.png"


   }
    ]

    $scope.initialForm = function () {
        // $scope.productList is the variable that store user product data.
        $scope.productList = [];

        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#product-detail-loading-progress').show();
            }
            else {
                jQuery('#product-detail-loading-progress').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#product-detail-loading-progress').hide();
            jQuery('#product-detail-content').fadeIn();
        }, 3000);
    };

    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            product: objectData
        });
    };// End navigateTo.

    // loadMore is for loadMore product list.

    $scope.initialForm();

}); // End of dashboard controller.

appControllers.controller('gallary-only-imgCtrl', function ($scope, $mdToast, $mdBottomSheet, $timeout, $stateParams) {


    $scope.initialForm = function () {

        $scope.image = $stateParams.product;

        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#product-detail-loading-progress').show();
            }
            else {
                jQuery('#product-detail-loading-progress').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#product-detail-loading-progress').hide();
            jQuery('#product-detail-content').fadeIn();
        }, 3000);
    };

    $scope.initialForm();

});

