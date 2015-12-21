define(['angularAMD', 'core/directives/core.image.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('memberItem', ['$rootScope', function ( $rootScope ) {

        return {
            restrict: 'EA',
            scope:{
                member:'='
            },
            templateUrl: 'views/member/member.item.tpl.html',
            controller: ['$scope','$rootScope', function($scope, $rootScope ){


                }],
            link: function (scope, element, attrs) {



            }
        };
    }]);
});
