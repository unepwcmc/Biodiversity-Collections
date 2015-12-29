/**
 * Collection Samples directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD','core/factory/sampleFactory','core/directives/core.thumbnail.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('samples', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Sample','$q',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Sample, $q) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/samples.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.checkboxes_selected = false;
                        $scope.checkboxCount = 0;

                        $scope.samples = new Sample();
                        angular.extend($scope.samples,{totalElements : 0, number: 0, size: 5, totalPages: 0});
                        $scope.samples.load( $stateParams.id,  $scope.samples.number, $scope.samples.size);

                        $scope.$on('SAMPLE_LOADED', function( ) {
                            console.log('Samples Loaded...');
                        });

                        $scope.paginateSample = function(page, size){
                            $scope.samples.load( $stateParams.id , page, size);
                        };

                        $scope.singleCheckBoxEvent = function($event){

                            if($($event.currentTarget).is(":checked"))
                                $scope.checkboxCount+=1;
                            else
                                $scope.checkboxCount-=1;
                        };

                        $scope.removeSample = function( id ){

                                if($scope.samples.number > 0){
                                    if( (($scope.samples.totalElements - 1) % $scope.samples.size) == 0){
                                        $scope.samples.number = $scope.samples.number - 1;
                                        $scope.samples.totalPages = $scope.samples.totalPages - 1;
                                    }
                                }

                                $scope.collection.removeSample( $stateParams.id, id, function( data, status){

                                    if(status === 200){
                                        $scope.paginateSample($stateParams.id, $scope.samples.number, $scope.samples.size);
                                        $scope.showSuccessMessage('SAMPLE_DELETED_SUCCESSFULLY','SUCCESS');
                                    }else{
                                        $scope.showErrorMessage( data ,'ERROR');
                                    }
                                });


                            /*if( removeLine)
                               $($event.currentTarget).closest('tr').remove();

                            if(!(_.contains(_.pluck($scope.associatedModel, 'id'), id))){

                                $scope.associatedModel.push( {id: id, command: $http({ method:'DELETE', url: $rootScope.getHost() + "collections/" + $stateParams.id + "/sample/" + id }) });

                                $scope.samples.totalElements = $scope.samples.totalElements - 1;

                                if($scope.samples.number > 0){
                                    if( (($scope.samples.totalElements - 1) % $scope.samples.size) == 0){
                                        $scope.samples.number = $scope.samples.number - 1;
                                        $scope.samples.totalPages = $scope.samples.totalPages - 1;
                                    }
                                }
                            }
                            else{

                                var index = _.indexOf(_.pluck($scope.associatedModel, 'id'), id);
                                $scope.associatedModel.splice(index, 1);
                            }*/
                        };

                        $scope.checkAndUnCheckAll = function(){

                            $scope.checkboxes_selected = !$scope.checkboxes_selected;

                            if($scope.checkboxes_selected && $scope.checkboxCount > 0){
                                $scope.checkboxCount = 0;
                            }

                            $("input[type=checkbox].sample-checkbox-delete").each(function () {

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

                            $('#checkbox-all').prop("checked", false);

                            var promises = [];

                            $("input[type=checkbox].sample-checkbox-delete").each(function () {
                                if($(this).is(":checked")){
                                    if($(this).data('sample-id') != undefined){
                                        promises.push( $http({ method:'DELETE', url: $rootScope.getHost() + "collections/" + $stateParams.id + "/sample/" + $(this).data('sample-id') }) );
                                    }
                                }
                            });

                            $q.all( promises ).then(function( results ){
                                $scope.showSuccessMessage('SAMPLES_DELETED_SUCCESSFULLY','SUCCESS');
                                console.log($scope.samples);
                                $scope.samples.load( $stateParams.id,  $scope.samples.number, $scope.samples.size);
                                $scope.checkboxes_selected = !$scope.checkboxes_selected;
                                $scope.checkboxCount = 0;
                            });
                        };

                        $scope.$watch('collection', function(newValue, oldValue){
                             if(newValue != oldValue)
                                 $scope.samples.load( $stateParams.id,  $scope.samples.number, $scope.samples.size);
                        }, true);


                    }],
                link: function (scope, element, attrs) {

                    $("#sample-size-box").change(function() {
                        scope.samples.size = parseInt($(this).val());
                        scope.paginateSample(scope.samples.number, parseInt($(this).val()));
                    });

                }
            };
        }]);
});
