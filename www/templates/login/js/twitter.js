//(function() {
//         var serviceModule = angular.module('InfoDashboard.services', ['ngResource'])
 
//         serviceModule.factory('twitter', function ($resource, $http) {
//            var consumerKey = encodeURIComponent('<your consumer key>')
//            var consumerSecret = encodeURIComponent('<your consumer secret>')
//            var credentials = Base64.encode(consumerKey + ':' + consumerSecret)
//            // Twitters OAuth service endpoint
//            var twitterOauthEndpoint = $http.post(
//                'https://api.twitter.com/oauth2/token'
//                , "grant_type=client_credentials"
//                , {headers: {'Authorization': 'Basic ' + credentials, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}
//            )
//            twitterOauthEndpoint.success(function (response) {
//                // a successful response will return
//                // the "bearer" token which is registered
//                // to the $httpProvider
//                serviceModule.$httpProvider.defaults.headers.common['Authorization'] = "Bearer " + response.access_token
//            }).error(function (response) {
//                  // error handling to some meaningful extent
//                })
 
//            var r = $resource('https://api.twitter.com/1.1/search/:action',
//                {action: 'tweets.json',
//                    count: 10,
//                },
//                {
//<span style="line-height: 1.5;">                    paginate: {method: 'GET'}</span>
//                })
 
//            return r;
//        }
//...
//        .config(function ($httpProvider) {
//           serviceModule.$httpProvider = $httpProvider
//        });
//})()