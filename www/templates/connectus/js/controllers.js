//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
 // End of dashboard controller.

// Controller of Dashboard Setting.
appControllers.controller('connectCtrl', function ($scope, $cordovaSocialSharing, $cordovaSms) {

    // This function is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.contractInfo is store contract us data
        $scope.contractInfo = {
            telephone: "013 588 5664",
            email: "CareBeaty@gmail.com"
        };
    };// End initialForm.

    // sentSms is for send message by calling $cordovaSms
    // Parameter :  
    // phoneNumber = number of sending message
    $scope.sentSms = function (phoneNumber) {
        //config options to sent message
        var options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default.
            android: {
                intent: 'INTENT' // send SMS with the native android SMS messaging.
                //intent: '' // send SMS without open any other app.
            }
        };
        // calling $cordovaSms to sent message
        $cordovaSms.send(phoneNumber, " ", options);
    } // End sentSms.

    // sentEmail is for send email by calling $cordovaSocialSharing.
    // Parameter :  
    // email = email of receiver
    $scope.sentEmail = function (email) {
        $cordovaSocialSharing.shareViaEmail("", "", email, "", "", "");
        // format of sent email by using $cordovaSocialSharing is :
        //$cordovaSocialSharing.shareViaEmail(message, subject, toArr, ccArr, bccArr,file)
        // toArr, ccArr and bccArr must be an array, file can be either null, string or array.
    } // End sentEmail.

    // callTo is for using mobile calling.
    // Parameter :  
    // number = number that going to call.
    $scope.callTo = function (number) {
        window.open("tel:" + number);
    }// End callTo.

    $scope.initialForm();

});