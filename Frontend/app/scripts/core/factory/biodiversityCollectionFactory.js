/**
 * Biodiversity Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['app'], function (app) {

    'use strict';

    app.factory('BiodiversityCollection', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

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
            update: function () {

                $http.put( $rootScope.getHost() + "collections/" + this.id, this)
                    .success(function (data) {
                        $rootScope.$broadcast("BIODIVERSITY_UPDATED");
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
            addImage: function( data ){

                var self = this;
                var fd = new FormData();
                fd.append('file', data);

                console.log(data);
                console.log(fd);

                $http.post($rootScope.getHost() + "collections/" + this.id + "/medias", fd, {
                    headers : {
                        'Content-Type' : undefined
                    }
                }).success(function (data, status, headers, config) {
                        self.setData(data);
                        $rootScope.$broadcast("IMAGE_ADDED");
                        //if(callback)
                            //callback( data, status, headers, config)
                })
                .error(function (data, status, headers, config) {
                    $log.error( data);
                        //if(callback)
                           // callback( data, status, headers, config );
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
            autocomplete: function( query, callback ){

                $http.get( $rootScope.getHost() + "collections/search/autocomplete?name=" + query  )

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("BIODIVERSITY_AUTOCOMPLETE_LOAD_ERROR");
                        } else {
                            $rootScope.$broadcast("BIODIVERSITY_AUTOCOMPLETE_LOADED", data);

                            if(callback)
                                callback(data);
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("BIODIVERSITY_AUTOCOMPLETE_LOAD_ERROR");
                    });
            }
        };

        return BiodiversityCollection;

    }]);
});
