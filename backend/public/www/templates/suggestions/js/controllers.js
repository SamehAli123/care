appControllers.controller('suggestionsCtrl', function ($scope, Suggestion) {
    get();
    function get() {
        Suggestion.get().then(function (res) {
            $scope.suggestions = res.data;
        })
    }

});
