define(['angularAMD','waypoints', 'member/directives/member.item.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('memberList', ['$timeout', '$rootScope', '$stateParams', function ($timeout, $rootScope, $stateParams) {

            return {
                restrict: 'EA',
                scope:{
                    collection:'=',
                    members:'='
                },
                templateUrl: 'views/member/member.list.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.editMode = false;
                        $scope.member = {};

                        /**
                         * Listener when the button edit is clicked
                         */
                        $scope.$on('EDIT_MEMBER', function() {
                            setStateButton(true);
                        });

                        /**
                         * Listener when the button cancel is clicked
                         */
                        $scope.$on('CANCEL_EDIT_MEMBER', function() {
                            setStateButton(false);
                        });

                        $scope.addNewMember = function(){
                            $scope.$emit('ADD_NEW_MEMBER', $scope.member);

                        };

                        $scope.$on('MEMBER_ADDED', function(){
                            $scope.member = {};
                            $rootScope.$broadcast('RESET_THUMBNAIL');

                            $scope.member_form_add.$setPristine();
                            $scope.member_form_add.$setUntouched();
                        });

                        /**
                         * Listener when the collection factory update the
                         * biodiversity collection model.
                         *
                         */
                        $scope.$on('BIODIVERSITY_UPDATED', function(){
                            $scope.member = {};
                        });

                        function setStateButton( status ){
                            $scope.editMode = status;
                            $rootScope.editMode = $scope.editMode;
                            $scope.$apply();
                        }


                    }],
                link: function (scope, element, attrs) {

                    var waypoint = new Waypoint({
                        element: $(element).find("#member-bar-default"),
                        handler: function( direction ) {

                            switch(direction) {
                                case 'down':
                                    if(scope.navigationBar)
                                        $(element).find("#member-bar-fixed").show();
                                    break;
                                case 'up':
                                    $(element).find("#member-bar-fixed").hide();
                                    break;
                                default:
                            }
                        }
                    });

                    scope.$on('ACTION_SAVE', function(){

                        scope.$emit('SAVE_MEMBER');
                        backToDefault();
                    });

                    $(element).find("#edit-member").click( function(){

                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_MEMBER');
                        scope.$apply();
                    });

                    $(element).find('.btn-edit-member-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_MEMBER');
                    });

                    function backToDefault(){

                        scope.navigationBar = false;
                        scope.disableAutocomplete = true;
                        $(element).find("#member-bar-fixed").hide();
                        $(element).find(".member-default-mode").show();
                        $(element).find(".member-edit-mode").hide();
                    }

                }
            };
        }]);
});
