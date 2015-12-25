define(['app','core/factory/biodiversityCollectionFactory','member/directives/member.list.directive'], function () {

    'use strict';

    return ['$scope','BiodiversityCollection','BaseController','$stateParams','$http','$rootScope','$translate','$state','$q', function ($scope, BiodiversityCollection, BaseController, $stateParams, $http, $rootScope, $translate, $state, $q) {
            angular.extend($scope, BaseController);

            $scope.images = [];
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

            $scope.$on('ATTACH_FILE', function(evt, data){
                 $scope.images.push(data);
            });


           $scope.$on('ADD_NEW_MEMBER', function( evt, data){
                console.log('adding new member');

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
                        $scope.collection.associatedMembers.push(data);
                        $scope.collection.addMember();
                    })
                }
           });

        /**
         * Listener when the collection factory update the
         * biodiversity collection model.
         *
         */
        $scope.$on('BIODIVERSITY_MEMBER_UPDATED', function(){
            console.log('collection member updated');

            /*if ($scope.images === undefined)
                $scope.images = [];

            if ($scope.images.length > 0) {
                saveImage();
            }else{

                $('#loader-wrapper').fadeToggle('400');
                $scope.showSuccessMessage('SUCCESS','BIODIVERSITY_COLLECTION_MEMBER_SAVED');
            }*/
            $scope.images = [];
            $('#loader-wrapper').fadeToggle('400');
            $scope.showSuccessMessage('SUCCESS','BIODIVERSITY_COLLECTION_MEMBER_SAVED');
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

                if ($scope.images === undefined)
                    $scope.images = [];

                if ($scope.images.length > 0) {
                    saveImage();
                }else{

                    $('#loader-wrapper').fadeToggle('400');
                    $scope.showSuccessMessage('SUCCESS','BIODIVERSITY_COLLECTION_MEMBER_SAVED');
                }
            });


            $scope.$on('DELETE_MEMBER', function( evt, data){

                 $('#loader-wrapper').fadeToggle('400');

                 var index =  _.findIndex( $scope.collection.associatedMembers, function( obj ){
                     return obj.id == data;
                 });

                 $scope.collection.associatedMembers.splice(index, 1);

                 $scope.collection.update();
            });

        function saveImage(){

            var promises = [];

            for(var i = 0; i < $scope.images.length; i++){

                var fd = new FormData();
                fd.append('file', $scope.images[i]);

                promises.push(
                    $http.post($rootScope.getHost() + "members/" + $stateParams.id + "/media", fd, {
                        headers : {
                            'Content-Type' : undefined
                        }
                    })
                );
            }

            $q.all( promises ).then(function( results ){

                $scope.images = null;
                $('#loader-wrapper').fadeToggle('400');
                $scope.showSuccessMessage('SUCCESS','BIODIVERSITY_COLLECTION_MEMBER_SAVED');
                $scope.$emit("IMAGE_ADDED");

            }).catch( function( errorCallback ){
                console.log(errorCallback);
            });
        }


    }
    ];
});