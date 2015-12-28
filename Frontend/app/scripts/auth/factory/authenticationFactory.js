/**
 * AuthenticationService Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['app'], function (app) {

    'use strict';

    app.factory('AuthenticationService', ['$http', '$window', '$rootScope', '$location', '$cookies',
        function ($http, $window, $rootScope, $location, $cookies) {

        var service = {};


        service.registration = function ( model, callback ){

            $http.post( $rootScope.getHost() + "users/signup", model )
                .success(function (data, status, headers, config) {
                    callback(data, status, headers, config);
                })
                .error(function(data, status, headers, config){
                    callback(data, status, headers, config);
                }
            );
        };

        service.updateUser = function ( id, model, callback ){

            $http.put( $rootScope.getHost() + "users/" + id, model )
                .success(function (data, status, headers, config) {
                    callback(data, status, headers, config);
                })
                .error(function(data, status, headers, config){
                    callback(data, status, headers, config);
                }
            );
        };

        service.forgetPassword = function ( email, callback ) {

            $http.post( $rootScope.getHost() + "users/password/forget?email=" + email +
                "&callback=" + $location.host() + ":" + $location.port(), null)
                .success(function (data, status, headers, config) {
                    callback(data, status, headers, config);
                })
                .error(function(data, status, headers, config){
                    callback(data, status, headers, config);
                }
            );
        };

        service.resetPassword = function ( token, password, callback ) {

            $http.post( $rootScope.getHost() + "users/password/reset?token=" + token +
                "&password=" + password, null)
                .success(function (data, status, headers, config) {
                    callback(data, status, headers, config);
                })
                .error(function(data, status, headers, config){
                    callback(data, status, headers, config);
                }
            );
        };

        return service;
    }]);
});
