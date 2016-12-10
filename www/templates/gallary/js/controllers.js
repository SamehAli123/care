
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

 

    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            product: objectData
        });
    };




    $scope.lastimages = [];


    $scope.loadMore = function () {
        $timeout(function () {

            for (var image = 0; image < $scope.images.length; image++) {
                $scope.lastimages.push($scope.images[image]);
                console.log(image);
            }

            $scope.$broadcast('scroll.infiniteScrollComplete');

        }, 2000);
    };




}); 

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

