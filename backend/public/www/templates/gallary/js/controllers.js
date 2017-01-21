appControllers.controller('gallaryCtrl', function ($scope, $state, Filckr, Gallary, $mdDialog) {
    get();
    getfilckr();
    function getfilckr() {
        Filckr.getfilckr().then(function (resualt) {
            $scope.images = resualt.photos.photo;
        });
    };
    $scope.save = function ($event) {
        for (var i = 0; i < $scope.selected.length; i++) {
            $scope.item = {
                url: 'https://farm' + $scope.selected[i].farm + '.staticflickr.com/' + $scope.selected[i].server + '/' + $scope.selected[i].id + '_' + $scope.selected[i].secret + '.jpg'
            }
            Gallary.create($scope.item).then(function () {
                get();
            });
        }
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "تم  حفظ البيانات",
                    content: "تم   حفظ الصور فى المعرض",
                    cancel: "انهاء"
                }
            },
            fontfamily: 'Neo Sans Arabic'
        })
        getfilckr();
        $scope.appear = null;
    }
    $scope.selected = [];
    $scope.toggle = function (item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
            if (idx == 0) {
                $scope.appear = null;

            }
            list.splice(idx, 1);
        }
        else {
            list.push(item);
            $scope.appear = 'd';
        }
    };
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    function get() {
        Gallary.get().then(function (res) {
            $scope.photos = res.data;
        });
    };
    $scope.remove = function (id) {
        $scope.appeared = 'true';
        Gallary.remove(id).then(function () {
            get();
            $scope.appeared = '';
        });
    };
});
