define(['angularAMD','waypoints','core/directives/core.image.box.directive', 'member/directives/member.item.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('memberList', ['$timeout', '$rootScope', '$stateParams', function ($timeout, $rootScope, $stateParams) {

            return {
                restrict: 'EA',
                scope:{
                    collection:'=',
                    members:'='
                },
                templateUrl: 'views/member/member.list.tpl.html',
                controller: ['$scope', '$rootScope', function($scope, $rootScope){


                        $scope.member = {};

                        /**
                         * Listener when the button edit is clicked
                         */
                        $scope.$on('EDIT_MEMBER', function() {
                            setStateButton(true);
                        });

                        $scope.$on('ACTION_SAVE', function(){

                            if($scope.member_form_add.$dirty){
                                $scope.$emit('ADD_NEW_MEMBER_AND_SAVE', $scope.member);

                            }
                            else{
                                $scope.$emit('SAVE_MEMBER');
                            }
                            resetForm();
                            setStateButton(false);
                        });

                        /**
                         * Listener when the button cancel is clicked
                         */
                        $scope.$on('CANCEL_EDIT_MEMBER', function() {
                            setStateButton(false);
                        });

                        $scope.addNewMember = function(){
                            if($scope.member_form_add.$valid){
                                $scope.$emit('ADD_NEW_MEMBER', $scope.member);
                            }
                        };

                        $scope.$on('MEMBER_ADDED', function(){
                           resetForm();
                        });

                        /**
                         * Listener when the collection factory update the
                         * biodiversity collection model.
                         *
                         */
                        $scope.$on('BIODIVERSITY_UPDATED', function(){
                            $scope.member = {};
                        });

                        $rootScope.$watch('logged', function(newValue, oldValue){
                            if(newValue != oldValue){
                                if(!newValue){
                                    setStateButton(false);
                                }
                            }
                        }, true);

                        function setStateButton( status ){
                            $scope.editMode = status;
                            $rootScope.editMode = $scope.editMode;
                            //$scope.$apply();
                        }

                       function resetForm(){

                           $scope.member = {};
                           $scope.member_form_add.$setPristine();
                           $scope.member_form_add.$setUntouched();
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

                    $rootScope.$on('AuthenticationDone', function() {
                        $timeout( function(){ $('#loader-wrapper').fadeToggle('400'); }, 1000);
                    });

                    scope.$on('ACTION_SAVE', function(){
                        backToDefault();
                    });

                    $(element).find("#edit-member").click( function(){
                        scope.disableAutocomplete = false;
                        scope.navigationBar = true;
                        scope.$emit('EDIT_MEMBER');
                        scope.$apply();
                    });

                    scope.$on('ITEM_BACK_EDIT', function(){
                        $(element).find("#edit-member").click();
                    });

                    $(element).find('.btn-edit-member-cancel').click(function(){
                        backToDefault();
                        scope.$emit('CANCEL_EDIT_MEMBER');
                    });

                    scope.$on('MEMBER_ADDED', function(){
                        $(element).find('img.img-box').attr("src", "/images/empty_img.png");
                        $(element).find('.img-file').val(null);
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
