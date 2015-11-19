/**
 * Network Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['app'], function (app) {

    'use strict';

    app.factory('Network', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Network(data) {

            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Network.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            load: function( id, page, size ){

                var self = this;

                $http.get( $rootScope.getHost() + "networks/search/collection/" + id + '?page=' +  page + '&size=' +   size)

                    .success(function (data) {
                        if (data.message == 'no matches found') {
                            $rootScope.$broadcast("NETWORK_LOAD_ERROR");
                        } else {
                            self.setData(data);
                                $rootScope.$broadcast("NETWORK_LOADED");
                        }
                    })
                    .error(function (message) {
                        $log.error(message);
                        $rootScope.$broadcast("NETWORK_LOAD_ERROR");
                    });
            }
        };

        return Network;

    }]);
});
