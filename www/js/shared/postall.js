angular.module('starter.postall', [])
.factory('Postall', function ($http) {
    var apiUrl = 'http://care-sameh1231990.c9users.io:8080/';
    return {
        createsuggestion: function (suggestion) {
            return $http.post(apiUrl + 'client-suggestion', suggestion).then(function (response) {
                return response.data;
            });
        },
        createuser: function (user) {
            return $http.post(apiUrl + 'user', user).then(function (response) {
                return response.data;
            });
        },
        askdoc: function (ques) {
            return $http.post(apiUrl + 'askdoc', ques).then(function (response) {
                return response.data;
            });
        },
        booking: function (book) {
            return $http.post(apiUrl + 'booking', book).then(function (response) {
                return response.data;
            });
        },


        createnewuser: function (user) {
            return $http.post(apiUrl + 'client-user', user).then(function (response) {
                return response.data;
            });
        },
        login: function (credentials) {
            return $http.post(apiUrl + 'authenticate/user', credentials)
            .then(function (response) {
                console.log(response);
                if (response.data.name) {
             
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

    }
});