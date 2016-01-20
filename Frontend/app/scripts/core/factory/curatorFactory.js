/**
 * Curator Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.factory('Curator', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Curator(data) {

            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Curator.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            get: function( id){

                var self = this;

                $http.get( $rootScope.getHost() + "curators/" + id )

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("CURATOR_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("CURATOR_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("CURATOR_LOAD_ERROR");
                    });
            },
            getByToken: function( token ){

                var self = this;

                $http.get( $rootScope.getHost() + "curators/token/" + token )

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("CURATOR_TOKEN_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("CURATOR_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("CURATOR_TOKEN_LOAD_ERROR");
                    });
            },
            update: function () {

                $http.put( $rootScope.getHost() + "curators/" + this.id, this)
                    .success(function (data) {
                        $rootScope.$broadcast("CURATOR_UPDATED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            addImage: function( data, callback ){

                var self = this;
                var fd = new FormData();
                fd.append('file', data);

                $http.post($rootScope.getHost() + "curators/" + this.id + "/media", fd, {
                    headers : {
                        'Content-Type' : undefined
                    }
                }).success(function (data, status, headers, config) {
                    self.setData(data);
                    $rootScope.$broadcast("CURATOR_IMAGE_ADDED");
                    if(callback)
                        callback( data, status, headers, config)
                })
                .error(function (data, status, headers, config) {
                    $log.error( data);
                    if(callback)
                        callback( data, status, headers, config );
                });
            },
            search: function( query, page, size ) {

                var self = this;

                $http.get( $rootScope.getHost() + "curators/search/name?name=" + query + "&page=" + page + "&size=" + size )

                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("CURATOR_SEARCHED", data);
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("CURATOR_SEARCHED_SEARCH_ERROR");
                    });
            },
            load: function( id, page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + 'curators' + '?page=' +  page + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("CURATORS_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("CURATORS_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("CURATORS_LOAD_ERROR");
                    });
            },
            autocompleteName: function( query, callback ) {

                return $http.get( $rootScope.getHost() + "curators/search/autocomplete?name=" + query  )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("CURATOR_AUTOCOMPLETE_LOAD_ERROR");
                        } else {
                            $rootScope.$broadcast("CURATOR_AUTOCOMPLETE_LOADED", data);
                            if (callback) {
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("CURATOR_AUTOCOMPLETE_LOAD_ERROR");
                    });
            }
        };

        return Curator;

    }]);
});
