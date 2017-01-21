appControllers.controller('adminCtrl', function ($scope, $state, $stateParams, Admin) {
    if ($stateParams.back) {
        get();
        function get() {
            Admin.get().then(function (admins) {
                $scope.admin = admins.data;

            });
        }
    }
    get();

    function get() {
        Admin.get().then(function (admins) {
            $scope.admin = admins.data;

        });
    }




    $scope.remove = function (id) {
        $scope.appeared = 'true';
        Admin.remove(id).then(function () {
            get();
            $scope.appeared = '';
        });
    };



});



appControllers.controller('add-adminCtrl', function ($scope, $state, Admin, $mdDialog) {



    $scope.navigateTo = function () {
        $state.go('app.admin', {
            back: 'sucess'
        });
    };



    $scope.data = {

        email: '',
        password: ''


    }

    $scope.save = function ($event) {
        if ($scope.data.email.length != 0 && $scope.data.password.length != 0) {
            Admin.create($scope.data).then(function () {
                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'confirm-dialog.html',
                    targetEvent: $event,
                    locals: {
                        displayOption: {
                            title: "تم  حفظ البيانات",
                            content: "تم   حفظ  المتحكم",
                            cancel: "انهاء"
                        }
                    },
                    fontfamily: 'Neo Sans Arabic'
                })

                $scope.data = {

                    email: '',
                    password: ''


                }
            });
        }
        else {
            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'confirm-dialog.html',
                targetEvent: $event,
                locals: {
                    displayOption: {
                        title: "حدث خطأ فى البيانات",
                        content: "يرجى  تعبئه كامل النموذج",
                        cancel: "انهاء"
                    }
                },
                fontfamily: 'Neo Sans Arabic'
            })
        }



    }
});
