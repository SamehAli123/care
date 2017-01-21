//// Controller of dashboard.
//var app = angular.module('starter', ['ionic']);
appControllers.controller('facebookCtrl', function ($scope, $http) {

    get();
    function makeHttpRequest() {
        try {
            return new XMLHttpRequest();

        }
        catch (error) {

        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");

        } catch (error) {

        }
        try {
            return new ActiveXObject("Microsoft.XMLHTTP")

        } catch (error) {

        }
        throw new Error("no request")
    }

   

    function get () {
        var appID = "1257305947664713";
        var appSecret = "a3be2b4f7b1c146bb98fba5ed07dcda0";

        var accessTokenRq = makeHttpRequest();
        var httpString = 'https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id=' + appID + '&client_secret=' + appSecret;
        accessTokenRq.open("GET", httpString, true);
        accessTokenRq.send(null);
        var access_token;
        access_token = accessTokenRq.responseText;
        $http.get('https://graph.facebook.com/v2.8/685694824818480/feed?access_token=1257305947664713|wey--uLw9agY9ceePw9WSmAgQkE&fields=id,message,picture,icon,likes.summary(true),comments.summary(true),created_time,from,object_id&limit=10)').then(function (response) {
             $scope.data = response.data;
             
             console.log(response.data)
            })
       

    }
   






    //accessTokenRq.onreadystatechange = function () {
    //    if (accessTokenRq.readyState == 4) {
       

    //        var request = makeHttpRequest();
    //        request.open("GET", "https://graph.facebook.com/v2.2/685694824818480/posts?" + access_token + '&fields=id,message,picture,link,name,description,type,icon,likes,comments,created_time,from,object_id&limit=10)', true);

    //        request.send(null);

    //        request.onreadystatechange = function () {
    //            if (request.readyState == 4) {
    //                var response = request.responseText;
    //                $scope.entries = angular.fromJson(response);
    //                console.log($scope.entries);
    //            }
    //        }
    //    }
    //}
}); // End of dashboard controller.

// Controller of Dashboard Setting.

































////// Controller of dashboard.
////var app = angular.module('starter', ['ionic']);
//appControllers.controller('facebookCtrl', function ($scope,$http) {


//    function makeHttpRequest() {
//        try {
//            return new XMLHttpRequest();

//        }
//        catch (error) {

//        }
//        try {
//            return new ActiveXObject("Msxml2.XMLHTTP");

//        } catch (error) {

//        }
//        try {return new ActiveXObject("Microsoft.XMLHTTP")
    
//        } catch (error) {
    
//        }
//        throw new Error ("no request")
//    }

//    var appID = "1257305947664713";
//    var appSecret = "a3be2b4f7b1c146bb98fba5ed07dcda0";

//    var accessTokenRq = makeHttpRequest();
//    var httpString = 'https://graph.facebook.com/oauth/access_token?grant_type=client_credentials&client_id=' + appID + '&client_secret=' + appSecret;
//    accessTokenRq.open("GET", httpString, true);
//    accessTokenRq.send(null);
//    var access_token;


//    $scope.get = function () {

//    }
//    accessTokenRq.onreadystatechange = function () {
//        if (accessTokenRq.readyState == 4) {
//            access_token = accessTokenRq.responseText;
          
//            var request = makeHttpRequest();
//            request.open("GET", "https://graph.facebook.com/v2.2/685694824818480/posts?" + access_token + '&fields=id,message,picture,link,name,description,type,icon,likes,comments,created_time,from,object_id&limit=10)', true);
            
//            request.send(null);

//            request.onreadystatechange = function() {
//                if (request.readyState == 4) {
//                    var response = request.responseText;
//                    var fbDate = angular.fromJson(response);
//                    $scope.fb = fbDate;
             

//                    var data = fbDate.data;
//                    var messageArray = [];
//                    var pictureArray = [];
//                    var likeArray = [];
//                    var dateArray = [];
//                    var linkArray = [];
//                    var typeArray = [];
//                    var commentArray = [];
//                    var objects = [];
//                    for (var i = 0; i < data.length; i++) {
//                        var entry = data[i];
//                        var message = entry.message;

//                        //Message
//                        if (entry.message) {
//                            var message = entry.message
//                            messageArray.push(message);
//                        }
//                        else {
//                            messageArray.push("");
//                        }




//                        //Pictuer
//                        if (angular.equals(entry.type, "photo")) {
//                            var pic = "https://graph.facebook.com/" + entry.object_id + "/picture?type=normal";
//                            pictureArray.push(pic);
//                        }
//                        else if (angular.equals(entry.type, "link")) {
//                            pictureArray.push(entry.picture);
//                        }
//                        else { pictureArray.push("empty"); }
            

//                        //time
//                        if (entry.time) {

//                            pictureArray.push(entry.picture);
//                        }
//                        else {
//                            pictureArray.push("empty");
//                        }



//                        //likes
//                        if (entry.likes) {
//                            var likeData = entry.likes;
//                            likeArray.push(likeData.data.length + " Likes");
                         
//                        }
//                        else { likeArray.push(" Likes"); }


//                        //comment 
//                        if (entry.comments) {
//                            var commentData = entry.comments
//                            commentArray.push(commentData.data.length);

//                        }
//                        else {
//                            commentArray.push(0);
//                        }
                        
//                        var created = entry.created_time;
//                        var rawDate = created.split("T");
//                        var date = rawDate[0];
//                        var rawTime = rawDate[1];
//                        var time = rawTime.split(":");
//                        var betaTime = time[0] + ":" + time[1];
//                        finalTime = addOneHour(betaTime);
//                        dateArray.push(date+"-"+finalTime);

//                        function addOneHour(time) {
//                            var seperatedTime = time.split(":");
//                            var hourTime = seperatedTime[0];
//                            var returningTime = "";
//                            if (seperatedTime.indexOf(00) > -1) { returningTime = "01"; }
//                            if (seperatedTime.indexOf(01) > -1) { returningTime = "02"; }
//                            if (seperatedTime.indexOf(02) > -1) { returningTime = "03"; }
//                            if (seperatedTime.indexOf(03) > -1) { returningTime = "04"; }
//                            if (seperatedTime.indexOf(04) > -1) { returningTime = "05"; }
//                            if (seperatedTime.indexOf(05) > -1) { returningTime = "06"; }
//                            if (seperatedTime.indexOf(06) > -1) { returningTime = "07"; }
//                            if (seperatedTime.indexOf(07) > -1) { returningTime = "08"; }
//                            if (seperatedTime.indexOf(08) > -1) { returningTime = "09"; }
//                            if (seperatedTime.indexOf(09) > -1) { returningTime = "10"; }
//                            if (seperatedTime.indexOf(10) > -1) { returningTime = "11"; }
//                            if (seperatedTime.indexOf(11) > -1) { returningTime = "12"; }
//                            if (seperatedTime.indexOf(12) > -1) { returningTime = "13"; }
//                            if (seperatedTime.indexOf(13) > -1) { returningTime = "14"; }
//                            if (seperatedTime.indexOf(14) > -1) { returningTime = "15"; }
//                            if (seperatedTime.indexOf(15) > -1) { returningTime = "16"; }
//                            if (seperatedTime.indexOf(16) > -1) { returningTime = "17"; }
//                            if (seperatedTime.indexOf(17) > -1) { returningTime = "18"; }
//                            if (seperatedTime.indexOf(18) > -1) { returningTime = "19"; }
//                            if (seperatedTime.indexOf(19) > -1) { returningTime = "20"; }
//                            if (seperatedTime.indexOf(20) > -1) { returningTime = "21"; }
//                            if (seperatedTime.indexOf(21) > -1) { returningTime = "22"; }
//                            if (seperatedTime.indexOf(22) > -1) { returningTime = "23"; }
//                            if (seperatedTime.indexOf(23) > -1) { returningTime = "00"; }
                          
//                            return returningTime + ":" + seperatedTime[1];
//                        }


//                        //link
//                        if (entry.link) {
//                            linkArray.push(entry.link);

//                        }
//                        else {
//                            linkArray.push("empty");
//                        }

//                        typeArray.push(entry.type);

//                        //for (var i = 0; i < dateArray.length; i++) {
//                        //    if ((angular.equals(linkArray[i], "empty")) && (angular.equals(pictureArray[i], "empty"))) {

//                        //        objects.push(' <div class="list card"><div class="item item-avatar"> <img src="../../../img/app_icon.png"><h2>مركز عناية وجمال لطب الاسنان</h2><p>' + dateArray[i] + '</p></div><div class="item item-body" >  <img class="full-image" src="'+pictureArray[i]+'"><p>' + messageArray[i] + '  </p><p> <span class="subdued">' + likeArray[i] + '</span><span class="subdued">' + commentArray[i] + '</span></p></div></div>');
//                        //    }
//                        //}

//                        objects.push(entry);

//                    }
//                    $scope.entries = objects;
//                    console.log($scope.entries)

                  
//                }
//            }
//        }
//    }
//}); // End of dashboard controller.

//// Controller of Dashboard Setting.
