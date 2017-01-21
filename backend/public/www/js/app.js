

window.globalVariable = {

    startPage: {
        url: "/blank/login",
        state: "blank.login"

    },
    message: {
        errorMessage: "Technical error please try again later."
    }

};


angular.module('starter', ['ionic', 'starter.controllers', 'ngMaterial', 'ngMessages', 'ngCordova', 'starter.user', 'starter.dash', 'starter.filckr', 'starter.gallary', 'starter.offer', 'starter.rea', 'starter.ourteam', 'starter.insurence', 'starter.suggestion', 'starter.doc', 'starter.admin'])
    .run(function ($ionicPlatform, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet) {


        function getDefaultStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important; " +
                "   border-style            : none;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        }
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
.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
}])
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




                   .state('blank', {
                       url: "/blank",
                       abstract: true,
                       templateUrl: "templates/blank/html/blank.html",
                       controller: 'blankCtrl'
                   })



             .state('blank.login', {
                 url: "/login",
                 params: {
                     isAnimated: true
                 },
                 views: {
                     'blankContent': {
                         templateUrl: "templates/login/html/login.html",
                         controller: 'loginCtrl'
                     }
                 }
             }
          )


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


            .state('app.doc', {
                url: "/doc",
                params: {
                    docs: null
                },
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


               .state('app.users', {
                   url: "/user",
                   params: {
                       object: null
                   },

                   views: {
                       'menuContent': {
                           templateUrl: "templates/user/html/user.html",
                           controller: 'userCtrl'
                       }
                   }
               })


            .state('app.reqs', {
                url: "/reqs",
                params: {
                    qes: null
                },

                views: {
                    'menuContent': {
                        templateUrl: "templates/questions/html/questions.html",
                        controller: 'quesCtrl'
                    }
                }
            })



        .state('app.justqes', {
            url: "/justreqs",
            params: {
                qes: null
            },
            views: {
                'menuContent': {
                    templateUrl: "templates/questions/html/queswithoutanswer.html",
                    controller: 'quesCtrl'
                }
            }
        })



          .state('app.gallary', {
              url: "/gallary",
              cashe: false,

              views: {
                  'menuContent': {
                      templateUrl: "templates/gallary/html/gallary.html",
                      controller: 'gallaryCtrl'
                  }
              }
          })



          .state('app.offers', {
              url: "/offers",
              params: {
                  back: 'success'
              },
              views: {
                  'menuContent': {
                      templateUrl: "templates/offers/html/offers.html",
                      controller: 'offersCtrl'
                  }
              }
          })





          .state('app.add-offers', {
              url: "/offers",
              cashe: false,
            
              views: {
                  'menuContent': {
                      templateUrl: "templates/offers/html/add-offers.html",
                      controller: 'add-offersCtrl'
                  }
              }
          })


           .state('app.ourteam', {
               url: "/ourteam",
               cashe: false,
               views: {
                   'menuContent': {
                       templateUrl: "templates/ourteam/html/ourteam.html",
                       controller: 'ourteamCtrl'
                   }
               }
           })

            .state('app.add-member', {
                url: "/add-member",
                cashe: false,
                views: {
                    'menuContent': {
                        templateUrl: "templates/ourteam/html/add-member.html",
                        controller: 'add-memberCtrl'
                    }
                }
            })





             .state('app.suggestions', {
                 url: "/suggestions",
                 cashe: false,
                 views: {
                     'menuContent': {
                         templateUrl: "templates/suggestions/html/suggestions.html",
                         controller: 'suggestionsCtrl'
                     }
                 }
             })



                 .state('app.insurence', {
                     url: "/insurence",
                     cashe: false,
                     params: {
                         back:null
                     },
                     views: {
                         'menuContent': {
                             templateUrl: "templates/insurence/html/insuarence.html",
                             controller: 'insurenceCtrl'
                         }
                     }
                 })


             .state('app.add-insurence', {
                 url: "/add-insurence",
                 cashe: false,
                 views: {
                     'menuContent': {
                         templateUrl: "templates/insurence/html/add-insurence.html",
                         controller: 'add-insurenceCtrl'

                     }
                 }
             })


 .state('app.insurenece-details', {
     url: "/insurenece-details",
     cashe: false,
     params: {
         photo: null,
     },
     views: {
         'menuContent': {
             templateUrl: "templates/insurence/html/insurence-details.html",
             controller: 'insurence-detailsCtrl'
         }
     }
 })


             .state('app.add-admin', {
                 url: "/add-admin",
                 cashe: false,
                
                 views: {
                     'menuContent': {
                         templateUrl: "templates/admin/html/add-admin.html",
                         controller: 'add-adminCtrl'

                     }
                 }
             })


             .state('app.admin', {
                 url: "/admin",
                 cashe: false,
                 params: {
                     back: null
                 },
                 views: {
                     'menuContent': {
                         templateUrl: "templates/admin/html/admin.html",
                         controller: 'adminCtrl'

                     }
                 }
             })

        $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

    });
