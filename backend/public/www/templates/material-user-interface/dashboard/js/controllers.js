// Controller of dashboard.
appControllers.controller('dashboardCtrl', function ($scope, $timeout, $state, $stateParams, $ionicHistory) {

    $({ someValue: 0 }).animate({ someValue: Math.floor(Math.random() * 3000) }, {
        duration: 3000,
        easing: 'swing', // can be anything
        step: function () { // called on every step
            // Update the element's text with rounded-up value:
            $('.count').text(commaSeparateNumber(Math.round(this.someValue)));
        }
    });

    function commaSeparateNumber(val) {
        while (/(d+)(d{3})/.test(val.toString())) {
            val = val.toString().replace(/(d)(?=(ddd)+(?!d))/g, "$1,");
        }
        return val;
    }



    $scope.isAnimated = $stateParams.isAnimated;

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
        }, ($scope.isAnimated ? 300 : 0));
    }; // End of navigateTo.









}); // End of dashboard controller.

// Controller of Dashboard Setting.
