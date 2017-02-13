
appControllers.controller('bookingCtrl', function ($scope, $mdDialog, $state, Postall, $localstorage, Getall) {









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
                name: '',
                date: '',
                creator: res.data._id,
                mobileNo: '',
                note: ''
            }
        });

    }
    else {
        if ($scope.google.hasOwnProperty("email")) {

            var x = 'google+';
            Getall.getuserid($scope.google.SocialId, x).then(function (res) {

                $scope.data = {
                    name: '',
                    date: '',
                    creator: res.data._id,
                    mobileNo: '',
                    note: ''
                }
            });
        }
        else {
            $scope.data = {
                name: '',
                date: '',
                creator: '',
                mobileNo: '',
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
                    content: "شكرا لك  سيتم  الاتصال بك   على جوالك  لتأكيد  الحجز ",
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
                    content: "يرجى ادخال كل البينات المطلوبه",
                    cancel: "انهاء"


                }
            },
            fontfamily: 'Neo Sans Arabic'
        })

    }



    $scope.save = function ($event) {
        if ($scope.data.name.length != 0 && $scope.data.date.length != 0 && $scope.data.mobileNo.length != 0 && $scope.data.note.length != 0) {
            if ($scope.data.creator.length != 0) {

                Postall.booking($scope.data).then(function () {
                    $scope.showConfirmDialog($event);
                    $scope.data = {
                        name: '',
                        date: '',
                        mobileNo: '',
                        note: ''
                    }
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


}); // End of dashboard controller.


