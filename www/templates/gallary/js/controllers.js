
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
            photo: objectData
        });
    };




    $scope.initialForm = function () {
        // $scope.productList is the variable that store user product data.
        $scope.productList = [];

        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#product-list-loading-progress').show();
            }
            else {
                jQuery('#product-list-loading-progress').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#product-list-loading-progress').hide();
            jQuery('#product-list-content').fadeIn();
        }, 4000);// End loading progress.
    };

    $scope.photos = [];

    $scope.loadMore = function () {
        $timeout(function () {
            //get product list from json  at paht: www/app-data/product-list.json
            
              
            for (var image = 0; image < $scope.images.length; image++) {
                $scope.photos.push($scope.images[image]);
                    }
                 
               
        }, 2000);
    };// End loadMore.

    $scope.initialForm();









}); 

appControllers.controller('gallary-only-imgCtrl', function ($scope, $mdToast, $mdBottomSheet, $timeout, $stateParams) {

   
    $scope.initialForm = function () {
    
        $scope.img = $stateParams.photo;

    };

    $scope.initialForm();

});

