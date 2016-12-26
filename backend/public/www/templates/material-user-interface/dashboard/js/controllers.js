// Controller of dashboard.
appControllers.controller('dashboardCtrl', function ($scope, $timeout, $state, $stateParams, $ionicHistory) {


    $scope.isAnimated = $stateParams.isAnimated;



    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData
        });
    };




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

}); 

