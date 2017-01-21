appControllers.controller('quesCtrl', function ($scope, $stateParams, Dashboard) {
    $scope.questions = $stateParams.qes;
    if (!$scope.questions) {
        getasked();
        function getasked() {
            Dashboard.getasked().then(function (resulat) {
                $scope.questions = resulat.data;
            });
        };

    }

});