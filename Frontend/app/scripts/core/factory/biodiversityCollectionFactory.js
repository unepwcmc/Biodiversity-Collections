/**
 * Biodiversity Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.factory('BiodiversityCollection', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param collection
         * @constructor
         */
        function BiodiversityCollection(collection) {

            if (collection) {
                this.setData(collection);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        BiodiversityCollection.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            load: function( id, page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + "collections/" + id  + '?page=' +  page  + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("BIODIVERSITY_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("BIODIVERSITY_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("BIODIVERSITY_LOAD_ERROR");
                    });
            },
            loadAll: function( page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + 'collections?page=' +  page  + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("BIODIVERSITY_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("BIODIVERSITY_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("BIODIVERSITY_LOAD_ERROR");
                    });
            },
            loadByDefinition: function( query, page, size){

                var self = this;

                $http.get( $rootScope.getHost() + 'collections/search/definition?name=' + query + '&page=' +  page  + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("BIODIVERSITY_FILTER_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("BIODIVERSITY_FILTER_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("BIODIVERSITY_FILTER_LOAD_ERROR");
                    });

            },
            loadByInstitution: function( id, page, size, callback ){

                var self = this;

                $http.get( $rootScope.getHost() + 'collections/search/institutions?id=' + id + "&page=" + page + "&size=" + size )

                    .success(function ( data, status, headers, config ) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("INSTITUTION_COLLECTION_LOAD_ERROR");
                        } else {
                            self.setData(data);

                            $rootScope.$broadcast("INSTITUTION_COLLECTION_LOADED");

                            if(callback)
                                callback( data, status, headers, config )
                        }
                    })
                    .error(function (data, status, headers, config) {
                        $log.error( data );

                        $rootScope.$broadcast("INSTITUTION_COLLECTION_LOAD_ERROR");

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            loadByNetwork: function( id, page, size, callback ){
                var self = this;
                $http.get( $rootScope.getHost() + 'collections/search/networks?id=' + id + "&page=" + page + "&size=" + size )
                    .success(function ( data, status, headers, config ) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("NETWORK_COLLECTION_LOAD_ERROR");
                        } else {
                            self.setData(data);

                            $rootScope.$broadcast("NETWORK_COLLECTION_LOADED");

                            if(callback)
                                callback( data, status, headers, config )
                        }
                    })
                    .error(function (data, status, headers, config) {
                        $log.error( data );

                        $rootScope.$broadcast("NETWORK_COLLECTION_LOAD_ERROR");

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            update: function ( callback ) {
                var self = this;
                $http.put( $rootScope.getHost() + "collections/" + this.id, this)
                    .success(function (data, status, headers, config) {
                        self.setData(data);
                        $rootScope.$broadcast("BIODIVERSITY_UPDATED");

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function (data, status, headers, config) {
                        $log.error(data);

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            addMember: function (callback) {
                var self = this;
                $http.put( $rootScope.getHost() + "collections/" + this.id, this)
                    .success(function (data) {

                        self.setData(data);

                        $rootScope.$broadcast("BIODIVERSITY_MEMBER_UPDATED");

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function (message) {
                        $log.error(message);

                        $rootScope.$broadcast("BIODIVERSITY_MEMBER_UPDATED_ERROR");

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            save: function () {
                var self = this;
                $http.post( $rootScope.getHost() + "collections/", this)
                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("BIODIVERSITY_SAVED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            delete: function (id) {
                $http.delete( $rootScope.getHost() + "collections/" + id)
                    .success(function (data) {
                        $rootScope.$broadcast("BIODIVERSITY_DELETED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            get: function( id){

                var self = this;

                $http.get( $rootScope.getHost() + "collections/" + id )

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("BIODIVERSITY_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("BIODIVERSITY_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("BIODIVERSITY_LOAD_ERROR");
                    });
            },
            curator: function( id){

                var self = this;

                $http.get( $rootScope.getHost() + "collections/" + id + "/curator" )

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("BIODIVERSITY_CURATOR_LOAD_ERROR");
                        } else {
                            self.setData({curator: data });
                            $rootScope.$broadcast("BIODIVERSITY_CURATOR_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("BIODIVERSITY_CURATOR_LOAD_ERROR");
                    });
            },
            addImage: function( data, callback ){

                var self = this;
                var fd = new FormData();
                fd.append('file', data);

                $http.post($rootScope.getHost() + "collections/" + this.id + "/media", fd, {
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
            },
            institution: function( id){

                var self = this;

                $http.get( $rootScope.getHost() + "collections/" + id + "/institution" )

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("BIODIVERSITY_INSTITUTION_LOAD_ERROR");
                        } else {
                            self.setData({institution: data });
                            $rootScope.$broadcast("BIODIVERSITY_INSTITUTION_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("BIODIVERSITY_INSTITUTION_LOAD_ERROR");
                    });
            },
            search: function( query, page, size ) {

                var self = this;

                $http.get( $rootScope.getHost() + "collections/search/name?name=" + query + "&page=" + page + "&size=" + size )

                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("BIODIVERSITY_SEARCHED", data);
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("BIODIVERSITY_SEARCH_ERROR");
                    });
            },
            autocomplete: function( query, callback ) {

                return $http.get( $rootScope.getHost() + "collections/search/autocomplete?name=" + query  )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("BIODIVERSITY_AUTOCOMPLETE_LOAD_ERROR");
                        } else {
                            $rootScope.$broadcast("BIODIVERSITY_AUTOCOMPLETE_LOADED", data);
                            if (callback)
                                callback(data);
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("BIODIVERSITY_AUTOCOMPLETE_LOAD_ERROR");
                    });
            },
            addNetwork: function( id, networkId, callback){

                var self = this;

                $http.put( $rootScope.getHost() + "collections/" + id + "/network/" + networkId, {} )

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

                $http.delete( $rootScope.getHost() + "collections/" + id + "/network/" + networkId )

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
            addSamples: function( id, samples, callback){
                var self = this;
                $http.post( $rootScope.getHost() + "collections/" + id + "/samples", samples )
                    .success(function ( data, status, headers, config ) {
                        self.setData(data);
                        if(callback)
                            callback( data, status, headers, config );
                        $rootScope.$broadcast("BIODIVERSITY_SAMPLES_ADDED");
                    })
                    .error(function ( data, status, headers, config ) {
                        $log.error(data.message);
                        if(callback)
                            callback( data, status, headers, config );
                        $rootScope.$broadcast("BIODIVERSITY_SAMPLES_ADD_ERROR");
                    });
            },
            removeSample: function( id, sampleId, callback){

                var self = this;

                $http.delete( $rootScope.getHost() + "collections/" + id + "/sample/" + sampleId )

                    .success(function ( data, status, headers, config ) {

                        self.setData(data);

                        if(callback)
                            callback( data, status, headers, config );
                        $rootScope.$broadcast("BIODIVERSITY_SAMPLES_REMOVED");
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error(data.message);

                        if(callback)
                            callback( data, status, headers, config );
                        $rootScope.$broadcast("BIODIVERSITY_SAMPLES_REMOVED_ERROR");
                    });
            }
        };

        return BiodiversityCollection;

    }]);
});
