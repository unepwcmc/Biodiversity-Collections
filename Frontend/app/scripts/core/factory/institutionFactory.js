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
            }

        };

        return Institution;

    }]);
});
