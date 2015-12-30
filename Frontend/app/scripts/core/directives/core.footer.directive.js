/**
 * Directive Ask for support
 *
 */
define(['angularAMD','bootstrap'], function (angularAMD) {

    'use strict';

    angularAMD.directive('coreFooter', ['$timeout', '$rootScope', function ($timeout, $rootScope) {

        return {
            restrict: 'E',
            templateUrl: 'views/core/footer.tpl.html',
            controller: ['$scope', '$rootScope', function($scope, $rootScope){

                $scope.showFormSupport = function(){
                    $rootScope.$broadcast('ASK_FOR_SUPPORT_EVENT');
                };

            }]
        };
    }]);
});
