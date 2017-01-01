appControllers.controller('gallaryCtrl', function ($scope, $state) {
    $scope.images = [
        {
            id: '1',
            url: 'https://farm1.staticflickr.com/640/31872939632_0cf0080b3d.jpg',
            status: 'true'
        }, {
            id: '2',

            url: 'https://farm1.staticflickr.com/640/31872939632_0cf0080b3d.jpg',
            status: 'true'
        }, {
            id: '3',

            url: 'https://farm1.staticflickr.com/640/31872939632_0cf0080b3d.jpg',
            status: 'true'
        }, {
            id: '4',

            url: 'https://farm1.staticflickr.com/640/31872939632_0cf0080b3d.jpg',
            status: 'true'
        }, {
            id: '5',

            url: 'https://farm1.staticflickr.com/640/31872939632_0cf0080b3d.jpg',
            status: 'true'
        }, {
            id: '6',

            url: 'https://farm1.staticflickr.com/640/31872939632_0cf0080b3d.jpg',
            status: 'true'
        }, {
            id: '7',

            url: 'https://farm1.staticflickr.com/640/31872939632_0cf0080b3d.jpg',
            status: 'true'
        }, {
            id: '8',

            url: 'https://farm1.staticflickr.com/640/31872939632_0cf0080b3d.jpg',
            status: 'true'
        }, {
            id: '9',

            url: 'https://farm1.staticflickr.com/640/31872939632_0cf0080b3d.jpg',
            status: 'true'
        }
    ]


    $scope.removeicon = '';
    $scope.changeval = function (id) {

        for (var i = 0; i < $scope.images.length; i++) {
            if ($scope.images[i].id === id) {
                if ($scope.images[i].id== 'false') {
                    $scope.images[i].status = 'true';
                }
                else {
                    $scope.images[i].status = 'false';
                    $scope.removeicon = 'true';

                }

       
            }
        }
    }




});



