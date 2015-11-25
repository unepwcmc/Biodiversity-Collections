define(['include', 'language'], function (angularAMD, language) {

    'use strict';

    var app = angular.module('Biodiversity-Collection', ['ui.router', 'ngResource', 'ngSanitize','ngCookies', 'toastr', 'pascalprecht.translate','leaflet-directive','angucomplete-alt']);

    app.config(['$stateProvider', '$provide', '$urlRouterProvider', '$httpProvider',

        function ($stateProvider, $provide, $urlRouterProvider, $httpProvider, toastr) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider

                .state('home', angularAMD.route(
                    {
                        url: '/home',
                        templateUrl: 'views/home/default.html',
                        controllerUrl: 'home/controllers/homeController'

                    }))
                .state('search', angularAMD.route(
                    {
                        url: '/search/:term',
                        templateUrl: 'views/search/default.html',
                        controllerUrl: 'search/controllers/searchController'
                    }))
                .state('collection', angularAMD.route(
                    {
                        url: '/collection/:id',
                        templateUrl: 'views/collection/default.html',
                        controllerUrl: 'collection/controllers/collectionController'
                    }))
                .state('sample', angularAMD.route(
                    {
                        url: '/sample/:id',
                        templateUrl: 'views/sample/default.html',
                        controllerUrl: 'sample/controllers/sampleController'
                    }));

            $provide.factory('authInterceptor', ['$rootScope', '$q', '$window',
                function ($rootScope, $q, $window) {

                    return {
                        request: function (config) {
                            config.headers = config.headers || {};
                            if ($window.sessionStorage.tokenSecret !== null && $window.sessionStorage.tokenSecret !== 'null') {
                                config.headers['X-AUTH-TOKEN'] = $window.sessionStorage.tokenSecret;
                                $rootScope.username = $window.sessionStorage.user;
                                $rootScope.userId = $window.sessionStorage.userId;
                                $rootScope.userRole = $window.sessionStorage.userRole;
                                $rootScope.fullName = $window.sessionStorage.fullName;
                                $rootScope.logged = true;
                            } else {
                                $rootScope.username = null;
                                $rootScope.userId = null;
                                $rootScope.userRole = null;
                                $rootScope.fullName = null;
                                $rootScope.logged = false;
                            }
                            return config;
                        },
                        response: function (response) {
                            if (response.status === 401) {
                                // handle the case where the user is not authenticated
                            }
                            return response || $q.when(response);
                        }
                    };

                }]);

            $provide.factory('errorHandlerInterceptor', ['$rootScope', '$q', '$window', '$location', 'toastr',
                function ($rootScope, $q, $window, $location, toastr) {
                    return {
                        request: function (config) {
                            return config;
                        },
                        requestError: function (rejection) {
                            return rejection;
                        },
                        responseError: function (rejection) {
                            if (rejection.status === 401) {
                                if (rejection.statusText == 'token expired') {
                                    toastr.info('User session token expired. Please, process the login again.', 'Information');
                                    $rootScope.cleanCredentials();
                                    $location.path('login');
                                } else {
                                    toastr.error('User not authorized', 'Error');
                                }
                            }
                            if (rejection.status === 400) {
                                if (rejection.data !== null && rejection.data.message === 'Access is denied') {
                                    $rootScope.cleanCredentials();
                                    $location.path('login');
                                }
                                toastr.info('Bad request', 'Information');
                                return $q.reject(rejection);
                            }
                            if (rejection.status === 404) {
                                toastr.warning('Resource not found', 'Information');
                                return $q.reject(rejection);
                            }

                            if (rejection.status >= 500) {
                                toastr.error('The system is unstable, please try again later!!!', 'Sorry');
                                return $q.reject(rejection);
                            }

                            return $q.reject(rejection);

                        }
                    };
                }]);

            $httpProvider.interceptors.push('authInterceptor');
            $httpProvider.interceptors.push('errorHandlerInterceptor');

        }]);

    app.config(['toastrConfig', '$translateProvider',
        function (toastrConfig, $translateProvider) {

            angular.extend(toastrConfig, {
                allowHtml: false,
                closeButton: true,
                closeHtml: '<span class="close_button"></span>'
            });

            $translateProvider.translations('pt_BR', language.pt_BR);
            $translateProvider.translations('en_GB', language.en_GB);

            $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
            //$translateProvider.preferredLanguage('pt_BR');
            $translateProvider.preferredLanguage('en_GB');
        }]);

    app.CONST = {
        //LOCALHOST: "http://localhost:8080/", //LOCAL
        LOCALHOST:"http://ec2-54-94-203-12.sa-east-1.compute.amazonaws.com:8080/", // DEV
        //LOCALHOST:"http://ec2-54-94-149-79.sa-east-1.compute.amazonaws.com:8080/", // QA
        //SERVER:"http://ec2-54-94-149-79.sa-east-1.compute.amazonaws.com:8080/", // QA
        SERVER: "http://ec2-54-94-203-12.sa-east-1.compute.amazonaws.com:8080/"  // DEV
    };

    app.run(['$rootScope', '$timeout', '$http', '$window',
        function ($rootScope, $timeout, $http, $window) {

            /**
             * Return the current host
             *
             * @returns {*}
             */
            $rootScope.getHost = function () {

                if (document.location.hostname === 'localhost') {

                    return app.CONST.LOCALHOST;
                }
                else {
                    return app.CONST.SERVER;
                }
            };

            /**
             * Process the user logout
             */
            $rootScope.logout = function (callback) {
                $http.post($rootScope.getHost() + "logout", {})
                    .success(function (data, status, headers, config) {
                        $rootScope.cleanCredentials();
                        if (callback) {
                            callback(data, status, headers, config);
                        }
                        $rootScope.$broadcast("LogoutDone");
                    })
                    .error(function (data, status, headers, config) {
                        $rootScope.cleanCredentials();
                        if (callback) {
                            callback(data, status, headers, config);
                        }
                    }
                );
            };

            /**
             * Clean the user logged credentials
             */
            $rootScope.cleanCredentials = function () {
                $window.sessionStorage.user = null;
                $window.sessionStorage.userId = null;
                $window.sessionStorage.userRole = null;
                $window.sessionStorage.tokenSecret = null;
                $window.sessionStorage.apiToken = null;
                $window.sessionStorage.fullName = null;
                $http.defaults.headers.common['X-AUTH-TOKEN'] = undefined;

                $rootScope.userRole = null;
                $rootScope.username = null;
                $rootScope.fulName = null;
                $rootScope.logged = false;
            };

        }]);

    return angularAMD.bootstrap(app);
});
