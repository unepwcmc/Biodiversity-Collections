/**
 * Directive Ask for support
 *
 */
define(['angularAMD','bootstrap'], function (angularAMD) {

    'use strict';

    angularAMD.directive('askForSupport', ['$timeout', '$rootScope', function ($timeout, $rootScope) {

            return {
                restrict: 'E',
                templateUrl: 'views/core/ask.support.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){



                }],
                link: function (scope, element, attrs) {

                    scope.$on('ASK_FOR_SUPPORT_EVENT', function(){
                        $('#support_modal').modal('show');
                    });
                }
            };
    }]);
});
