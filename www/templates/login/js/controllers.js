appControllers.controller('loginCtrl', function ($scope, $cordovaOauth, $ionicLoading, $localstorage, $http, $state, Postall) {
    $scope.accessToken;
    $scope.navigateTo = function (targetPage) {
        $state.go(targetPage);
    };
    $scope.login = function () {
        $cordovaOauth.facebook(window.globalVariable.oAuth.facebook, ["email"]).then(function (result) {

            $scope.access_token = result.access_token;
            var link = 'https://graph.facebook.com/v2.8/me?fields=id,name,picture,email&access_token=' + $scope.access_token;
            $http.get(link).then(function (res) {
                    $scope.userInfo = {
                    name: res.data.name,
                    email: res.data.email,
                    url: "http://graph.facebook.com/" + res.data.id + "/picture?width=300&height=300",
                    SocialId: res.data.id,
                    loginway: 'facebook'
                };

                $localstorage.setObject("localface", $scope.userInfo);
                $scope.parentobj.urlproperty = "http://graph.facebook.com/" + res.data.id + "/picture?width=300&height=300";
                $scope.parentobj.nameproperty = res.data.name;
                $scope.parentobj.emailproperty = res.data.email;
                $scope.parentobj.isloginproperty = 'true';


                Postall.createuser($scope.userInfo).then(function () {
                });
            });
        },
    function (error) {
        console.log(error);
    });
    }
    $scope.getdata = function () {


        //    var apiUrl = 'https://graph.facebook.com/v2.8/me?fields=id,name,picture&access_token=EAACEdEose0cBACt5xrs34BwKVvaIdjZCzxJhI56r0VY41FjqIAsguVBzMtUDoocCQhGGl43iORPZCnTUcZCa3HDFKHhTlORxmrOfp3wNPh85hVA58ctumZC6syTIIEsVWxx1xnk41fu9PqZByz3NjENNq5ifwAiu6ZBrAFHozm0QZDZD';

        //     $http.get(apiUrl+$scope.access_token).then(function (response) {
        //         $scope.data = response.data;
        //         alert(response.data.name);

        //    })

    };
    $scope.logingoogleplus = function () {
        $cordovaOauth.google(window.globalVariable.oAuth.googlePlus
            , ["https://www.googleapis.com/auth/urlshortener",
                "https://www.googleapis.com/auth/userinfo.email"]).then(function (result) {


                    $http.get("https://www.googleapis.com/oauth2/v1/userinfo", {
                        params: {
                            access_token: result.access_token,
                            format: "json"
                        }

                    }).then(function (res) {
                        $scope.userInfo = {
                            name: res.data.name,
                            email: res.data.email,
                            url: res.data.picture,
                            SocialId: res.data.id,
                            loginway: 'google+'

                        };


                        $localstorage.setObject("localgoogle", $scope.userInfo);

                        $scope.parentobj.urlproperty = $scope.userInfo.url;
                        $scope.parentobj.nameproperty = $scope.userInfo.name;
                        $scope.parentobj.emailproperty = $scope.userInfo.email;
                        $scope.parentobj.isloginproperty = 'true';


                        Postall.createuser($scope.userInfo).then(function () {


                        });
                    });
                }
            , function (error) {

                console.log(error);
            });

    };
    $scope.logintwitter = function () {


        var api_key = "KuYKsCimNAqb22vNqTWu2UxB0"; //Enter your Consumer Key (API Key)
        var api_secret = "RzTfo3oHNeYB9WMybE5mGWX2niTlBeFcFHQ6ohFrTXcEaPJ4DK"; // Enter your Consumer Secret (API Secret)
        //alert("twitterlogin function got called");
        //$ionicLoading.show({ template: 'Loading...' });
        //$cordovaOauth.twitter(api_key, api_secret).then(function (result) {
        //    alert(result);
        //    $scope.twitter = result;
        //    $ionicLoading.hide();

        var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }

        var credentials = Base64.encode(api_key + ':' + api_secret);

        console.log(credentials);

        // })
        ///  var url = 'https://api.twitter.com/1.1/users/show.json?screen_name=samehali112&user_id=823973091596505090';

        //'https://api.twitter.com/oauth2/tokenHTTP/1.1'

        //$http.get(url, {
        //    headers: {
        //        'Authorization': 'Basic ' + credentials
        //    }
        //}).then(function (data) {
        //    $scope.data = data.data;
        //    console.log(data);
        //});















        //    HTTP/1.1 200 OK
        //x-frame-options:
        //SAMEORIGIN
        //x-rate-limit-remaining:
        //899
        //last-modified:
        //Tue, 24 Jan 2017 21:14:58 GMT
        //status:
        //    200 OK
        //Content-Length:
        //1333
        //x-response-time:
        //126
        //Connection:
        //    keep-alive
        //x-transaction:
        //00bd3c1900a5d586
        //Server:
        //    tsa_b
        //pragma:
        //    no-cache
        //cache-control:
        //no-cache, no-store, must-revalidate, pre-check=0, post-check=0
        //x-connection-hash:
        //5ad4c8dc8b35ee8dd37f9876d31f65d6
        //x-xss-protection:
        //1; mode=block
        //x-content-type-options:
        //nosniff
        //x-rate-limit-limit:
        //900
        //expires:
        //    Tue, 31 Mar 1981 05:00:00 GMT
        //Date:
        //    Tue, 24 Jan 2017 21:14:58 GMT
        //set-cookie:
        //lang=ar; Path=/
        //set-cookie:
        //guest_id=v1%3A148529249837999840; Domain=.twitter.com; Path=/; Expires=Thu, 24-Jan-2019 21:14:58 UTC
        //x-rate-limit-reset:
        //1485293398
        //content-disposition:
        //attachment; filename=json.json
        //x-twitter-response-tags:
        //BouncerCompliant
        //strict-transport-security:
        //max-age=631138519
        //x-access-level:
        //read-write-directmessages
        //Content-Type:
        //application/json;charset=utf-8

        //{
        //    "id": 823973091596505100,
        //    "id_str": "823973091596505090",
        //    "name": "سامح على",
        //    "screen_name": "samehali112",
        //    "location": "",
        //    "profile_location": null,
        //    "description": "",
        //    "url": null,
        //    "entities":  {
        //        "description":  {
        //            "urls":  []
        //        }
        //    },
        //    "protected": false,
        //    "followers_count": 1,
        //    "friends_count": 30,
        //    "listed_count": 0,
        //    "created_at": "Tue Jan 24 19:17:48 +0000 2017",
        //    "favourites_count": 0,
        //    "utc_offset": null,
        //    "time_zone": null,
        //    "geo_enabled": false,
        //    "verified": false,
        //    "statuses_count": 0,
        //    "lang": "ar",
        //    "contributors_enabled": false,
        //    "is_translator": false,
        //    "is_translation_enabled": false,
        //    "profile_background_color": "F5F8FA",
        //    "profile_background_image_url": null,
        //    "profile_background_image_url_https": null,
        //    "profile_background_tile": false,
        //    "profile_image_url": "http://abs.twimg.com/sticky/default_profile_images/default_profile_2_normal.png",
        //    "profile_image_url_https": "https://abs.twimg.com/sticky/default_profile_images/default_profile_2_normal.png",
        //    "profile_link_color": "1DA1F2",
        //    "profile_sidebar_border_color": "C0DEED",
        //    "profile_sidebar_fill_color": "DDEEF6",
        //    "profile_text_color": "333333",
        //    "profile_use_background_image": true,
        //    "has_extended_profile": false,
        //    "default_profile": true,
        //    "default_profile_image": true,
        //    "following": false,
        //    "follow_request_sent": false,
        //    "notifications": false,
        //    "translator_type": "none",
        //    "suspended": false,
    };
});

