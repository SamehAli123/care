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
            "desc": "مسيرة قصيرة في العمر و لكن غنية بالانجازات لأننا غذيناها بالكفاءات المميزة و الريادة في التخطيط  و التنفيذ وقد راعينا عند البدء في العيادات تسخير آخر ما توصلت إليه التقنية من أجهزة في مجال طب الأسنان ووضعها بين أيدي أطباء مهرة ومتميزين في مجال عملهم من خلال اختصاصاتهم لكي يحصل المراجعين على خدمة تتلاءم مع مستوى تطلعاتهم وطموحهم ولم نغفل عن جانب التنسيق والتأثيث ليظهر بالفخامة التي تناسب النخبة المميزة المستهدف استقطابها للعلاج نعم من البداية كان طموحنا التربع على القمة وبامتياز من خلال التخطيط الدقيق الذي يحكي سر نجاحنا وتنبع رؤيتنا من التزامنا التام بضمان جودة العمل يرافقها خدمة راقية وأسعار تلقى رضى الجميع"
        },
        {
            "aboutcenter": "النشأة",
            "desc": "شهد عام 2011 نشأة واحدة من أهم المراكز والمجمعات الرائدة في الأحساء في طب و تجميل الفم والأسنان، ويحتوي مجمع عناية وجمال لطب الأسنان على عشر عيادات تشمل كافة تخصصات طب الفم والأسنان"
        },
         {
             "aboutcenter": "خدمتنا",
             "desc": "خدمتنا بشكل عام هي وقاية وعلاج أسنان الأطفال – جراحة الأسنان – العلاج التحفظي للأسنان – تقويم و تجميل الأسنان – زراعة الأسنان – تجميل الأسنان – علاج اللثة _ معالجات الليزر"
         },

    ]
    // getDeviceInformation is for get device information by calling ionic Platform device.
    $scope.getDeviceInformation = function () {
        $scope.deviceInformation = ionic.Platform.device();
    }; // End getDeviceInformation.

    $scope.initialForm();
}); // End of dashboard controller.

// Controller of Dashboard Setting.
