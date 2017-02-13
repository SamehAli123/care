appControllers.controller('suggestionCtrl', function ($scope, $mdDialog, $state, Getall, $localstorage, Postall) {

    $scope.face = $localstorage.getObject("localface");
    $scope.google = $localstorage.getObject("localgoogle");

    //function getid(SocialId,loginway) {
    //    Getall.getuserid(SocialId,loginway).then(function (res) {
    //        $scope.data = {
    //            creator: res.id,
    //            note: ''
    //        }
    //    });
    //}

    if ($scope.face.hasOwnProperty("name")) {
        var x = 'facebook';
        Getall.getuserid($scope.face.SocialId, x).then(function (res) {

            $scope.data = {
                creator: res.data._id,
                note: ''
            }
        });

    }
    else {
        if ($scope.google.hasOwnProperty("email")) {

            var x = 'google+';
            Getall.getuserid($scope.google.SocialId, x).then(function (res) {

                $scope.data = {
                    creator: res.data._id,
                    note: ''
                }
            });
        }
        else {
            $scope.data = {
                creator: '',
                note: ''
            }
        }
    }

    $scope.showConfirmDialog = function ($event) {



        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "تم",
                    content: "شكرا لك تم ارسال الشكوى او الاقتراح الى الاداره المختصة",
                    cancel: "تم"
                }
            },
            fontfamily: 'Neo Sans Arabic'
        })
    }
    $scope.showConfirmDialog2 = function ($event) {
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "تنبيه ",
                    content: "يرجى تسجيل الدخول",
                    cancel: "انهاء",
                    ok: "تسجيل الدخول"
                }
            },
            fontfamily: 'Neo Sans Arabic'
        }).then(function () {
            $state.go('app.login');
        }, function () {
            // For cancel button actions.
        });

    }

    $scope.showConfirmDialog3 = function ($event) {
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "خطأ فى ادخال البيانات",
                    content: "يرجى كتابه السؤال",
                    cancel: "انهاء"


                }
            },
            fontfamily: 'Neo Sans Arabic'
        })

    }



    $scope.save = function ($event) {
        if ($scope.data.note.length != 0) {
            if ($scope.data.creator.length != 0) {

                Postall.createsuggestion($scope.data).then(function () {
                    $scope.showConfirmDialog($event);
                    $scope.data.note = '';
                });
            }
            else {
                $scope.showConfirmDialog2($event)
            }
        }
        else {
            $scope.showConfirmDialog3($event)
        }
    }
});
