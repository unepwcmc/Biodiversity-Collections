define(['angularAMD','auth/directives/phone.digits.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('userDetail', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'EA',
                templateUrl: 'views/user/details.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.institutionSelected = null;
                        angular.extend($scope.user, { enabled: true });

                        $scope.institutionAutocomplete = function( userInputString, timeoutPromise){
                            return $http.get( $rootScope.getHost() + "institutions/search/autocompleteName?name=" + userInputString,
                                {
                                    timeout: timeoutPromise
                                }
                            );
                        };

                        $scope.institutionSelectedFn = function(selected) {
                            if (selected) {
                                $scope.user.institution = selected.originalObject;
                            }
                        };

                        $scope.userSubmit = function(){

                            $scope.$emit('REGISTER_NEW_USER', $scope.user);
                        };

                        $scope.editUserSubmit = function(){
                            $scope.$emit('EDIT_USER');
                        };

                        $scope.cancelForm = function(){

                            $scope.$emit('CANCEL_USER_FORM');
                            resetForm();
                        };

                        $scope.$on('USER_SAVED', function( evt, data){
                            resetForm();
                        });

                        $scope.$on('USER_LOADED', function(){
                            $scope.institutionSelected = $scope.user.institution;
                        });

                        function resetForm(){
                            $scope.user = {};
                            $scope.user_form.$setPristine();
                            $scope.user_form.$setUntouched();
                            $scope.$broadcast('angucomplete-alt:clearInput', 'user_institution');
                        }

                    }],
                link: function (scope, element, attrs) {

                }
            };
        }]);
});
