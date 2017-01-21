//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('youtubeCtrl', function ($scope, $http) {
 

    $scope.videos = [];

    $scope.youtubeParams = {
        key: 'AIzaSyD0oCF7MjzKrzrWJaVRNkwFgkAPLNyg4wQ',
        type: 'video',
        maxResults: '15',
        part: 'id,snippet',
        
        order: 'date',
        channelId: 'UCOKsFInOx-GzAEZvjloIj6g',
    }

    $http.get('https://www.googleapis.com/youtube/v3/search', { params: $scope.youtubeParams }).success(function (response) {
        //console.log(response);
        angular.forEach(response.items, function (child) {
            
            $scope.videos.push(child);
        });
    });

    $scope.playerVars = {
        rel: 0,
        showinfo: 0,
        modestbranding: 0,
    }

 

    $scope.doRefresh = function () {
        if ($scope.newItems.length > 0) {
            $scope.items = $scope.newItems.concat($scope.items);

            //Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');

            $scope.newItems = [];
        } else {
            $scope.videos.push(child).then(function (items) {
                $scope.items = items.concat($scope.items);

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    };

});
// Controller of Dashboard Setting.
