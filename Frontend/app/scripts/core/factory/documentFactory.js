/**
 * Document Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.factory('Document', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Document(data) {

            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Document.prototype = {


            setData: function (data) {
                angular.extend(this, data);
            },
            loadByCollection: function( id, page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + "documents/search/collection/" + id + '?page=' +  page + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("DOCUMENT_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("DOCUMENT_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("DOCUMENT_LOAD_ERROR");
                    });
            },
            loadBySample: function( id, page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + "documents/search/sample/" + id + '?page=' +  page + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("DOCUMENT_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("DOCUMENT_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("DOCUMENT_LOAD_ERROR");
                    });
            },
            save: function( model, callback ){

                var self = this;

                $http.post( $rootScope.getHost() + "documents/", model)

                    .success(function ( data, status, headers, config ) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("DOCUMENT_CREATE_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("DOCUMENT_CREATED");
                        }

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error( data.message );

                        $rootScope.$broadcast("DOCUMENT_CREATE_ERROR");

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            delete: function( id, callback ){

                var self = this;

                $http.delete( $rootScope.getHost() + "documents/" + id)

                    .success(function ( data, status, headers, config ) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("DOCUMENT_DELETED_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("DOCUMENT_DELETED");
                        }
                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error( data.message );

                        $rootScope.$broadcast("DOCUMENT_DELETED_ERROR");

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            update: function( model, callback ){

                var self = this;

                $http.put( $rootScope.getHost() + "documents/" + model.id, model)

                    .success(function ( data, status, headers, config ) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("DOCUMENT_UPDATED_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("DOCUMENT_UPDATED");
                        }

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {

                        $log.error( data.message );

                        $rootScope.$broadcast("DOCUMENT_UPDATED_ERROR");

                        if(callback)
                            callback( data, status, headers, config )
                    });
            },
            upload: function( data , callback ){

                var self = this;
                var fd = new FormData();
                fd.append('file', data);

                $http.post($rootScope.getHost() + "documents/" + this.id + "/media", fd, {
                    headers : {
                        'Content-Type' : undefined
                    }
                }).success(function (data, status, headers, config) {
                    self.setData(data);
                    $rootScope.$broadcast("DOCUMENT_FILE_CREATED");
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

                $http.get( $rootScope.getHost() + "documents/search?term=" + query + "&page=" + page + "&size=" + size )

                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("DOCUMENT_SEARCHED", data);
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("DOCUMENT_SEARCH_ERROR");
                    });
            },
            autocomplete: function( query, callback ) {

                return $http.get( $rootScope.getHost() + "documents/search/autocomplete?term=" + query  )
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("DOCUMENT_AUTOCOMPLETE_LOAD_ERROR");
                        } else {
                            $rootScope.$broadcast("DOCUMENT_AUTOCOMPLETE_LOADED", data);
                            if (callback) {
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("DOCUMENT_AUTOCOMPLETE_LOAD_ERROR");
                    });
            }
        };

        return Document;

    }]);
});
