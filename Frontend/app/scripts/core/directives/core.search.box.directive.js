define(['angularAMD', 'bootstrap', 'core/factory/biodiversityCollectionFactory', 'core/factory/networkFactory', 'core/factory/institutionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('searchBox', function ( ) {

            return {
                restrict: 'E',
                templateUrl: 'views/core/search.box.tpl.html',
                controller: ['$scope', '$state', '$rootScope', '$translate','$window','$cookies','$http', 'BiodiversityCollection', 'Network', 'Institution',
                  function($scope, $state, $rootScope, $translate, $window, $cookies, $http, BiodiversityCollection, Network, Institution) {

                      $scope.collections = new BiodiversityCollection();
                      $scope.institutions = new Institution();
                      $scope.networks = new Network();

                      $scope.page = 0;
                      $scope.size = 20;
                      $scope.term = '';
                      $scope.searchType = 'collection';
                      $scope.searchName = '';

                      $scope.searchAutocomplete = function( userInputString, timeoutPromise) {

                          $scope.term = userInputString;

                          if (userInputString == null || $scope.searchType == undefined)
                              return null;

                          if ($scope.searchType == "collection") {
                               return $scope.collections.autocomplete(userInputString, function(){timeout: timeoutPromise;});
                          }
                          if ($scope.searchType == "network") {
                              return $scope.networks.autocomplete(userInputString, function(){timeout: timeoutPromise;});
                          }

                          if ($scope.searchType == "institution") {
                              return $scope.institutions.autocompleteName(userInputString, function(){timeout: timeoutPromise;});
                          }

                          return null;
                      };

                      $scope.searchSelectedFn = function(selected) {
                          /*if (selected) {
                              $scope.term = selected.title;
                              $state.go('collection', {id : selected.originalObject.id});
                          } else {
                              $scope.term = '';
                          }*/
                      };

                      $scope.search = function () {
                           $state.go('search', { term : $scope.term, type : $scope.searchType });
                      };

                       $scope.$on('BIODIVERSITY_SEARCHED', function(){
                            $scope.searchType = 'collection';
                            $scope.searchName = $scope.searchTerm;
                       });

                       $scope.$on('NETWORK_SEARCHED', function(){
                           $scope.searchType = 'network';
                           $scope.searchName = $scope.searchTerm;
                       });

                       $scope.$on('INSTITUTION_SEARCHED', function(){
                           $scope.searchType = 'institution';
                           $scope.searchName = $scope.searchTerm;
                       });


                }],
                link: function (scope, element, attrs) {


                }
            };
    });
});
