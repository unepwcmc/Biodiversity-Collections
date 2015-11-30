define(['angularAMD', 'bootstrap', 'core/factory/biodiversityCollectionFactory'], function (angularAMD) {

    'use strict';

    angularAMD.directive('searchBox', function ( ) {

            return {
                restrict: 'E',
                templateUrl: 'views/core/search.box.tpl.html',
                controller: ['$scope', '$state', '$rootScope', '$translate','$window','$cookies','$http', 'BiodiversityCollection',
                  function($scope, $state, $rootScope, $translate, $window, $cookies, $http, BiodiversityCollection) {

                      $scope.collection = new BiodiversityCollection();
                      $scope.page = 0;
                      $scope.size = 20;
                      $scope.term = '';
                      $scope.searchType = 'collection';

                      $scope.searchAutocomplete = function( userInputString, timeoutPromise) {
                          $scope.term = userInputString;

                          if (userInputString == null)
                              return null;

                          return $scope.collection.autocomplete(userInputString, function(){timeout: timeoutPromise;});
                      };

                      $scope.searchSelectedFn = function(selected) {
                          if (selected) {
                              $scope.term = selected.title;
                              $state.go('collection', {id : selected.originalObject.id});
                          } else {
                              $scope.term = '';
                          }
                      };

                      $scope.search = function () {
                          return $state.go('search', {term: $scope.term});
                      };

                }],
                link: function (scope, element, attrs) {


                }
            };
    });
});
