/**
 * Curator Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['app'], function (app) {

    'use strict';

    app.factory('Curator', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Curator(data) {

            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Curator.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            load: function( id, page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + 'curators' + '?page=' +  page + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("CURATOR_LOAD_ERROR");
                        } else {
                            self.setData(data);
                            $rootScope.$broadcast("CURATOR_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("CURATOR_LOAD_ERROR");
                    });
            }

        };

        return Curator;

    }]);
});
