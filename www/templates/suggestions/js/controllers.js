//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('suggestionCtrl', function ($scope, $mdDialog, $state) {


  

    $scope.data
 = {
     dep: '',
     text: ''

 }
  
    $scope.save = function ($event) {

        if ($scope.data.text.length != 0 && $scope.data.dep.length != 0) {

            $scope.showConfirmDialog = function ($event) {
                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'confirm-dialog.html',
                    targetEvent: $event,
                    locals: {
                        displayOption: {
                            title: "تم",
                            content: "شكرا لك تم ارسال الشكوى او الاقتراح الى الاداره المختصة",
                           cancel:"تم"

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
                            content: "يرجى اختيار القسم وكتابه السؤال",
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
