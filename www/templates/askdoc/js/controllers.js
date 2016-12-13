
appControllers.controller('askdocCtrl', function ($scope, $state) {

    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            photo: objectData,
            actionDelete: (objectData == null ? false : true)
        });
    };


});


appControllers.controller('questionCtrl', function ($scope, $mdDialog, $state) {

    $scope.showConfirmDialog = function ($event) {
        $mdDialog.show({
            controller: 'DialogController',
            templateUrl: 'confirm-dialog.html',
            targetEvent: $event,
            locals: {
                displayOption: {
                    title: "خطأ فى ادخال البيانات",
                    content: "يرجى اختيار القسم وكتابه السؤال",
                    cancel: "انهاء"
                }
            }
        })
    }// End showConfirmDialog.
    $scope.text= '';

    $scope.save = function ($event) {

        alert($scope.text);
        //if ($scope.text.length != 0 && $scope.department.length != 0) {
        //    alert('not empty');

        //    $state.go('app.app.askdoc');
        //}
        //else {
        //    alert('all  empty');
        //    $scope.showConfirmDialog($event)
        //}
    }
});