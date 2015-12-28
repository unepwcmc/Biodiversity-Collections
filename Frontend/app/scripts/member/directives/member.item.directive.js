define(['angularAMD', 'core/directives/core.image.box.directive', 'core/factory/memberFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('memberItem', ['$rootScope','$http', 'Member', function ( $rootScope, $http, Member ) {

        return {
            restrict: 'EA',
            scope:{
                collection:'=',
                member:'='
            },
            templateUrl: 'views/member/member.item.tpl.html',
            controller: ['$scope','$rootScope', function($scope, $rootScope, Member ){

                //angular.extend( $scope.member, new Member());
                $scope.editMode = false;
                var images = [];

                $rootScope.$watch('editMode', function(newValue, oldValue){
                    $scope.editMode = $rootScope.editMode;
                },true);

                $scope.deleteMember = function( id ){
                    $scope.$emit('DELETE_MEMBER', id);
                };

                $scope.$on('ACTION_SAVE', function(){

                    $('#loader-wrapper').fadeToggle('400');

                    if(images.length > 0){

                        var fd = new FormData();
                        fd.append('file', images[0]);

                        $http.post($rootScope.getHost() + "medias/", fd, {
                            headers : {
                                'Content-Type' : undefined
                            }
                        })
                        .success(function ( image ) {

                                $scope.member.image = image;

                                $http.put( $rootScope.getHost() + "members/" + $scope.member.id, $scope.member)
                                .success(function ( data, status, headers, config ) {

                                    $rootScope.$broadcast("MEMBER_UPDATED");
                                    $('#loader-wrapper').fadeToggle('400');

                                })
                                .error(function ( data, status, headers, config ) {
                                    console.error(data);
                                });
                        })
                    }
                });

                $scope.$on('ATTACH_FILE', function(evt, data){
                    console.log(evt);
                    images.push(data);
                });


            }],
            link: function (scope, element, attrs) {

            }
        };
    }]);
});
