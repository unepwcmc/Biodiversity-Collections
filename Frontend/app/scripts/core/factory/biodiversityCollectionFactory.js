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
            }
        };

        return BiodiversityCollection;

    }]);
});
