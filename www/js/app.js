

window.globalVariable = {

    startPage: {
        url: "/app/dashboard",
        state: "app.dashboard"

    },
    message: {
        errorMessage: "Technical error please try again later." 
    }

};// End Global variable


angular.module('starter', ['ionic', 'ngIOS9UIWebViewPatch', 'starter.controllers', 'ngMaterial', 'ngMessages', 'ngCordova'])
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet) {




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

            //Checking if view is changing it will go to this function.
            $rootScope.$on('$ionicView.beforeEnter', function () {
                //hide Action Control for android back button.
                hideActionControl();
                // Add custom style ti view.
                $rootScope.customStyle = createCustomStyle($ionicHistory.currentStateName());
            });
        });

    })

    .config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette, $mdIconProvider) {


        // Use for change ionic spinner to android pattern.
        $ionicConfigProvider.spinner.icon("android");
        $ionicConfigProvider.views.swipeBackEnabled(false);

        // mdIconProvider is function of Angular Material.
        // It use for reference .SVG file and improve performance loading.
        $mdIconProvider
            .icon('facebook', 'img/icons/facebook.svg')
            .icon('twitter', 'img/icons/twitter.svg')
            .icon('mail', 'img/icons/mail.svg')
            .icon('message', 'img/icons/message.svg')
            .icon('share-arrow', 'img/icons/share-arrow.svg')
            .icon('more', 'img/icons/more_vert.svg');

        //mdThemingProvider use for change theme color of Ionic Material Design Application.
        /* You can select color from Material Color List configuration :
         * red
         * pink
         * purple
         * purple
         * deep-purple
         * indigo
         * blue
         * light-blue
         * cyan
         * teal
         * green
         * light-green
         * lime
         * yellow
         * amber
         * orange
         * deep-orange
         * brown
         * grey
         * blue-grey
         */
        //Learn more about material color patten: https://www.materialpalette.com/
        //Learn more about material theme: https://material.angularjs.org/latest/#/Theming/01_introduction
        $mdThemingProvider
            .theme('default')
            .primaryPalette('light-green')
            .accentPalette('red');

        appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["500"]; //Use for get base color of theme.

        //$stateProvider is using for add or edit HTML view to navigation bar.

        //
        //Schema :
        //state_name(String)      : Name of state to use in application.
        //page_name(String)       : Name of page to present at localhost url.
        //cache(Bool)             : Cache of view and controller default is true. Change to false if you want page reload when application navigate back to this view.
        //html_file_path(String)  : Path of html file.
        //controller_name(String) : Name of Controller.
        //
        //Learn more about ionNavView at http://ionicframework.com/docs/api/directive/ionNavView/
        //Learn more about  AngularUI Router's at https://github.com/angular-ui/ui-router/wiki

        //$stateProvider.state('blank', {
        //    url: '/blank',
        //    templateUrl: 'templates/blank/html/blank.html',
        //    controller: 'blankCtrl'
        //});



        //$stateProvider.state('menuDashboard', {
        //    url: '/menuDashboard',
        //    templateUrl: 'templates/themes/menu-dashboard/html/menu-dashboard.html',
        //});


        //$stateProvider.state('app', {
        //    url: '/app',
        //    templateUrl: 'templates/menu/html/menu.html',
        //    controller: 'menuCtrl'
        //});
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
           

    
        .state('app.gallary', {
            url: "/gallary",
            params: {
                isAnimated: true
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/gallary/html/gallary.html",
                    controller: 'gallaryCtrl'
                }
            }
        })




    .state('app.gallary-only-img', {
        url: "/gallary-only-img",
        params: {
            product: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/gallary/html/gallary-only-img.html",
                controller: 'gallary-only-imgCtrl'
            }
        }
    })
















             .state('app.aboutus', {
                 url: "/aboutus",
                 params: {
                     isAnimated: true
                 },
                 views: {
                     'menuContent': {
                         templateUrl: "templates/aboutus/html/aboutus.html",
                         controller: 'aboutusCtrl'
                     }
                 }
             })



            .state('app.offers', {
                url: "/offers",
                params: {
                    isAnimated: true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/offers/html/offers.html",
                        controller: 'offersCtrl'
                    }
                }
            })



          .state('app.ourteam', {
              url: "/ourteam",
              params: {
                  isAnimated: true
              },
              views: {
                  'menuContent': {
                      templateUrl: "templates/ourteam/html/ourteam.html",
                      controller: 'ourteamCtrl'
                  }
              }
          })


           .state('app.facebook', {
               url: "/facebook",
               params: {
                   isAnimated: true
               },
               views: {
                   'menuContent': {
                       templateUrl: "templates/facebook/html/facebook.html",
                       controller: 'facebookCtrl'
                   }
               }
           })

        

                  .state('app.twitter', {
                      url: "/twitter",
                      params: {
                          isAnimated: true
                      },
                      views: {
                          'menuContent': {
                              templateUrl: "templates/twitter/html/twitter.html",
                              controller: 'twitterCtrl'
                          }
                      }
                  })
        


                  .state('app.instagram', {
                      url: "/instagram",
                      params: {
                          isAnimated: true
                      },
                      views: {
                          'menuContent': {
                              templateUrl: "templates/instagram/html/instagram.html",
                              controller: 'instagramCtrl'
                          }
                      }
                  })


          .state('app.youtube', {
              url: "/youtube",
              params: {
                  isAnimated: true
              },
              views: {
                  'menuContent': {
                      templateUrl: "templates/youtube/html/youtube.html",
                      controller: 'youtubeCtrl'
                  }
              }
          })



        
      
        $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

    });
