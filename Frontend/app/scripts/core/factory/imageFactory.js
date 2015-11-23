/**
 * Image Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['app'], function (app) {

    'use strict';

    app.factory('Image', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        /**
         *
         * @param data
         * @constructor
         */
        function Image(data) {

            if (data) {
                this.setData(data);
            }
        }

        /**
         *
         * @type {{setData: Function, load: Function}}
         */
        Image.prototype = {

            setData: function (data) {
                angular.extend(this, data);
            },
            load: function( id ){

            }

        };

        return Image;

    }]);
});
