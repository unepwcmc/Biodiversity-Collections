define(['angularAMD', 'bootstrap'], function (angularAMD) {

  'use strict';

  angularAMD.directive('translateBox', function () {

    return {
      restrict: 'EA',
      templateUrl: 'views/core/translate.box.tpl.html',
      controller: ['$scope', '$rootScope', '$translate', '$window',
        function($scope, $rootScope, $translate, $window){

          $scope.isUserAdministrator = ($rootScope.userRole == 'ADMIN');

          $scope.changeLanguage = function ( key ) {
            $translate.preferredLanguage( key );
            $translate.use( key );
            $rootScope.$broadcast("languageChanged", $translate.use());
          };

        }],
      link: function (scope, element, attrs) {

        $( ".translate-option" ).change(function() {
          scope.changeLanguage($(this).val());
        });

        scope.$on('languageChanged', function( evt, data){
          $( ".translate-option" ).each(function() {
            $( this ).val(data);
          });
        },true);
      }
    };
  });
});
