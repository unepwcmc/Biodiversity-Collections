/**
 *  Admin Institutions
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('adminInstitution', ['$timeout', '$rootScope', '$stateParams', '$state', '$window', '$http', '$cookies','toastr',

        function ($timeout, $rootScope, $stateParams, $state, $window, $http, $cookies, toastr) {

            return {
                restrict: 'EA',
                templateUrl: 'views/admin/institutions.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',
                    function($scope, $rootScope, $stateParams, $state, $translate){

                        $scope.$on('ADMIN_INSTITUTIONS_TAB', function(){
                            console.log('institution tab');
                        });

                    }],
                link: function (scope, element, attrs) {

                }
            };
        }]);
});
