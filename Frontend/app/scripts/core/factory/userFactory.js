/**
 * User Factory Model
 */
define(['app'], function (app) {

    'use strict';

    app.factory('User', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         * @constructor
         */
        function User(userData) {

            if (userData) {
                this.setData(userData);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        User.prototype = {

            /**
             *
             * @param data
             */
            setData: function (data) {
                angular.extend(this, data);
            },
            list: function (page, size) {
                var self = this;
                $http.get( $rootScope.getHost() + "users/search" + "?page=" +  page + "&size=" +   size)
                    .success(function (data) {
                        self.setData( data );
                        $rootScope.$broadcast("UsersListed");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            search: function (filter, page, size) {
                var self = this;
                $http.get( $rootScope.getHost() + "users/search/" + filter + "?page=" +  page + "&size=" +   size)
                    .success(function (data) {
                        self.setData( data );
                        $rootScope.$broadcast("UsersListed");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            load: function (id) {
                var self = this;
                $http.get( $rootScope.getHost() + "users/" + id)
                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("UserLoaded");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            update: function (model, callback) {
                $http.put( $rootScope.getHost() + "users/" + model.id, model)
                    .success(function (data, status, headers, config) {
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config){
                        callback(data, status, headers, config);
                    }
                );
            },
            save: function (model, callback) {
                $http.post( $rootScope.getHost() + "users/", model)
                    .success(function (data, status, headers, config) {

                        if(callback)
                            callback(data, status, headers, config);

                        $rootScope.$broadcast("USER_SAVED");
                    })
                    .error(function(data, status, headers, config){

                        if(callback)
                            callback(data, status, headers, config);

                        $rootScope.$broadcast("USER_SAVED_ERROR");
                    }
                );
            },
            insert: function ( model, callback ) {

                $http.post( $rootScope.getHost() + "users/signup", model )
                    .success(function (data, status, headers, config) {
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config){
                        callback(data, status, headers, config);
                    }
                );
            },
            delete: function (id, callback) {
                $http.delete( $rootScope.getHost() + "users/" + id, this)
                    .success(function (data, status, headers, config) {
                        callback(data, status, headers, config);
                    })
                    .error(function(data, status, headers, config){
                        callback(data, status, headers, config);
                    }
                );
            }

        };

        return User;

    }]);
});