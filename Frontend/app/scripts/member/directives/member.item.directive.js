define(['angularAMD', 'core/directives/core.image.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('memberItem', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','toastr', function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, toastr) {

        return {
            restrict: 'EA',
            scope:{
                member:'='
            },
            templateUrl: 'views/member/member.item.tpl.html',
            controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                function($scope, $rootScope, $stateParams, $translate){


                }],
            link: function (scope, element, attrs) {



            }
        };
    }]);
});
