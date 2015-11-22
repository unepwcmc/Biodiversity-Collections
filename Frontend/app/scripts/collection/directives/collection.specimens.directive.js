/**
 * Collection Specimens directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define(['angularAMD'], function (angularAMD) {

    'use strict';

    angularAMD.directive('specimens', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies) {

            return {
                restrict: 'E',
                templateUrl: 'views/collection/specimens.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.specimensCount = 0;
                        $scope.specimenEditMode = false;

                        $scope.$on('BIODIVERSITY_LOADED', function(){
                            specimensSunCount();
                        });

                        $scope.$on('BIODIVERSITY_UPDATED', function(){
                            specimensSunCount();
                        });

                        /**
                         * Add Specimen
                         */
                        $scope.addSpecimens = function() {

                            var specimens = $scope.collection.specimens;
                            specimens[specimens.length] = $scope.specimen;
                            $scope.specimen = {};
                            specimensSunCount();
                        };

                        /**
                         * Delete Common Name
                         * @param index
                         */
                        $scope.deleteSpecimen = function(index) {
                            $scope.collection.specimens.splice(index, 1);
                            specimensSunCount();
                        };

                        function specimensSunCount(){

                            $scope.specimensCount = 0;

                            _.each($scope.collection.specimens, function( obj ){
                                $scope.specimensCount += parseInt(obj.count);
                            });
                        }

                    }],
                link: function (scope, element, attrs) {

                    setViewMode();

                    scope.$on('ngRepeatFinished', function() {
                        if(!scope.specimenEditMode)
                            setViewMode();
                    });

                    scope.$on('EDIT_COLLECTION', function() {
                        scope.specimenEditMode = true;
                        setEditMode();
                    });

                    scope.$on('CANCEL_EDIT_COLLECTION', function() {
                        scope.specimenEditMode = false;
                        setViewMode();
                    });

                    scope.$on('SAVE_COLLECTION', function() {
                        scope.specimenEditMode = false;
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
