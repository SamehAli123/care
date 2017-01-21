appControllers.controller('dashboardCtrl', function ($scope, $state, $stateParams, Dashboard) {
    google();
    facebook();
    twitter();
 
    teeth();

    getnotasked();
    getasked();
    $scope.isAnimated = $stateParams.isAnimated;
    $scope.navigateToGoogles = function () {
        $state.go('app.users', {
            object: $scope.Googles
        });
    };
    $scope.navigateToFacebook = function () {
        $state.go('app.users', {
            object: $scope.Facebook
        });
    };
    $scope.navigateToTwitter = function () {
        $state.go('app.users', {
            object: $scope.Twitter
        });
    };
    $scope.navigateToTeeth = function () {
        $state.go('app.doc', {
            docs: $scope.Teeth
        });
    };
    $scope.navigateToNotasked = function () {
        $state.go('app.justqes', {
            qes: $scope.NotAsked
        });
    };
    $scope.navigateTotasked = function () {
        $state.go('app.reqs', {
            qes: $scope.Asked
        });
    };
    function twitter() {
        Dashboard.gettwitter().then(function (twitter) {
            $scope.Twitter = twitter.data;
        });
    };
    function facebook() {
        Dashboard.getfacebook().then(function (facebook) {
            $scope.Facebook = facebook.data;
        });
    };
    function google() {
        Dashboard.getgoogle().then(function (google) {
            $scope.Googles = google.data;

        });
    };
    function teeth() {
        Dashboard.getteeth().then(function (teeth) {
            $scope.Teeth = teeth.data;

        });
    };
    function getnotasked() {
        Dashboard.getnotasked().then(function (resulat) {
            $scope.NotAsked = resulat.data;

        });
    };
    function getasked() {
        Dashboard.getasked().then(function (resulat) {
            $scope.Asked = resulat.data;

        });
    };

});