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
                                data._embedded.biodiversityCollections = data._embedded.institutions;
                                callback(data);
                            }
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_AUTOCOMPLETE_LOAD_ERROR");
                    });
            },
            loadCollectionsByInstitution: function( id, page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + 'collections/search/institutions?id=' + id + "&page=" + page + "&size=" + size )

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("INSTITUTION_COLLECTION_LOAD_ERROR");
                        } else {
                            self.setData({collections: data });
                            $rootScope.$broadcast("INSTITUTION_COLLECTION_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("INSTITUTION_COLLECTION_LOAD_ERROR");
                    });
            },
        };

        return Institution;

    }]);
});
