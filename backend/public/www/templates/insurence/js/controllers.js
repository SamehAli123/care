appControllers.controller('insurenceCtrl', function ($scope,$state) {


    $scope.images = [
      {
          "img": "img/aldr3.jpg",
          "detail": "���� ����� ",
          "desc": "���� ��� �������  ����� 50%"

      },
      {
          "img": "img/arabia-t3awnia.jpg",
          "detail": "���� ������� ���������",
          "desc": "���� ��� �������  ����� 50%"



      },
      {
          "img": "img/brog.jpg",
          "detail": "������",
          "desc": "���� ��� �������  ����� 50%"



      },
      {
          "img": "img/elt3awnia.jpg",
          "detail": " ������ ���������",
          "desc": "���� ��� �������  ����� 50%"


      },
      {
          "img": "img/malas.jpg",
          "detail": "���� ������",
          "desc": "���� ��� �������  ����� 50%"


      }, {
          "img": "img/rajhi.png",
          "detail": "���� �������",
          "desc": "���� ��� �������  ����� 50%"



      }
    ]

    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData
        });
    };

});


appControllers.controller('add-insurenceCtrl', function ($scope, $state, $stateParams) {
   
    $scope.images = [
      {

          id: '2',
          url: 'http://0.tqn.com/d/painting/1/S/V/_/1/Stencil-Number2a.jpg',
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
});

appControllers.controller('insurence-detailsCtrl', function ($scope, $state, $stateParams) {

    $scope.initialForm = function () {

        $scope.img = $stateParams.photo;

    };

    $scope.initialForm();
});