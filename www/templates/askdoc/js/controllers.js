
appControllers.controller('askdocCtrl', function ($scope, $state, Getall, $localstorage, $stateParams) {
    function getid() {
        $scope.face = $localstorage.getObject("localface");
        $scope.google = $localstorage.getObject("localgoogle");
        if ($scope.face.hasOwnProperty("name")) {
            var x = 'facebook';
            Getall.getuserid($scope.face.SocialId, x).then(function (res) {

         
                Getall.getclientask(res.data._id).then(function (res) {
                    $scope.questions = res;
                    $scope.havedata = 'true';
                })
            });
        }
        else {
            if ($scope.google.hasOwnProperty("email")) {

                var x = 'google+';
                Getall.getuserid($scope.google.SocialId, x).then(function (res) {

                    //$scope.id = res.data._id;

                    Getall.getclientask(res.data._id).then(function (res) {
                        $scope.questions = res;
                        $scope.havedata = 'true';
                    })



                });
            }
            else {
                $scope.id = '';
            }
        }


    }
   

    

    getid();


   
    $scope.havedata = '';

    $scope.doRefresh = function () {
        if ($scope.questions.length > 0) {

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
            $scope.questions = [];
        } else {
            $scope.questions = [];
            getid();
            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

        }
    };

 



    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData
        });
    };
});
appControllers.controller('questionCtrl', function ($scope, $mdDialog, $state, $localstorage, Getall, Postall) {

    getuser();


    $scope.navigateToaskdoc = function () {
        $state.go('app.askdoc');
    };



    $scope.navigateTologin = function () {
        $state.go('app.login');
    };
    $scope.showConfirmDialog = function ($event) {
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "تم",
                    content: "شكرا لك تم ارسال  السؤال الى الدكتور المختص",
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
           /// $scope.navigateTologin();
        }, function () {

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




    function getuser() {
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