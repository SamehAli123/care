appControllers.controller('gallaryCtrl', function ($scope, $state, Filckr) {
    getfilckr();

    function getfilckr() {
        Filckr.getfilckr().then(function (resualt) {
            $scope.images = resualt.photos.photo;
        });
    };

    $scope.save = function () {
        for (var i = 0; i < $scope.selected.length; i++) {
             $scope.link = 'https://farm'+ $scope.selected[i].farm + '.staticflickr.com/' + $scope.selected[i].server + '/' + $scope.selected[i].id + '_' + $scope.selected[i].secret + '.jpg';

          
        }

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

});


