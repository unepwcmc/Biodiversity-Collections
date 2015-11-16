/**
 * BaseController Factory Model
 * @author Jose Carlos
 * @email jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.factory('BaseController', ['$http', '$rootScope', '$log','$state', function ($http, $rootScope, $log, $state) {

        return {

            info: function( controller ){
                console.log(controller);
            }
        }

    }]);
});