/**
 * Network Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['app'], function (app) {

    'use strict';

    app.factory('Network', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

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
                                data._embedded.biodiversityCollections = data._embedded.networks;
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("NETWORK_AUTOCOMPLETE_LOAD_ERROR");
                    });
            }
        };

        return Network;

    }]);
});
