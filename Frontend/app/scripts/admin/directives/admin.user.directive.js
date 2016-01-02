/**
 *  Admin Users
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/userFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('adminUser', ['$timeout', '$rootScope', '$stateParams', '$state', '$window', '$http', '$cookies','toastr','User','$q', function ($timeout, $rootScope, $stateParams, $state, $window, $http, $cookies, toastr, User, $q) {

            return {
                restrict: 'EA',
                templateUrl: 'views/admin/users.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$state', '$translate',  function($scope, $rootScope, $stateParams, $state, $translate){

                        $scope.users = null;
                        $scope.checkboxes_selected = false;
                        $scope.checkboxCount = 0;

                        $scope.$on('ADMIN_USERS_TAB', function(){
                             console.log('users tab');

                            if($scope.users == null){
                                console.log('initializing users..');
                                $('#loader-wrapper').fadeToggle('400');

                                $scope.users = new User();
                                angular.extend($scope.users, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                                $scope.users.list($scope.users.number, $scope.users.size);
                            }

                        });

                        $scope.$on('USERS_LISTED', function(){
                            $('#loader-wrapper').fadeToggle('400');
                        });


                        $scope.paginateUsers = function( number, size){
                            $('#loader-wrapper').fadeToggle('400');
                                $scope.users.list(number, size);
                        };

                        $scope.deleteUser = function( id ){

                            $('#loader-wrapper').fadeToggle('400');

                             $scope.users.delete( id, function( data, status){

                                   if(status == 200){
                                       $scope.users.list($scope.users.number, $scope.users.size);
                                   }
                                    else{
                                        console.error(data);
                                       $('#loader-wrapper').fadeToggle('400');
                                   }
                             });
                        };

                        $scope.singleCheckBoxEvent = function($event){

                            if($($event.currentTarget).is(":checked"))
                                $scope.checkboxCount+=1;
                            else
                                $scope.checkboxCount-=1;
                        };

                        $scope.checkAndUnCheckAll = function(){

                            $scope.checkboxes_selected = !$scope.checkboxes_selected;

                            if($scope.checkboxes_selected && $scope.checkboxCount > 0){
                                $scope.checkboxCount = 0;
                            }

                            $("input[type=checkbox].user-checkbox-delete").each(function () {

                                $(this).prop("checked", $scope.checkboxes_selected);

                                if($scope.checkboxes_selected)
                                    $scope.checkboxCount +=1;
                                else
                                    $scope.checkboxCount -= 1;

                            });
                        };

                        $scope.deleteAll = function(){

                            /* if($scope.samples.number > 0){
                             if( (($scope.samples.totalElements - $scope.samples.size) % $scope.samples.size) == 0){
                             $scope.samples.number = $scope.samples.number - 1;
                             $scope.samples.totalPages = $scope.samples.totalPages - 1;
                             }
                             }*/

                            $('#loader-wrapper').fadeToggle('400');

                            $('#checkbox-all').prop("checked", false);

                            var promises = [];

                            $("input[type=checkbox].user-checkbox-delete").each(function () {
                                if($(this).is(":checked")){
                                    if($(this).data('user-id') != undefined){
                                        promises.push( $http({ method:'DELETE', url: $rootScope.getHost() + "users/" + $(this).data('user-id') }) );
                                    }
                                }
                            });

                            $q.all( promises ).then(function( results ){
                                $scope.showSuccessMessage('USERS_DELETED_SUCCESSFULLY','SUCCESS');
                                $scope.users.list($scope.users.number, $scope.users.size);
                                $scope.checkboxes_selected = !$scope.checkboxes_selected;
                                $scope.checkboxCount = 0;
                            });
                        };

                    }],
                link: function (scope, element, attrs) {

                }
            };
        }]);
});
