/**
 * Collection Specimens directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD', 'core/directives/core.table.sorter.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('specimens', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','toastr', function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, toastr) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/specimens.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate', function($scope, $rootScope, $stateParams, $translate){

                        $scope.specimensCount = 0;

                        $scope.$on('BIODIVERSITY_LOADED', function(){
                            $scope.specimensSunCount();
                        });

                        $scope.$on('BIODIVERSITY_UPDATED', function(){
                            $scope.specimensSunCount();
                        });

                        /**
                         * Add Specimen
                         */
                        $scope.addSpecimens = function() {

                            if($scope.specimen == undefined){
                                toastr.error($translate.instant('PLEASE_FILL_THE_FIELDS'), $translate.instant('ERROR'));
                                return;
                            }

                            if(!$scope.isNumeric($scope.specimen.count)){
                                toastr.error($translate.instant('THE_FIELD_COUNT_INVALID'), $translate.instant('ERROR'));
                                return;
                            }

                            if($scope.specimen.type == undefined || $scope.specimen.type.length == 0){
                                toastr.error($translate.instant('THE_FIELD_TYPE_EMPTY'), $translate.instant('ERROR'));
                                return;
                            }

                            if ($scope.collection.specimens === undefined)
                                $scope.collection.specimens = [];

                            var specimens = $scope.collection.specimens;
                            specimens[specimens.length] = $scope.specimen;
                            $scope.specimen = {};
                            $scope.specimensSunCount();
                        };

                        /**
                         * Delete Common Name
                         * @param index
                         */
                        $scope.deleteSpecimen = function(index) {
                            $scope.collection.specimens.splice(index, 1);
                            $scope.specimensSunCount();
                        };

                        $scope.specimensSunCount = function(){

                            $scope.specimensCount = 0;

                            _.each($scope.collection.specimens, function( obj ){
                                if($scope.isNumeric(obj.count)){
                                    $scope.specimensCount += parseInt(obj.count);
                                }
                            });

                        };

                    }],
                link: function (scope, element, attrs) {

                    if (scope.$parent.editMode) {
                        setEditMode();
                    } else {
                        setViewMode();
                    }

                    scope.$on('ngRepeatFinished', function() {
                        if(!scope.editMode)
                            setViewMode();
                    });

                    scope.$on('EDIT_COLLECTION', function() {
                        setEditMode();
                    });

                    scope.$on('CANCEL_EDIT_COLLECTION', function() {
                        setViewMode();
                    });

                    scope.$on('SAVE_COLLECTION', function() {
                        setViewMode();
                    });

                    function setViewMode(){
                        $(element).find('input[type="text"]').prop('readonly', true);
                    }

                    function setEditMode(){
                        $(element).find('input[type="text"]').prop('readonly', false);
                    }

                }
            };
        }]);
});
