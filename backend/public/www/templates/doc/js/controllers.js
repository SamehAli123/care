﻿appControllers.controller('docCtrl', function ($scope, $state, $stateParams, Dashboard,Doc) {
    $scope.doc = $stateParams.docs;
    if (!$stateParams.docs) {
        teeth();
        function teeth() {
            Dashboard.getteeth().then(function (teeth) {
                $scope.doc = teeth.data;

            });
        }

        };
    function teeth() {
        Dashboard.getteeth().then(function (teeth) {
            $scope.doc = teeth.data;

        });
    }

    $scope.remove = function (id) {
        $scope.appeared = 'true';
        Doc.remove(id).then(function () {
            teeth();
            $scope.appeared = '';
        });
    };



});



appControllers.controller('add-docCtrl', function ($scope, $state,Doc, $mdDialog) {

    $scope.data = {
        Name: '',
        Email: '',
        Password:''


    }

    $scope.save = function ($event) {
        if ($scope.data.Name.length != 0 && $scope.data.Email.length != 0 && $scope.data.Password.length != 0) {
            Doc.create($scope.data).then(function () {
                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'confirm-dialog.html',
                    targetEvent: $event,
                    locals: {
                        displayOption: {
                            title: "تم  حفظ البيانات",
                            content: "تم   حفظ  الدكتور",
                            cancel: "انهاء"
                        }
                    },
                    fontfamily: 'Neo Sans Arabic'
                })

                $scope.data = {
                    Name: '',
                    Email: '',
                    Password: ''


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
