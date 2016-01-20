define(['app','core/factory/biodiversityCollectionFactory','member/directives/member.list.directive'], function () {

    'use strict';

    return ['$scope','BiodiversityCollection','BaseController','$stateParams','$http','$rootScope','$translate','$state','$q', '$timeout',
        function ($scope, BiodiversityCollection, BaseController, $stateParams, $http, $rootScope, $translate, $state, $q, $timeout) {
            angular.extend($scope, BaseController);

            $scope.collection_id = $stateParams.id;
            $scope.images = [];
            $scope.collection = new BiodiversityCollection();
            $scope.confirm_memember = false;
            $scope.member_not_confirmed = [];
            $scope.promises = [];
            $scope.item_count_saved = 0;

            $scope.myResolver = function (defaultResolver, state, isCurrent) {

                if (isCurrent) {
                    return '"' + $scope.collection.name + '"';
                }

                return defaultResolver(state);
            };

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

                if($scope.collection.associatedMembers == null){
                    $scope.collection.associatedMembers = [];
                }

                $scope.item_count_saved =  $scope.collection.associatedMembers.length;

                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('ACTION_RELOADED', function(){
                $state.go('collection', {id: $stateParams.id});
            });

            $scope.$on('ATTACH_FILE', function(evt, data){
                 $scope.images.push(data);
            });


           $scope.$on('ADD_NEW_MEMBER', function( evt, data){
                console.log('adding new member');

                $scope.confirm_memember = true;
                $('#loader-wrapper').fadeToggle('400');

               insertMember(data, function( result ){

                   if(result){
                       $scope.$emit('BIODIVERSITY_MEMBER_UPDATED');
                   }
               });
           });

            $scope.$on('ADD_NEW_MEMBER_AND_SAVE', function( evt, data){
                console.log('adding new member');

                $scope.confirm_memember = true;

                if($scope.collection.associatedMembers == null){
                    $scope.collection.associatedMembers = [];
                }

                insertMember(data, function( result ){

                    if(result){
                        $scope.$emit('SAVE_MEMBER');
                    }
                });
            });

            $scope.$on('SAVE_MEMBER', function(){

                if($scope.confirm_memember){

                    if($scope.collection.associatedMembers.length == 0){
                        $('#loader-wrapper').fadeToggle('400');
                    }

                    $scope.collection.update(function( data, status){

                        $('#loader-wrapper').fadeToggle('400');
                        $rootScope.$broadcast('ACTION_SAVE_ITEM');
                        $scope.confirm_memember = false;
                    });
                }
                else{
                    $('#loader-wrapper').fadeToggle('400');
                    $rootScope.$broadcast('ACTION_SAVE_ITEM');
                }
            });

            /**
             * Listener when the collection factory update the
             * biodiversity collection model.
             *
             */
            $scope.$on('BIODIVERSITY_MEMBER_UPDATED', function(){
                console.log('collection member updated');

                $scope.images = [];
                $('#loader-wrapper').fadeToggle('400');
                $rootScope.$broadcast('MEMBER_ADDED');
            });

            $scope.$on('MEMBER_UPDATED', function(){
                $scope.images = [];

                if($scope.item_count_saved > 0){
                    $scope.item_count_saved -= 1;
                }

                if($scope.item_count_saved == 0){
                    $('#loader-wrapper').fadeToggle('400');
                    $scope.item_count_saved =  $scope.collection.associatedMembers.length;
                }
            });


            $scope.$on('DELETE_MEMBER', function( evt, data){

                 var index =  _.findIndex( $scope.collection.associatedMembers, function( obj ){
                     return obj.id == data;
                 });

                 $scope.confirm_memember = true;

                 $scope.collection.associatedMembers.splice(index, 1);

                 $scope.item_count_saved -= 1;
            });


            function insertMember( data, callback ){

                if($scope.images.length > 0){

                    var fd = new FormData();
                    fd.append('file', $scope.images[0]);

                    $http.post($rootScope.getHost() + "medias/", fd, {
                        headers : {
                            'Content-Type' : undefined
                        }
                    })
                    .success(function ( image ) {

                        data.image = image;
                        $scope.collection.saveMember( data, function( member, status){

                            if(status == 200){
                                $scope.collection.associatedMembers.push(member);
                                callback(true);
                            }
                        });
                    })
                }
                else{
                    $scope.collection.saveMember( data, function( member, status){

                        if(status == 200){
                            $scope.collection.associatedMembers.push(member);
                            callback(true);
                        }
                    });
                }
            }
    }
    ];
});