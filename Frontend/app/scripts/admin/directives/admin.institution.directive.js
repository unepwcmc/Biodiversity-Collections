/**
 *  Admin Institutions
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('adminInstitution', ['$rootScope', '$stateParams', '$state','toastr','Institution','$q','$http', function ( $rootScope, $stateParams, $state,  toastr, Institution, $q, $http) {

            return {
                restrict: 'EA',
                templateUrl: 'views/admin/institutions.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate', function($scope, $rootScope, $stateParams, $state, $translate){

                        $scope.institutions = null;
                        $scope.in_checkboxes_selected = false;
                        $scope.in_checkboxCount = 0;

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

                    $scope.deleteInstitution = function( id ){

                        $('#loader-wrapper').fadeToggle('400');

                        $scope.institutions.delete( id, function( data, status){

                            if(status == 200){
                                $scope.institutions.list($scope.institutions.number, $scope.institutions.size);
                            }
                            else{
                                console.error(data);
                                $('#loader-wrapper').fadeToggle('400');
                            }
                        });
                    };

                    $scope.singleCheckInstitutionBoxEvent = function($event){

                        if($($event.currentTarget).is(":checked"))
                            $scope.in_checkboxCount+=1;
                        else
                            $scope.in_checkboxCount-=1;
                    };

                    $scope.checkAndUnCheckAllInstitution = function(){

                        $scope.in_checkboxes_selected = !$scope.in_checkboxes_selected;

                        if($scope.in_checkboxes_selected && $scope.in_checkboxCount > 0){
                            $scope.in_checkboxCount = 0;
                        }

                        $("input[type=checkbox].institution-checkbox-delete").each(function () {

                            $(this).prop("checked", $scope.in_checkboxes_selected);

                            if($scope.in_checkboxes_selected)
                                $scope.in_checkboxCount +=1;
                            else
                                $scope.in_checkboxCount -= 1;

                        });
                    };

                    $scope.deleteAllInstitution = function(){

                        /* if($scope.samples.number > 0){
                         if( (($scope.samples.totalElements - $scope.samples.size) % $scope.samples.size) == 0){
                         $scope.samples.number = $scope.samples.number - 1;
                         $scope.samples.totalPages = $scope.samples.totalPages - 1;
                         }
                         }*/

                        $('#loader-wrapper').fadeToggle('400');

                        $('#checkbox-institution-all').prop("checked", false);

                        var promises = [];

                        $("input[type=checkbox].institution-checkbox-delete").each(function () {
                            if($(this).is(":checked")){
                                if($(this).data('institution-id') != undefined){
                                    promises.push( $http({ method:'DELETE', url: $rootScope.getHost() + "institutions/" + $(this).data('institution-id') }) );
                                }
                            }
                        });

                        $q.all( promises ).then(function( results ){
                            $scope.showSuccessMessage('INSTITUTIONS_DELETED_SUCCESSFULLY','SUCCESS');
                            $scope.institutions.list($scope.institutions.number, $scope.institutions.size);
                            $scope.in_checkboxes_selected = !$scope.in_checkboxes_selected;
                            $scope.in_checkboxCount = 0;
                        });
                    };

                    $scope.editInstitution = function( id ){
                        $state.go('adminInstitutionEdit',{id: id});
                    }

                    }],
                link: function (scope, element, attrs) {

                    $("#institution-size-box").change(function() {
                        scope.institutions.size = parseInt($(this).val());
                        scope.paginateInstitution(scope.institutions.number, $(this).val())
                    });
                }
            };
        }]);
});
