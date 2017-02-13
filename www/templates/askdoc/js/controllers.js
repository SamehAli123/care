
appControllers.controller('askdocCtrl', function ($scope, $state, Getall, $localstorage, $stateParams) {

    if ($stateParams.back) {
        get();
    }





    $scope.doRefresh = function () {
        if ($scope.questions.length > 0) {

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
            $scope.questions = [];
        } else {
            get();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }
    };


    get();
    $scope.face = $localstorage.getObject("localface");
    $scope.google = $localstorage.getObject("localgoogle");
    if ($scope.face.hasOwnProperty("name")) {
        var x = 'facebook';
        Getall.getuserid($scope.face.SocialId, x).then(function (res) {

            $scope.id = res.data._id;
        });
    }
    else {
        if ($scope.google.hasOwnProperty("email")) {

            var x = 'google+';
            Getall.getuserid($scope.google.SocialId, x).then(function (res) {

                $scope.id = res.data._id;


            });
        }
        else {
            $scope.id = '';

        }
    }

    function get() {
        Getall.getclientask($scope.id).then(function (res) {
            $scope.questions = res;

        })
    }


    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData
        });
    };
});
appControllers.controller('questionCtrl', function ($scope, $mdDialog, $state, $localstorage, Getall, Postall) {

    $scope.navigateToaskdoc = function () {
        $state.go('app.askdoc', {
            back: 'true'
        });
    };









    $scope.face = $localstorage.getObject("localface");
    $scope.google = $localstorage.getObject("localgoogle");
    if ($scope.face.hasOwnProperty("name")) {
        var x = 'facebook';
        Getall.getuserid($scope.face.SocialId, x).then(function (res) {

            $scope.data = {
                question_creator: res.data._id,
                question: ''
            }
        });
    }
    else {
        if ($scope.google.hasOwnProperty("email")) {

            var x = 'google+';
            Getall.getuserid($scope.google.SocialId, x).then(function (res) {

                $scope.data = {
                    question_creator: res.data._id,
                    question: ''
                }
            });
        }
        else {
            $scope.data = {
                question_creator: '',
                question: ''
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
        if ($scope.data.question.length != 0) {
            if ($scope.data.question_creator.length != 0) {

                Postall.askdoc($scope.data).then(function () {
                    $scope.showConfirmDialog($event);
                    $scope.data.question = '';
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