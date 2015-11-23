define(['angularAMD', 'bootstrap'], function (angularAMD) {

    'use strict';

    angularAMD.directive('searchBox', function ( ) {

        return {
            restrict: 'E',
            templateUrl: 'views/core/search.box.tpl.html',
            controller: ['$scope', '$rootScope', '$translate','$window','$cookies','$http',
              function($scope, $rootScope, $translate, $window, $cookies, $http) {

                  $scope.searchAutocomplete = function( userInputString, timeoutPromise){

                      if (userInputString == null)
                          return null;

                      return $http.get( $rootScope.getHost() + "collections/" + userInputString + "/curators",
                          {
                              timeout: timeoutPromise
                          }
                      );
                  };

            }],
            link: function (scope, element, attrs) {


            }
        };
    });
});
