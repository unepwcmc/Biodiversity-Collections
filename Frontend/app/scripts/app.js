define(['include', 'language'], function (angularAMD, language) {

    'use strict';

    var app = angular.module('Biodiversity-Collection',  [
            'ui.router',
            'ngResource',
            'ngSanitize',
            'ngCookies',
            'toastr',
            'pascalprecht.translate',
            'leaflet-directive',
            'angucomplete-alt',
            'ncy-angular-breadcrumb',
            'tableSort'
        ]
    );

    app.config(['$stateProvider', '$provide', '$urlRouterProvider', '$httpProvider',

        function ($stateProvider, $provide, $urlRouterProvider, $httpProvider, toastr) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider

                .state('home', angularAMD.route(
                    {
                        url: '/home',
                        templateUrl: 'views/home/default.html',
                        controllerUrl: 'home/controllers/homeController',
                        ncyBreadcrumb: {
                            label: 'Home'
                        }

                    }))
                .state('search', angularAMD.route(
                    {
                        url: '/search/:type/:term',
                        templateUrl: 'views/search/default.html',
                        controllerUrl: 'search/controllers/searchController',
                        ncyBreadcrumb: {
                            label: 'Result Page',
                            parent: 'home'
                        }
                    }))
                .state('admin', angularAMD.route(
                    {
                        url: '/admin',
                        templateUrl: 'views/admin/default.html',
                        controllerUrl: 'admin/controllers/adminController',
                        ncyBreadcrumb: {
                            label: 'Administration Overview',
                            parent: 'home'
                        }
                    }))
                .state('report', angularAMD.route(
                    {
                        url: '/report',
                        templateUrl: 'views/report/default.html',
                        controllerUrl: 'report/controllers/reportController',
                        ncyBreadcrumb: {
                            label: 'Dashboard',
                            parent: 'home'
                        }
                    }))
                .state('adminUserCreate', angularAMD.route(
                    {
                        url: '/admin/user/create',
                        templateUrl: 'views/user/default.html',
                        controllerUrl: 'user/controllers/userController',
                        ncyBreadcrumb: {
                            label: 'User Create',
                            parent: 'admin'
                        }
                    }))
                .state('adminUserEdit', angularAMD.route(
                    {
                        url: '/admin/user/edit/:id',
                        templateUrl: 'views/user/default.html',
                        controllerUrl: 'user/controllers/userController',
                        ncyBreadcrumb: {
                            label: 'User Edit',
                            parent: 'admin'
                        }
                    }))
                .state('adminInstitutionCreate', angularAMD.route(
                    {
                        url: '/admin/institution/create',
                        templateUrl: 'views/institution/default.html',
                        controllerUrl: 'institution/controllers/institutionController',
                        ncyBreadcrumb: {
                            label: 'Institution Create',
                            parent: 'admin'
                        }
                    }))
                .state('adminInstitutionEdit', angularAMD.route(
                    {
                        url: '/admin/institution/edit/:id',
                        templateUrl: 'views/institution/default.html',
                        controllerUrl: 'institution/controllers/institutionController',
                        ncyBreadcrumb: {
                            label: 'Institution Edit',
                            parent: 'admin'
                        }
                    }))
                .state('collection', angularAMD.route(
                    {
                        url: '/collection/:id',
                        params: {isNew : false},
                        templateUrl: 'views/collection/default.html',
                        controllerUrl: 'collection/controllers/collectionController',
                        ncyBreadcrumb: {
                            label: 'Collection',
                            parent: function($scope) {

                                switch ( $scope.fromState ){

                                    case '':{
                                        return 'home';
                                    }
                                    case 'home':{
                                        return 'home';
                                    }
                                    case 'search': {
                                        return 'search({type: searchType, term: searchTerm})';
                                    }
                                    default:{
                                        return 'home'
                                    }
                                }
                            }
                        }
                    }))
                .state('collectionSample', angularAMD.route(
                    {
                        url: '/collection/:id/sample',
                        params: {sampleId: null},
                        templateUrl: 'views/sample/collection.sample.html',
                        controllerUrl: 'sample/controllers/collectionSampleController',
                        ncyBreadcrumb: {
                            label:  'Sample',
                            parent: function($scope) {
                                return 'collection({id: collection_id})';
                            }
                        }
                    }))
                .state('network', angularAMD.route(
                    {
                        url: '/network/:id',
                        params: {isNew : false},
                        templateUrl: 'views/network/default.html',
                        controllerUrl: 'network/controllers/networkController',
                        ncyBreadcrumb: {
                            label: 'Network',
                            parent: function($scope) {

                                switch ( $scope.fromState ){

                                    case '':{
                                        return 'home';
                                    }
                                    case 'home':{
                                        return 'home';
                                    }
                                    case 'search': {
                                        return 'search({type: searchType, term: searchTerm})';
                                    }
                                    default:{
                                        return 'home'
                                    }
                                }
                            }
                        }
                    }))
                .state('curator', angularAMD.route(
                    {
                        url: '/curator/:id',
                        templateUrl: 'views/curator/default.html',
                        controllerUrl: 'curator/controllers/curatorController',
                        ncyBreadcrumb: {
                            label: 'Curator',
                            parent: function($scope) {

                                switch ( $scope.fromState ){

                                    case '':{
                                        return 'home';
                                    }
                                    case 'home':{
                                        return 'home';
                                    }
                                    case 'search': {
                                        return 'search({type: searchType, term: searchTerm})';
                                    }
                                    default:{
                                        return 'home'
                                    }
                                }
                            }
                        }
                    }))
                .state('curatorSignup', angularAMD.route(
                    {
                        url: '/curator/signup/:token',
                        params: {isNew : true},
                        templateUrl: 'views/curator/default.html',
                        controllerUrl: 'curator/controllers/curatorController',
                        ncyBreadcrumb: {
                            label: 'New Curator',
                            parent: 'home'
                        }
                    }))
                .state('institution', angularAMD.route(
                    {
                        url: '/institution/:id',
                        templateUrl: 'views/institution/default.html',
                        controllerUrl: 'institution/controllers/institutionController',
                        ncyBreadcrumb: {
                            label: 'Institution',
                            parent: function($scope) {

                                switch ( $scope.fromState ){

                                    case '':{
                                        return 'home';
                                    }
                                    case 'home':{
                                        return 'home';
                                    }
                                    case 'search': {
                                        return 'search({type: searchType, term: searchTerm})';
                                    }
                                    default:{
                                        return 'home'
                                    }
                                }
                            }
                        }
                    }))
                .state('member', angularAMD.route(
                    {
                        url: '/collection/:id/member',
                        templateUrl: 'views/member/default.html',
                        controllerUrl: 'member/controllers/memberController',
                        ncyBreadcrumb: {
                            label:  'Member',
                            parent: function($scope) {
                                return 'collection({id: collection_id})';
                            }
                        }
                    }))
                .state('editUserSettings', angularAMD.route(
                    {
                        url: '/user/edit/:id',
                        templateUrl: 'views/user/default.html',
                        controllerUrl: 'user/controllers/userController',
                        ncyBreadcrumb: {
                            label: 'User Edit',
                            parent: 'admin'
                        }
                    }))
                .state('signup', angularAMD.route(
                    {
                        url: '/user/signup',
                        templateUrl: 'views/user/default.html',
                        controllerUrl: 'user/controllers/userController',
                        ncyBreadcrumb: {
                            label: 'New user',
                            parent: function($scope) {
                                return $scope.fromState == 'home'? 'home' : 'home';
                            }
                        }
                    }))
                .state('reset', angularAMD.route(
                    {
                        url: '/reset/:token',
                        templateUrl: 'views/auth/reset.password.html',
                        controllerUrl: 'auth/controllers/authController'
                    }))
                .state('resetYourPassword', angularAMD.route(
                    {
                        url: '/reset',
                        templateUrl: 'views/auth/reset.password.html',
                        controllerUrl: 'auth/controllers/authController'
                    }))
                .state('forgot', angularAMD.route(
                    {
                        url: '/forgot',
                        templateUrl: 'views/auth/forgot.password.html',
                        controllerUrl: 'auth/controllers/authController'
                    }))
                .state('sample', angularAMD.route(
                    {
                        url: '/sample/:id',
                        templateUrl: 'views/sample/default.html',
                        controllerUrl: 'sample/controllers/sampleController',
                        ncyBreadcrumb: {
                            label: 'Sample',
                            parent: function($scope) {

                                switch ( $scope.fromState ){

                                    case '':{
                                        return 'home';
                                    }
                                    case 'home':{
                                        return 'home';
                                    }
                                    case 'collection':{
                                        return 'collection({id: collection_id})';
                                    }
                                    case 'collectionSample':{
                                        return 'collection({id: collection_id})';
                                    }
                                    case 'search': {
                                        return 'search({type: searchType, term: searchTerm})';
                                    }
                                    default:{
                                        return 'home'
                                    }
                                }
                            }
                        }
                    }));

            $provide.factory('authInterceptor', ['$rootScope', '$q', '$window', '$cookies',
                function ($rootScope, $q, $window, $cookies) {
                    return {
                        request: function (config) {
                            config.headers = config.headers || {};
                            if ($cookies.get('tokenSecret') && $cookies.get('tokenSecret') != "null") {
                                config.headers['X-AUTH-TOKEN'] = $cookies.get('tokenSecret');
                                $rootScope.username = $cookies.get('user');
                                $rootScope.userId = $cookies.get('userId');
                                $rootScope.userRole = $cookies.get('userRole');
                                $rootScope.fullName = $cookies.get('fullName');
                                $rootScope.logged = true;
                            } else {
                                config.headers['X-AUTH-TOKEN'] = app.token;
                                $rootScope.username = null;
                                $rootScope.fullName = null;
                                $rootScope.userId = null;
                                $rootScope.userRole = null;
                                $rootScope.logged = false;
                            }
                            return config;
                        },
                        response: function (response) {
                            if (response.status === 401) {
                                // handle the case where the user is not authenticated
                            }
                            if (response.status === 400) {
                                console.log('400');
                            }
                            return response || $q.when(response);
                        }
                    };
                }]);

            $provide.factory('errorHandlerInterceptor', ['$rootScope', '$q', '$window', '$location', 'toastr',
                function ($rootScope, $q, $window, $location, toastr) {
                    return {
                        request: function(config) {
                            return config;
                        },
                        requestError : function(rejection) {
                            return rejection;
                        },
                        responseError : function(rejection) {
                            if( rejection.status === 401 ) {
                                if (rejection.config.url.indexOf("/login") < 0) {
                                    $rootScope.$broadcast("ErrorInterceptor", 401, rejection.statusText);
                                }
                                return $q.reject(rejection);
                            }
                            if( rejection.status === 400 ) {
                                if (rejection.config.url.indexOf("/search") > 0) {
                                    $rootScope.$broadcast("SearchErrorInterceptor", 400);
                                    return;
                                }
                                if (rejection.config.url.indexOf("/forgetpassword") < 0) {
                                    $rootScope.$broadcast("ErrorInterceptor", 400);
                                }
                                return $q.reject(rejection);
                            }
                            if( rejection.status === 404 ) {
                                $rootScope.$broadcast("ErrorInterceptor", 404);
                                return $q.reject(rejection);
                            }
                            if( rejection.status >= 500) {
                                $rootScope.$broadcast("ErrorInterceptor", 500);
                                return $q.reject(rejection);
                            }
                            return $q.reject(rejection);

                        }
                    };
                }]);

            $httpProvider.interceptors.push('authInterceptor');
            $httpProvider.interceptors.push('errorHandlerInterceptor');

        }]);

    app.config(['toastrConfig', '$translateProvider','$breadcrumbProvider',
        function (toastrConfig, $translateProvider, $breadcrumbProvider) {

            angular.extend(toastrConfig, {
                allowHtml: false,
                closeButton: true,
                closeHtml: '<span class="close_button"></span>'
            });

            $breadcrumbProvider.setOptions({
                prefixStateName: 'home',
                template: 'bootstrap3'
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

    app.run(['$rootScope', '$timeout', '$http', '$window', '$cookies',
        function ($rootScope, $timeout, $http, $window, $cookies) {

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
             * Process the user login
             */
            $rootScope.login = function(user, callback) {

                $http.post( $rootScope.getHost() + "login", user )
                    .success(function (data, status, headers, config) {

                        $cookies.put('user', data.user.username);
                        $cookies.put('userId', data.user.id);
                        $cookies.put('userRole', data.user.userRole.role);
                        $cookies.put('tokenSecret', data.token);
                        $cookies.put('fullName', data.user.firstName + ' ' + data.user.lastName);

                        $http.defaults.headers.common['X-AUTH-TOKEN'] = data.token;

                        $rootScope.userRole = data.user.userRole.role;
                        $rootScope.userId = data.user.id;
                        $rootScope.username = data.user.username;
                        $rootScope.fullName = data.user.firstName + ' ' + data.user.lastName;
                        $rootScope.logged = true;

                        if (callback) {
                            callback(data, status, headers, config);
                        }

                        $rootScope.$broadcast("AuthenticationDone", data.user);
                    })
                    .error(function(data, status, headers, config){
                            if (callback) {
                                callback(data, status, headers, config);
                            }
                        }
                    );

            };

            /**
             * Process the user logout
             */
            $rootScope.logout = function(callback) {

                $http.post( $rootScope.getHost() + "logout", {} )

                    .success(function (data, status, headers, config) {

                        $rootScope.cleanCredentials();

                        if (callback) {
                            callback(data, status, headers, config);
                        }

                        $rootScope.$broadcast("LogoutDone");
                    })
                    .error(function(data, status, headers, config){
                        $rootScope.cleanCredentials();

                        if (callback) {
                            callback(data, status, headers, config);
                        }
                        $rootScope.$broadcast("LogoutDone");
                    });
            };

            /**
             * Clean the user logged credentials
             */
            $rootScope.cleanCredentials = function() {

                $cookies.remove('user');
                $cookies.remove('userId');
                $cookies.remove('userRole');
                $cookies.remove('tokenSecret');
                $cookies.remove('fullName');

                $http.defaults.headers.common['X-AUTH-TOKEN'] = undefined;

                $rootScope.userRole = null;
                $rootScope.userId = null;
                $rootScope.username = null;
                $rootScope.fullName = null;
                $rootScope.logged = false;
            };

        }]);

    return angularAMD.bootstrap(app);
});
