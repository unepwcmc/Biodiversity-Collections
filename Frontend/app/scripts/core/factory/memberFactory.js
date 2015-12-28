/**
 * Member Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['app'], function (app) {

    'use strict';

    app.factory('Member', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Member(data) {
            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function, update: Function, getHost: Function}}
         */
        Member.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            get: function( id, callback ){
                var self = this;
                $http.get( $rootScope.getHost() + "members/" + id )
                    .success( function ( data, status, headers, config )  {

                        self.setData(data);

                        $rootScope.$broadcast("MEMBER_LOADED");

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {
                        $log.error( data );
                        $rootScope.$broadcast("MEMBER_LOAD_ERROR");
                    });
            },
            update: function ( callback ) {
                var self = this;
                $http.put( $rootScope.getHost() + "members/" + this.id, this)
                    .success(function ( data, status, headers, config ) {

                        self.setData(data);

                        $rootScope.$broadcast("MEMBER_UPDATED");

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {
                        $log.error( data );
                    });
            },
            save: function ( callback ) {
                var self = this;
                $http.post( $rootScope.getHost() + "members", this)

                    .success(function ( data, status, headers, config ){

                        self.setData(data);

                        $rootScope.$broadcast("MEMBER_SAVED");

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {
                        $log.error( data );
                    });
            },
            delete: function ( callback ) {
                var self = this;
                $http.delete( $rootScope.getHost() + "members/" + this.id)
                    .success(function ( data, status, headers, config ) {

                        $rootScope.$broadcast("MEMBER_DELETED");

                        if(callback)
                            callback( data, status, headers, config )
                    })
                    .error(function ( data, status, headers, config ) {
                        $log.error( data);
                    });
            }
        };

        return Member;

    }]);
});
