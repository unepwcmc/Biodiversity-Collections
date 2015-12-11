/**
 * Network Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.factory('Network', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Network(data) {

            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Network.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            loadByCollection: function( id, page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + 'networks/search/collection/' + id + '?page=' +  page + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("NETWORK_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("NETWORK_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("NETWORK_LOAD_ERROR");
                    });
            },
            load: function( page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + "networks" + '?page=' +  page + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("NETWORK_LOAD_ERROR");
                        } else {
                            self.setData(data);
                                $rootScope.$broadcast("NETWORK_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("NETWORK_LOAD_ERROR");
                    });
            },
            loadById: function( id ){

                var self = this;

                $http.get( $rootScope.getHost() + "networks/" + id)

                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("NETWORK_LOADED_BY_ID");
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("NETWORK_LOADED_BY_ID_ERROR");
                    });
            },
            search: function( query, page, size ) {

                var self = this;

                $http.get( $rootScope.getHost() + "networks/search/name?name=" + query + "&page=" + page + "&size=" + size )

                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("NETWORK_SEARCHED", data);
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("NETWORK_SEARCHED_SEARCH_ERROR");
                    });
            },
            autocomplete: function( query, callback ) {

                return $http.get( $rootScope.getHost() + "networks/search/autocomplete?name=" + query  )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("NETWORK_AUTOCOMPLETE_LOAD_ERROR");
                        } else {
                            $rootScope.$broadcast("NETWORK_AUTOCOMPLETE_LOADED", data);
                            if (callback) {
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("NETWORK_AUTOCOMPLETE_LOAD_ERROR");
                    });
            },
            update: function () {
                var self = this;
                $http.put( $rootScope.getHost() + "networks/" + this.id, this)
                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("NETWORK_UPDATED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            save: function () {
                var self = this;
                $http.post( $rootScope.getHost() + "networks/", this)
                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("NETWORK_SAVED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            delete: function (id) {
                $http.delete( $rootScope.getHost() + "networks/" + id)
                    .success(function (data) {
                        $rootScope.$broadcast("NETWORK_DELETED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            addImage: function( data, callback ){
                var self = this;
                var fd = new FormData();
                fd.append('file', data);

                $http.post($rootScope.getHost() + "networks/" + this.id + "/media", fd, {
                    headers : {
                        'Content-Type' : undefined
                    }
                }).success(function (data, status, headers, config) {
                        self.setData(data);
                        $rootScope.$broadcast("IMAGE_ADDED");
                        if(callback)
                            callback( data, status, headers, config)
                    })
                    .error(function (data, status, headers, config) {
                        $log.error( data);
                        if(callback)
                            callback( data, status, headers, config );
                    });
            }
        };

        return Network;

    }]);
});
