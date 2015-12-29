/**
 *  Admin Overview
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','bootstrap'], function (angularAMD) {

    'use strict';

    angularAMD.directive('adminOverview', ['$timeout', '$rootScope', '$stateParams', '$state', '$window', '$http', '$cookies','toastr',

        function ($timeout, $rootScope, $stateParams, $state, $window, $http, $cookies, toastr) {

            return {
                restrict: 'EA',
                templateUrl: 'views/admin/overview.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',
                    function($scope, $rootScope, $stateParams, $state, $translate){

                        $scope.$on('ADMIN_OVERVIEW_TAB', function(){
                            console.log('overview tab');
                        });

                    }],
                link: function (scope, element, attrs) {

                    $('a.btn_invite_curator').click(function(){
                        $('#invite_curator').modal('show');
                    });

                }
            };
        }]);
});
