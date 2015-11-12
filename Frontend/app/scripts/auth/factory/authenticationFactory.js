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

        service.authentication = function ( model, callback) {

            $http.post( $rootScope.getTaxonomicHost() + "login", model )
              .success(function (data, status, headers, config) {

                  $cookies.put('user', data.user.username);
                  $cookies.put('userId', data.user.id);
                  $cookies.put('userRole', data.user.userRole.role);
                  $cookies.put('tokenSecret', data.token);
                  $cookies.put('fullName', data.user.firstName + ' ' + data.user.lastName);

                  $http.defaults.headers.common['X-AUTH-TOKEN'] = data.token;

                  callback(data, status, headers, config);

                  $rootScope.$broadcast("AuthenticationDone");
              })
              .error(function(data, status, headers, config){
                  callback(data, status, headers, config);
              }
            );
        };

        service.registration = function ( model, callback ){

            $http.post( $rootScope.getTaxonomicHost() + "users/signup", model )
                .success(function (data, status, headers, config) {
                    callback(data, status, headers, config);
                })
                .error(function(data, status, headers, config){
                    callback(data, status, headers, config);
                }
            );
        };

        service.updateUser = function ( id, model, callback ){

            $http.put( $rootScope.getTaxonomicHost() + "users/" + id, model )
                .success(function (data, status, headers, config) {
                    callback(data, status, headers, config);
                })
                .error(function(data, status, headers, config){
                    callback(data, status, headers, config);
                }
            );
        };

        service.forgetPassword = function ( email, callback ) {

            $http.post( $rootScope.getTaxonomicHost() + "users/forgetpassword?email=" + email +
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

            $http.post( $rootScope.getTaxonomicHost() + "users/resetpassword?token=" + token +
                "&password=" + password, null)
                .success(function (data, status, headers, config) {
                    callback(data, status, headers, config);
                })
                .error(function(data, status, headers, config){
                    callback(data, status, headers, config);
                }
            );
        };

        service.logout = function( callback ){

            $http.post( $rootScope.getTaxonomicHost() + "logout", {} )

                .success(function (data, status, headers, config) {

                    console.log('logout');

                    $cookies.remove('user');
                    $cookies.remove('userId');
                    $cookies.remove('userRole');
                    $cookies.remove('tokenSecret');
                    $cookies.remove('fullName');

                    var cookies = $cookies.getAll();
                    var prefix = 'occurrence_data_tmp$';
                    angular.forEach(cookies, function (v, k) {
                      if (k.slice(0, prefix.length) == prefix) {
                        $cookies.remove(k);
                      }
                    });

                    $http.defaults.headers.common['X-AUTH-TOKEN'] = undefined;

                    $rootScope.username = null;
                    $rootScope.logged = false;

                    callback(data, status, headers, config);

                    $rootScope.$broadcast("LogoutDone");
                })
                .error(function(data, status, headers, config){
                   callback(data, status, headers, config);
                }
             );
        };

        return service;
    }]);
});
