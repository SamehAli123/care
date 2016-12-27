

window.globalVariable = {

    startPage: {
        url: "/app/login",
        state: "app.login"

    },
    message: {
        errorMessage: "Technical error please try again later."
    }

};// End Global variable


angular.module('starter', ['ionic', 'starter.controllers', 'ngMaterial', 'ngMessages', 'ngCordova'])
    .run(function ($ionicPlatform, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet) {




        // End creating SQLite database table.

        // Create custom defaultStyle.
        function getDefaultStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important; " +
                "   border-style            : none;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        }// End create custom defaultStyle

        // Create custom style for product view.
        function getProductStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important;" +
                "   border-style            : none;" +
                "   background-image        : url('img/background_cover_pixels.png') !important;" +
                "   background-size         : initial !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        }// End create custom style for product view.

        // Create custom style for contract us view.
        function getContractUsStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : transparent !important;" +
                "   border-style            : none;" +
                "   background-image        : none !important;" +
                "   background-position-y   : 4px !important;" +
                "   background-size         : initial !important;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        } // End create custom style for contract us view.



        function initialRootScope() {
            $rootScope.appPrimaryColor = appPrimaryColor;
            // Add value of appPrimaryColor to rootScope for use it to base color.
            $rootScope.isAndroid = ionic.Platform.isAndroid();// Check platform of running device is android or not.
            $rootScope.isIOS = ionic.Platform.isIOS();// Check platform of running device is ios or not.
        };

        function hideActionControl() {
            //For android if user tap hardware back button, Action and Dialog should be hide.
            $mdBottomSheet.cancel();
            $mdDialog.cancel();
        };


        // createCustomStyle will change a style of view while view changing.
        // Parameter :
        // stateName = name of state that going to change for add style of that page.
        function createCustomStyle(stateName) {
            var customStyle =
                ".material-background {" +
                "   background-color          : " + appPrimaryColor + " !important;" +
                "   border-style              : none;" +
                "}" +
                ".spinner-android {" +
                "   stroke                    : " + appPrimaryColor + " !important;" +
                "}";


            customStyle += getDefaultStyle();

            return customStyle;
        }// End createCustomStyle

        // Add custom style while initial application.
        $rootScope.customStyle = createCustomStyle(window.globalVariable.startPage.state);

        $ionicPlatform.ready(function () {
            ionic.Platform.isFullScreen = true;
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            initialRootScope();


        });

    })

    .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdColorPalette, $mdIconProvider) {


        $mdThemingProvider
            .theme('default')
            .primaryPalette('light-green')
            .accentPalette('red');

        appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["500"]; //Use for get base color of theme.


        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu/html/menu.html",
                controller: 'menuCtrl'
            })


            .state('app.dashboard', {
                url: "/dashboard",
                params: {
                    isAnimated: true

                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/material-user-interface/dashboard/html/dashboard.html",
                        controller: 'dashboardCtrl'
                    }
                }
            })



          .state('app.login', {
              url: "/login",
              params: {
                  isAnimated: true
              },
              views: {
                  'menuContent': {
                      templateUrl: "templates/login/html/login.html",
                      controller: 'loginCtrl'
                  }
              }
          }
          )



            .state('app.doc', {
                url: "/doc",

                views: {
                    'menuContent': {
                        templateUrl: "templates/doc/html/doc.html",
                        controller: 'docCtrl'
                    }
                }
            })


          .state('app.add-doc', {
              url: "/doc",

              views: {
                  'menuContent': {
                      templateUrl: "templates/doc/html/add-doc.html",
                      controller: 'add-docCtrl'
                  }
              }
          })
        $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

    });
