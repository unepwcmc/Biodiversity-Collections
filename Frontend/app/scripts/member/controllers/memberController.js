define(['app','core/factory/biodiversityCollectionFactory','member/directives/member.list.directive'], function () {

    'use strict';

    return ['$scope','BiodiversityCollection','BaseController','$stateParams','$http','$rootScope','Institution','toastr','$translate','$state', function ($scope, BiodiversityCollection, BaseController, $stateParams, $http, $rootScope, Institution, toastr, $translate, $state) {
            angular.extend($scope, BaseController);


            $scope.collection = new BiodiversityCollection();

            /**
             * Listener when the view is loaded
             */
            $scope.$on('$viewContentLoaded', function() {
                console.log('view Content Loaded...');

                $('#loader-wrapper').fadeToggle('400');
                $scope.collection.get( $stateParams.id );

            });

           /**
             * Listener when the collection factory receive new
             * biodiversity collection data.
             *
             */
            $scope.$on('BIODIVERSITY_LOADED', function(){
                console.log('Collection Member Loaded');

                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('ACTION_RELOADED', function(){
                $state.go($state.current, $stateParams, {reload: true, inherit: false});
            });


           $scope.$on('ADD_NEW_MEMBER', function( evt, data){
                console.log('adding new member');

                $('#loader-wrapper').fadeToggle('400');

                if($scope.collection.associatedMembers == null){
                    $scope.collection.associatedMembers = [];
                }

                $scope.collection.associatedMembers.push(data);
                $scope.collection.update();

           });

           $scope.$on('SAVE_MEMBER', function(){

                $('#loader-wrapper').fadeToggle('400');

                $scope.collection.update();
           });

            /**
             * Listener when the collection factory update the
             * biodiversity collection model.
             *
             */
            $scope.$on('BIODIVERSITY_UPDATED', function(){
                console.log('collection member updated');
                $('#loader-wrapper').fadeToggle('400');
            });


            $scope.$on('DELETE_MEMBER', function( evt, data){

                 $('#loader-wrapper').fadeToggle('400');

                 var index =  _.findIndex( $scope.collection.associatedMembers, function( obj ){
                     return obj.id == data;
                 });

                 $scope.collection.associatedMembers.splice(index, 1);

                 $scope.collection.update();
            });


    }
    ];
});