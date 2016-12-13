
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

    }
    $scope.data
    = {
        dep: '',
       text:''

    }
    $scope.save = function ($event) {

        if ($scope.data.text.length != 0 && $scope.data.dep.length != 0) {

            $state.go('app.askdoc');
        }
        else {
            $scope.showConfirmDialog($event)
        }
    }
});