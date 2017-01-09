
appControllers.controller('loginCtrl', function ($scope, $state, User, $mdDialog) {
    $scope.showConfirmDialogempty = function ($event) {
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






    $scope.showConfirmDialog = function ($event) {
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "خطأ فى ادخال البيانات",
                    content: "ادخل  ايميل  وباسورد  صحيحيين",
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

        if ($scope.credentials.email.length != 0 && $scope.credentials.password.length != 0) {


         User.login($scope.credentials)
        .then(function () {
            $state.go('app.dashboard');
           

        }, function () {
            console.log($state.current.name)
        })

     
       
        }
        else {
            $scope.showConfirmDialogempty();
        }



    }
});
