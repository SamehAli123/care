appControllers.controller('ourteamCtrl', function ($scope, $ionicSlideBoxDelegate, Ourteam, $stateParams) {

    if ($stateParams.back) {
        get();
    }
    get();
    function get() {
        Ourteam.get().then(function (res) {
            $scope.images = res.data;
        })
        $scope.repeatDone = function () {
            $ionicSlideBoxDelegate.update();
            $ionicSlideBoxDelegate.slide($scope.images.length - 1, 1);
        };
    }
    $scope.del = function (id) {
        $scope.appeared = 'true';
        Ourteam.remove(id).then(function () {
            get();
            $scope.appeared = '';
        });
    };


});


appControllers.controller('add-memberCtrl', function ($scope, Filckr, $ionicSlideBoxDelegate, Ourteam, $mdDialog) {
   



  getfilckr();
    function getfilckr() {
        Filckr.getfilckr().then(function (resualt) {
            $scope.images = resualt.photos.photo;
        });
    };

    $scope.data = {
        Name: '',
        Desc: '',
        url:''
    };
    var x;
    $scope.save = function ($event) {
        if ($scope.data.Name.length != 0 && $scope.data.Desc.length != 0) {
            $scope.finaldata = $scope.data;
            $scope.finaldata.url = x;
            Ourteam.create($scope.finaldata).then(function () {


                $mdDialog.show({
                    controller: 'DialogController',
                    templateUrl: 'confirm-dialog.html',
                    targetEvent: $event,
                    locals: {
                        displayOption: {
                            title: "Êã  ÍÝÙ ÇáÈíÇäÇÊ",
                            content: "Êã   ÍÝÙ  ÇáÏßÊæÑ",
                            cancel: "ÇäåÇÁ"
                        }
                    },
                    fontfamily: 'Neo Sans Arabic'
                })

                $scope.data = {
                    Name: '',
                    Desc: '',
                    url: ''
                };
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
                        title: "ÍÏË ÎØÃ Ýì ÇáÈíÇäÇÊ",
                        content: "íÑÌì  ÊÚÈÆå ßÇãá ÇáäãæÐÌ",
                        cancel: "ÇäåÇÁ"
                    }
                },
                fontfamily: 'Neo Sans Arabic'
            })
        }



    }
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