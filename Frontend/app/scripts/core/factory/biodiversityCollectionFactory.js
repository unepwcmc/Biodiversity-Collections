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
