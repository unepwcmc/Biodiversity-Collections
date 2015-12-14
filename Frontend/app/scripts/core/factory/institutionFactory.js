/**
 * Institution Factory Model
 * @author Fernando Medeiros
 * @email fernandoericofilho@integritas.com.br
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.factory('Institution', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Institution(institution) {

            if (institution) {
                this.setData(institution);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Institution.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            load: function( id, page, size ){

                    var self = this;

                    $http.get( $rootScope.getHost() + "institutions/" + id  + '?page=' +  page  + '&size=' +   size)

                        .success(function (data) {
                            if (data.message == 'no matches found') {
                                $rootScope.$broadcast("INSTITUTION_LOAD_ERROR");
                            } else {
                                self.setData(data);
                                $rootScope.$broadcast("INSTITUTION_LOADED");
                            }
                        })
                        .error(function (message) {
                            $log.error(message);
                            $rootScope.$broadcast("INSTITUTION_LOAD_ERROR");
                        });
            },
            update: function () {

                $http.put( $rootScope.getHost() + "institutions/" + this.id, this)
                    .success(function (data) {
                        $rootScope.$broadcast("INSTITUTION_UPDATED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            addImage: function( data, callback ){

                var self = this;
                var fd = new FormData();
                fd.append('file', data);

                $http.post($rootScope.getHost() + "institutions/" + this.id + "/media", fd, {
                    headers : {
                        'Content-Type' : undefined
                    }
                }).success(function (data, status, headers, config) {
                    self.setData(data);
                    $rootScope.$broadcast("INSTITUTION_IMAGE_ADDED");
                    if(callback)
                        callback( data, status, headers, config)
                })
                    .error(function (data, status, headers, config) {
                        $log.error( data);
                        if(callback)
                            callback( data, status, headers, config );
                    });
            },
            get: function( id){

                var self = this;

                $http.get( $rootScope.getHost() + "institutions/" + id )

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("INSTITUTION_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("INSTITUTION_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_LOAD_ERROR");
                    });
            },
            search: function( query, page, size ) {

                var self = this;

                $http.get( $rootScope.getHost() + "institutions/search/name?name=" + query + "&page=" + page + "&size=" + size )

                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("INSTITUTION_SEARCHED", data);
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_SEARCHED_SEARCH_ERROR");
                    });
            },
            autocompleteName: function( query, callback ) {

                return $http.get( $rootScope.getHost() + "institutions/search/autocompleteName?name=" + query  )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("INSTITUTION_AUTOCOMPLETE_LOAD_ERROR");
                        } else {
                            $rootScope.$broadcast("INSTITUTION_AUTOCOMPLETE_LOADED", data);
                            if (callback) {
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_AUTOCOMPLETE_LOAD_ERROR");
                    });
            },
            addNetwork: function( id, networkId, callback) {
                var self = this;

                $http.put( $rootScope.getHost() + "institutions/" + id + "/network/" + networkId, {} )

                    .success(function ( data, status, headers, config ) {

                        self.setData(data);

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error(data.message);

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            removeNetwork: function( id, networkId, callback){

                var self = this;

                $http.delete( $rootScope.getHost() + "institutions/" + id + "/network/" + networkId )

                    .success(function ( data, status, headers, config ) {

                        self.setData(data);

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error(data.message);

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            addCollection: function( id, collectionId, callback) {
                var self = this;

                $http.put( $rootScope.getHost() + "institutions/" + id + "/collection/" + collectionId, {} )

                    .success(function ( data, status, headers, config ) {

                        self.setData(data);

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error(data.message);

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            removeCollection: function( id, collectionId, callback){

                var self = this;

                $http.delete( $rootScope.getHost() + "institutions/" + id + "/collection/" + collectionId )

                    .success(function ( data, status, headers, config ) {

                        self.setData(data);

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error(data.message);

                        if(callback)
                            callback( data, status, headers, config )
                    });
            }
        };

        return Institution;

    }]);
});
