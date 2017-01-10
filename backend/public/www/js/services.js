angular.module('starter.user', [])
.factory('User', function ($http, $state, $mdDialog) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';
    var status = false;
    return {
        login: function (credentials) {
            return $http.post(apiUrl + 'authenticate', credentials)
            .then(function (response) {
                if (response.data.token) {
                    var Token = response.data.token;
                    $http.defaults.headers.common['authentication'] = Token;
                    loggedIn = true;
                    $state.go('app.dashboard');

                }
                else {

                    var showConfirmDialog = function ($event) {
                        $mdDialog.show({
                            controller: 'DialogController',
                            templateUrl: 'confirm-dialog.html',
                            targetEvent: $event,
                            locals: {
                                displayOption: {
                                    title: "خطأ فى ادخال البيانات",
                                    content: "خطأ فى الاسم  و كلمه  المرور ",
                                    cancel: "انهاء",

                                }
                            },
                            fontfamily: 'Neo Sans Arabic'
                        })

                    }
                    showConfirmDialog();
                }
            });
        },
        isLoggedIn: function () {
            return status;
        }
    }
});
