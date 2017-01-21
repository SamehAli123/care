appControllers.controller('insurenceCtrl', function ($scope, $state, $stateParams, Insurence, $ionicSlideBoxDelegate) {
    if ($stateParams.back) {
        get();
    }
    get();
    function get() {
        Insurence.get().then(function (res) {
            $scope.images = res.data;
        })
    }


    $scope.remove = function (id) {
        $scope.appeared = 'true';
        Insurence.remove(id).then(function () {
            get();
            $scope.appeared = '';
        });
    };





    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData
        });
    };

});


appControllers.controller('add-insurenceCtrl', function ($scope, $state, $stateParams, Insurence, Filckr, $mdDialog) {

    $scope.navigateTo = function () {
        $state.go('app.insurence', {
            back: 'sucess'
        });
    };
    $scope.data = {
        Name: '',
        Desc: '',
        url: ''
    }
    getfilckr();

    var x;
    $scope.save = function ($event) {
        if ($scope.data.Name.length != 0 && $scope.data.Desc.length != 0) {
            $scope.finaldata = $scope.data;
            $scope.finaldata.url = x;
            Insurence.create($scope.finaldata).then(function () {


                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'confirm-dialog.html',
                    targetEvent: $event,
                    locals: {
                        displayOption: {
                            title: "تم حفظ  البيانات",
                            content: "تم  حفظ بيانات شركه التأمين",
                            cancel: "انهاء"
                        }
                    },
                    fontfamily: 'Neo Sans Arabic'
                })

                $scope.data = {
                    Name: '',
                    Desc: '',
                    url: ''
                }
                $scope.selected = [];
            });
        }
        else {
            $mdDialog.show({
                controller: 'DialogController',
                templateUrl: 'confirm-dialog.html',
                targetEvent: $event,
                locals: {
                    displayOption: {
                        title: "حدث خطأ فى ادخال البيانات",
                        content: "يرجى  تعبئه كامل المنوذج",
                        cancel: "انهاء"
                    }
                },
                fontfamily: 'Neo Sans Arabic'
            })
        }



    }
    function getfilckr() {
        Filckr.getfilckr().then(function (resualt) {
            $scope.images = resualt.photos.photo;
        });
    };

    $scope.selected = [];
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            if (idx == 0) {
            }
            list.splice(idx, 1);
        }
        else {
            list.push(item);
            x = 'https://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg';
        }
    };
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
});

appControllers.controller('insurence-detailsCtrl', function ($scope, $state, $stateParams) {

    $scope.initialForm = function () {

        $scope.img = $stateParams.photo;

    };

    $scope.initialForm();
});