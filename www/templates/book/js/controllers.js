//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('bookingCtrl', function ($scope, $mdDialog, $state) {




    $scope.data
 = {
     dep: '',
     text: '',
     text1: '',
     text2: '',
     text3: '',
     text4:''

 }

    $scope.save = function ($event) {

        if ($scope.data.text.length != 0 && $scope.data.dep.length != 0 && $scope.data.text1.length != 0 && $scope.data.text2.length != 0 && $scope.data.text3.length != 0 && $scope.data.text4.length != 0) {

            $scope.showConfirmDialog = function ($event) {
                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'confirm-dialog.html',
                    targetEvent: $event,
                    locals: {
                        displayOption: {
                            title: "تم",
                            content: "تم حجز الموعد سيصلك رساله تأكيد الى بريدك الالكتروني",
                            cancel: "تم"

                        }
                    },
                    fontfamily: 'Neo Sans Arabic'
                })

            }

            $scope.showConfirmDialog($event)
            $scope.data
= {
    dep: '',
    text: ''

}
        }
        else {
            $scope.showConfirmDialog = function ($event) {
                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'confirm-dialog.html',
                    targetEvent: $event,
                    locals: {
                        displayOption: {
                            title: "خطأ فى ادخال البيانات",
                            content: "يرجى ادخال البيانات كاملة",
                            cancel: "انهاء",

                        }
                    },
                    fontfamily: 'Neo Sans Arabic'
                })

            }
            $scope.showConfirmDialog($event)
        }
    }



}); // End of dashboard controller.


// Controller of Dashboard Setting.
