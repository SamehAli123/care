appControllers.controller('offersCtrl', function ($scope, Offer, $ionicSlideBoxDelegate, $stateParams) {
    get();

    if ($stateParams.back) {
        get();
        function get() {
            Offer.get().then(function (res) {
                $scope.offers = res.data;
            })
            $scope.repeatDone = function () {
                $ionicSlideBoxDelegate.update();
                $ionicSlideBoxDelegate.slide($scope.offers.length - 1, 1);
            };
        }

    }
    function get() {
        Offer.get().then(function (res) {
            $scope.offers = res.data;
        })
        $scope.repeatDone = function() {
            $ionicSlideBoxDelegate.update();
            $ionicSlideBoxDelegate.slide($scope.offers.length - 1, 1);
        };
    }


    $scope.remove = function (id) {
        $scope.appeared = 'true';
        Offer.remove(id).then(function () {
            get();
            $scope.appeared = '';
        });
    };

});
appControllers.controller('add-offersCtrl', function ($scope, Filckr, Offer, $mdDialog, $state) {
    $scope.navigateTo = function () {
        $state.go('app.offers', {
            back: 'sucess'
        });
    };
    $scope.data = {
        Name: '',
        PriceBefore: '',
        PriceAfter: '',
        Details: '',
        url: ''
    }
    getfilckr();
    var x;
    $scope.save = function ($event) {
        if ($scope.data.Name.length != 0 && $scope.data.PriceBefore.length != 0 && $scope.data.PriceAfter.length != 0 && $scope.data.Details.length != 0) {
            $scope.finaldata = $scope.data;
            $scope.finaldata.url = x;
            Offer.create($scope.finaldata).then(function () {


                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'confirm-dialog.html',
                    targetEvent: $event,
                    locals: {
                        displayOption: {
                            title: "تم  حفظ البيانات",
                            content: "تم   حفظ  العرض",
                            cancel: "انهاء"
                        }
                    },
                    fontfamily: 'Neo Sans Arabic'
                })

                $scope.data = {
                    Name: '',
                    PriceBefore: '',
                    PriceAfter: '',
                    Details: '',
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
                        title: "حدث خطأ فى البيانات",
                        content: "يرجى  تعبئه كامل النموذج",
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