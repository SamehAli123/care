﻿

window.globalVariable = {
    //custom color style variable
    color: {
        appPrimaryColor: "",
        dropboxColor: "#017EE6",
        facebookColor: "#3C5C99",
        foursquareColor: "#F94777",
        googlePlusColor: "#D73D32",
        instagramColor: "#517FA4",
        wordpressColor: "#0087BE"
    },// End custom color style variable
    startPage: {
        url: "/app/dashboard",//Url of start page.
        state: "app.dashboard"//State name of start page.
    },
    message: {
        errorMessage: "Technical error please try again later." //Default error message.
    },
    oAuth: {
        facebook: "1178450775605770",//Use for Facebook API appID.
        instagram: "your_api_key",//Use for Instagram API clientID.
        googlePlus: "441613439219-mnfbn6ate9e013acr7li3e0n0vens5pf.apps.googleusercontent.com",//Use for Google API clientID.
    }
};

angular.module('starter', ['ionic', 'ngIOS9UIWebViewPatch', 'starter.controllers', 'ngMaterial', 'ngMessages', 'ngCordova', 'starter.getall', 'starter.rea', 'starter.localstorge', 'starter.postall', 'starter.password'])
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet, $cordovaGeolocation) {





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



        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu/html/menu.html",
                controller: 'menuCtrl'
            })











            .state('app.dashboard', {
                url: "/dashboard",
                cashe: false,
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
            photo: null,
        },
        views: {
            'menuContent': {
                templateUrl: "templates/gallary/html/gallary-only-img.html",
                controller: 'gallary-only-imgCtrl'
            }
        }
    })




             .state('app.login', {
                 url: "/login",
                 views: {
                     'menuContent': {
                         templateUrl: "templates/login/html/login.html",
                         controller: 'loginCtrl'
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






            .state('app.askdoc', {
                url: "/askdoc",
                params: {
                    back: 'true'
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/askdoc/html/askdoc.html",
                        controller: 'askdocCtrl'
                    }
                }
            })


            .state('app.question', {
                url: "/question",
                params: {
                    isAnimated: true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/askdoc/html/question.html",
                        controller: 'questionCtrl'
                    }
                }
            })






          .state('app.book', {
              url: "/book",
              params: {
                  isAnimated: true
              },
              views: {
                  'menuContent': {
                      templateUrl: "templates/book/html/book.html",
                      controller: 'bookingCtrl'
                  }
              }
          })

           .state('app.connectus', {
               url: "/connectus",
               params: {
                   isAnimated: true
               },
               views: {
                   'menuContent': {
                       templateUrl: "templates/connectus/html/connectus.html",
                       controller: 'connectCtrl'
                   }
               }
           })




          .state('app.insurence', {
              url: "/insurence",
              params: {
                  isAnimated: true
              },
              views: {
                  'menuContent': {
                      templateUrl: "templates/insurence services/html/insurenceservices.html",
                      controller: 'insurenceCtrl'
                  }
              }
          })


             .state('app.insurenece-details', {
                 url: "/gallary-only-img",
                 params: {
                     photo: null,
                 },
                 views: {
                     'menuContent': {
                         templateUrl: "templates/insurence services/html/insurence-details.html",
                         controller: 'gallary-only-imgCtrl'
                     }
                 }
             })











          .state('app.map', {
              url: "/map",
              params: {
                  isAnimated: true
              },
              views: {
                  'menuContent': {
                      templateUrl: "templates/map/html/map.html",
                      controller: 'mapCtrl'
                  }
              }
          })





            .state('app.services', {
                url: "/services",
                params: {
                    isAnimated: true
                },
                views: {
                    'menuContent': {
                        templateUrl: "templates/services/html/services.html",
                        controller: 'servicesCtrl'
                    }
                }
            })





           .state('app.suggestion', {
               url: "/suggestion",
               params: {
                   isAnimated: true
               },
               views: {
                   'menuContent': {
                       templateUrl: "templates/suggestions/html/suggestion.html",
                       controller: 'suggestionCtrl'
                   }
               }
           })



              .state('app.register', {
                  url: "/register",
                  params: {
                      isAnimated: true
                  },
                  views: {
                      'menuContent': {
                          templateUrl: "templates/register/html/register.html",
                          controller: 'registerCtrl'
                      }
                  }
              })





              .state('app.verfiy', {
                  url: "/verfiy",
                  params: {
                      code: null,
                      object: null
                  },
                  views: {
                      'menuContent': {
                          templateUrl: "templates/verifynum/html/verfiy.html",
                          controller: 'verfiyCtrl'
                      }
                  }
              })





        $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

    });
