/**
 * BaseController Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.factory('BaseController', ['$http', '$rootScope', '$log', function ($http, $rootScope, $log) {

        return {

            info: function( controller ){
                console.log(controller);
            }
        }

    }]);
});