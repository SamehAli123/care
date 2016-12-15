//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('aboutusCtrl', function ($scope, $timeout) {


    $scope.initialForm = function () {
        // $scope.deviceInformation is store device information data.
        $scope.deviceInformation = {};

        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#device-information-loading-progress').show();
            }
            else {
                jQuery('#device-information-loading-progress').fadeIn(700);
            }
        }, 400);

        $timeout(function () {
            $scope.deviceInformation = ionic.Platform.device();
            jQuery('#device-information-loading-progress').hide();
            jQuery('#device-information-content').fadeIn();
        }, 1000);
    }; // End initialForm.
    $scope.aboutus = [
        {
            "aboutcenter": "من نحن",
            "desc":"مركز متخصص فى طب الاسنان"
        },
        {
            "aboutcenter": "النشأة",
            "desc": "تم انشاء المركز عام 1990"
        },
         {
             "aboutcenter": "خدمتنا",
             "desc": "نقدم الكثير من الخدمات التي يحتاجها الفرد في مجال طب الاسنان"
         },

    ]
    // getDeviceInformation is for get device information by calling ionic Platform device.
    $scope.getDeviceInformation = function () {
        $scope.deviceInformation = ionic.Platform.device();
    }; // End getDeviceInformation.

    $scope.initialForm();
}); // End of dashboard controller.

// Controller of Dashboard Setting.
