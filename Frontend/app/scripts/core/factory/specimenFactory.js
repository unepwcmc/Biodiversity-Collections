/**
 * Specimen Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['app'], function (app) {

    'use strict';

    app.factory('Specimen', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Specimen(data) {

            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Specimen.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            load: function( id, page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + "specimens/search/collection/" + id + '?page=' +  page + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("SPECIMENS_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("SPECIMENS_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("SPECIMENS_LOAD_ERROR");
                    });
            },
            addSpecimen: function( collectionId , model, callback){

                console.log(model);
                $http.put( $rootScope.getHost() + "collections/add/specimen/" + collectionId, model)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("SPECIMENS_LOAD_ERROR");
                        } else {
                            if(callback)
                                callback(data);
                            $rootScope.$broadcast("SPECIMENS_ADDED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("SPECIMENS_LOAD_ERROR");
                    });
            }
        };

        return Specimen;

    }]);
});
