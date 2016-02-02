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
            list: function (page, size, callback) {
                var self = this;
                $http.get( $rootScope.getHost() + "institutions" + "?page=" +  page + "&size=" +   size)
                    .success( function (data, status, headers, config ) {

                        self.setData( data );

                        $rootScope.$broadcast("INSTITUTION_LISTED");

                        if(callback)
                            callback( data, status, headers, config)
                    })
                    .error( function (data, status, headers, config ){
                        $log.error( data );

                        $rootScope.$broadcast("INSTITUTION_LISTED_ERROR");

                        if(callback)
                            callback( data, status, headers, config)
                    });
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

                var self = this;

                $http.put( $rootScope.getHost() + "institutions/" + this.id, this)
                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("INSTITUTION_UPDATED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            save: function (model, callback) {

                var self = this;

                $http.post( $rootScope.getHost() + "institutions/", model)
                    .success(function ( data, status, headers, config) {

                        self.setData(data);

                        $rootScope.$broadcast("INSTITUTION_SAVED");

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function (data, status, headers, config) {
                        $log.error( data );
                        $rootScope.$broadcast("INSTITUTION_SAVED_ERROR");

                        if(callback)
                            callback( data, status, headers, config )
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

                        //self.setData(data);

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error(data.message);

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            addCurator: function( id, curatorId, callback) {
                var self = this;

                $http.put( $rootScope.getHost() + "institutions/" + id + "/curator/" + curatorId, {} )

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

                        //self.setData(data);

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

                        //self.setData(data);

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error(data.message);

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            delete: function( id, callback){

                $http.delete( $rootScope.getHost() + "institutions/" + id )

                    .success(function ( data, status, headers, config ) {

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error(data.message);

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            summary: function( page, size, callback ) {
                var self = this;
                return $http.get( $rootScope.getHost() + "institutions/summary/paging" + "?page=" +  page + "&size=" +   size )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("INSTITUTION_SUMMARY_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("INSTITUTION_SUMMARY_LOADED", data);
                            if (callback) {
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_SUMMARY_ERROR");
                    });
            },
            summaryTotal: function( callback ) {
                var self = this;
                return $http.get( $rootScope.getHost() + "institutions/summary/total" )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("INSTITUTION_SUMMARY_TOTAL_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("INSTITUTION_SUMMARY_TOTAL_LOADED", data);
                            if (callback) {
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_SUMMARY_TOTAL_ERROR");
                    });
            },
            countType: function( callback ) {
                return $http.get( $rootScope.getHost() + "institutions/count/type" )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("INSTITUTION_COUNT_TYPE_ERROR");
                        } else {
                            $rootScope.$broadcast("INSTITUTION_COUNT_TYPE_LOADED", data);
                            if (callback) {
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_COUNT_TYPE_ERROR");
                    });
            },
            countCollections: function( callback ) {
                return $http.get( $rootScope.getHost() + "institutions/count/collections" )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("INSTITUTION_COUNT_COLLECTIONS_ERROR");
                        } else {
                            $rootScope.$broadcast("INSTITUTION_COUNT_COLLECTIONS_LOADED", data);
                            if (callback) {
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_COUNT_COLLECTIONS_ERROR");
                    });
            },
            countSpecimens: function( callback ) {
                return $http.get( $rootScope.getHost() + "institutions/count/specimens" )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("INSTITUTION_COUNT_SPECIMENS_ERROR");
                        } else {
                            $rootScope.$broadcast("INSTITUTION_COUNT_SPECIMENS_LOADED", data);
                            if (callback) {
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_COUNT_SPECIMENS_ERROR");
                    });
            }
        };

        return Institution;

    }]);
});
