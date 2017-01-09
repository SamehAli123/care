
appControllers.controller('loginCtrl', function ($scope, $state, User, $mdDialog, $ionicPopup, $http) {
    $scope.showConfirmDialogempty = function ($event) {
        $scope.appear = '';

        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "خطأ فى ادخال البيانات",
                    content: "يرجى ادخال الايميل  والباسورد",
                    cancel: "انهاء",

                }
            },
            fontfamily: 'Neo Sans Arabic'
        })

    }






   



    $scope.credentials = {
        email: '',
        password: ''
    }

    $scope.login = function () {
        
        $scope.appear = 'true';
        if ($scope.credentials.email.length != 0 && $scope.credentials.password.length != 0) {


            User.login($scope.credentials)
               .then(function () {
                   $scope.appear = '';

               })
        }
        else {
            $scope.showConfirmDialogempty();
        }
    }
});
