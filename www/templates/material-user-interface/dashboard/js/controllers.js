// Controller of dashboard.
appControllers.controller('dashboardCtrl', function ($scope, $timeout, $state,$stateParams, $ionicHistory) {
  

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


    $scope.isAnimated =  $stateParams.isAnimated;

    // navigateTo is for navigate to other page 
    // by using targetPage to be the destination state. 
    // Parameter :  
    // stateNames = target state to go.
    $scope.navigateTo = function (stateName) {
        $timeout(function () {
            if ($ionicHistory.currentStateName() != stateName) {
                $ionicHistory.nextViewOptions({
                    disableAnimate: false,
                    disableBack: true
                });
                $state.go(stateName);
            }
        }, ($scope.isAnimated  ? 300 : 0));
    }; // End of navigateTo.

    // goToSetting is for navigate to Dashboard Setting page
    $scope.options = {
        loop: false,
        effect: 'fade',
        speed: 500,
    }

    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
        // data.slider is the instance of Swiper
        $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
        console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
        // note: the indexes are 0-based
        $scope.activeIndex = data.slider.activeIndex;
        $scope.previousIndex = data.slider.previousIndex;
    });


    ///////////// for menu conroller










}); // End of dashboard controller.

// Controller of Dashboard Setting.
