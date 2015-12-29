/**
 *  Admin Institutions
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('adminInstitution', ['$rootScope', '$stateParams', '$state','toastr','Institution', function ( $rootScope, $stateParams, $state,  toastr, Institution) {

            return {
                restrict: 'EA',
                templateUrl: 'views/admin/institutions.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate', function($scope, $rootScope, $stateParams, $state, $translate){

                        $scope.institutions = null;

                        $scope.$on('ADMIN_INSTITUTIONS_TAB', function(){
                            console.log('institution tab');

                            if($scope.institutions == null){
                                console.log('initializing institutions..');

                                $('#loader-wrapper').fadeToggle('400');

                                $scope.institutions = new Institution();
                                angular.extend($scope.institutions, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                                $scope.institutions.list($scope.institutions.number, $scope.institutions.size);
                            }
                        });

                        $scope.$on('INSTITUTION_LISTED', function(){
                            $('#loader-wrapper').fadeToggle('400');
                        });

                        $scope.paginateInstitution = function( number, size){
                            $('#loader-wrapper').fadeToggle('400');
                            $scope.institutions.list(number, size);
                        };

                    }],
                link: function (scope, element, attrs) {

                }
            };
        }]);
});
