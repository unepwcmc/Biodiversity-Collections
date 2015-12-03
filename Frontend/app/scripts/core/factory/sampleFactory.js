/**
 * Sample Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['app'], function (app) {

    'use strict';

    app.factory('Sample', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Sample(data) {
            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Sample.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            get: function( id ){
                var self = this;
                $http.get( $rootScope.getHost() + "samples/" + id )
                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("SAMPLE_LOADED");
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("SAMPLE_LOAD_ERROR");
                    });
            },
            load: function( id, page, size ){
                var self = this;
                $http.get( $rootScope.getHost() + "samples/search/collection/" + id + '?page=' +  page + '&size=' +   size)
                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("SAMPLE_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("SAMPLE_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("SAMPLE_LOAD_ERROR");
                    });
            },
            search: function( query, page, size ){
                var self = this;
                $http.get( $rootScope.getHost() + "samples/search/name?name=" + query + "&page=" + page + "&size=" + size )
                    .success(function (data) {
                        self.setData(data);
                        $rootScope.$broadcast("SAMPLE_SEARCHED", data);
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("SAMPLE_SEARCH_ERROR");
                    });
            },
            update: function () {
                $http.put( $rootScope.getHost() + "samples/" + this.id, this)
                    .success(function (data) {
                        $rootScope.$broadcast("SAMPLE_UPDATED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            },
            save: function () {
                $http.post( $rootScope.getHost() + "samples/", this)
                    .success(function (data) {
                        $rootScope.$broadcast("SAMPLE_SAVED");
                    })
                    .error(function (message) {
                        $log.error(message);
                    });
            }
        };

        return Sample;

    }]);
});
