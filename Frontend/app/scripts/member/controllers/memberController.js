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

                $('#loader-wrapper').fadeToggle('400');
            });

            $scope.$on('ACTION_RELOADED', function(){

                /*if(!$scope.confirm_memember){

                    if($scope.member_not_confirmed.length > 0){

                        console.log($scope.collection.associatedMembers);
                        console.log($scope.member_not_confirmed);

                        _.each($scope.member_not_confirmed, function( ele ){
                             var idx = _.findIndex(scope.collection.associatedMembers, function( obj ){
                                  return obj.id == ele.id;
                             });
                            $scope.collection.associatedMembers.splice(idx, 1);
                        });

                        $scope.collection.update(function( data, status){
                            $state.go('collection', {id: $stateParams.id});
                        });
                    }
                    $scope.collection.update(function( data, status){
                        $state.go('collection', {id: $stateParams.id});
                    });
                }
                else{
                    $state.go('collection', {id: $stateParams.id});
                }*/
                $state.go('collection', {id: $stateParams.id});
            });

            $scope.$on('ATTACH_FILE', function(evt, data){
                 $scope.images.push(data);
            });


           $scope.$on('ADD_NEW_MEMBER', function( evt, data){
                console.log('adding new member');

                $scope.confirm_memember = true;
               $('#loader-wrapper').fadeToggle('400');

                if($scope.collection.associatedMembers == null){
                    $scope.collection.associatedMembers = [];
                }

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
                                // $('#loader-wrapper').fadeToggle('400');
                                 //$scope.member_not_confirmed.push(member);
                                 $scope.collection.associatedMembers.push(member);
                                 /*$scope.collection.update(function( data, status){
                                     $('#loader-wrapper').fadeToggle('400');
                                     $scope.$emit('BIODIVERSITY_MEMBER_UPDATED');
                                 });*/
                                 $scope.$emit('BIODIVERSITY_MEMBER_UPDATED');
                             }
                        });
                    })
                }
                else{
                    $scope.collection.saveMember( data, function( member, status){

                        if(status == 200){

                           // $scope.member_not_confirmed.push(member);
                            $scope.collection.associatedMembers.push(member);
                            //$scope.collection.update(function( data, status){
                            //    $('#loader-wrapper').fadeToggle('400');
                            //    $scope.$emit('BIODIVERSITY_MEMBER_UPDATED');
                            //});

                            $scope.$emit('BIODIVERSITY_MEMBER_UPDATED');
                        }
                    });
                }
           });

            $scope.$on('ACTION_SAVE', function(){
               // $scope.confirm_memember = true;
               // $scope.member_not_confirmed = [];
                if($scope.confirm_memember){
                    $scope.collection.update(function( data, status){
                        $rootScope.$broadcast('ACTION_SAVE_ITEM');
                        $scope.confirm_memember = false;
                    });
                }
                else{
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
                $scope.showSuccessMessage('SUCCESS','BIODIVERSITY_COLLECTION_MEMBER_SAVED');
                $rootScope.$broadcast('MEMBER_ADDED');
            });

            $scope.$on('MEMBER_UPDATED', function(){
                $scope.images = [];
            });


            $scope.$on('DELETE_MEMBER', function( evt, data){

                // $('#loader-wrapper').fadeToggle('400');

                 var index =  _.findIndex( $scope.collection.associatedMembers, function( obj ){
                     return obj.id == data;
                 });

                 $scope.collection.associatedMembers.splice(index, 1);

                 /*$scope.collection.update(function( data, status){
                     $('#loader-wrapper').fadeToggle('400');
                 });*/
            });
    }
    ];
});