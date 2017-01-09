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
                    showConfirmDialog()

                        //var alertPopup = $ionicPopup.alert({
                        //    title: 'الادخال خطأ',
                        //    template: 'من  فضلك  ادخل اسم  المستخدم  الصحيح  مع الباسورد'
                        //});
                }

           
                
              
            });
        },
        isLoggedIn: function () {
            return status;
        }
    }
});



//angular.module('starter.user', [])

//.service('User', function ($q,$http) {
//    return {
//        loginUser: function (credentials) {
//            var deferred = $q.defer();
//            var promise = deferred.promise;
            

//            //if (credentials.email == 'user' && credentials.password == 'secret') {
//            //    deferred.resolve('Welcome ' + credentials.email + '!');
//            //} else {
//            //    deferred.reject('Wrong credentials.');
//            //}
//            promise.success = function (fn) {
//                promise.then(fn);
//                return promise;
//            }
//            promise.error = function (fn) {
//                promise.then(null, fn);
//                return promise;
//            }
//            return promise;
//        }
//    }
//})
