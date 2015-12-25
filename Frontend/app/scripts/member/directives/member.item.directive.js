define(['angularAMD', 'core/directives/core.image.box.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('memberItem', ['$rootScope', function ( $rootScope ) {

        return {
            restrict: 'EA',
            scope:{
                member:'='
            },
            templateUrl: 'views/member/member.item.tpl.html',
            controller: ['$scope','$rootScope', function($scope, $rootScope ){

                $scope.editMode = false;

                $rootScope.$watch('editMode', function(newValue, oldValue){
                    $scope.editMode = $rootScope.editMode;
                },true);

                $scope.deleteMember = function( id ){
                    $scope.$emit('DELETE_MEMBER', id);
                };

                console.log($scope.member);


            }],
            link: function (scope, element, attrs) {

            }
        };
    }]);
});
