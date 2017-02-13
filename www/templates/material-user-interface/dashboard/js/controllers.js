// Controller of dashboard.
appControllers.controller('dashboardCtrl', function ($scope, $timeout, $state, $stateParams, $ionicHistory, $ionicSlideBoxDelegate, Getall) {

    get();
    function get() {
        Getall.getuserdashboard().then(function (res) {
            $scope.images = res.data;

        })
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
            //$ionicSlideBoxDelegate.slide($scope.images.length - 1, 1);
        };
    }


    //$scope.isAnimated = $stateParams.isAnimated;


    //$scope.navigateTo = function (stateName) {
    //    $timeout(function () {
    //        if ($ionicHistory.currentStateName() != stateName) {
    //            $ionicHistory.nextViewOptions({
    //                disableAnimate: false,
    //                disableBack: true
    //            });
    //            $state.go(stateName);
    //        }
    //    }, ($scope.isAnimated ? 300 : 0));
    //};
    //$scope.options = {
    //    loop: false,
    //    effect: 'fade',
    //    speed: 500,
    //}

    //$scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
    //    $scope.slider = data.slider;
    //});

    //$scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
    //    console.log('Slide change is beginning');
    //});

    //$scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
    //    // note: the indexes are 0-based
    //    $scope.activeIndex = data.slider.activeIndex;
    //    $scope.previousIndex = data.slider.previousIndex;
    //});


    /////////////// for menu conroller










}); // End of dashboard controller.

// Controller of Dashboard Setting.
