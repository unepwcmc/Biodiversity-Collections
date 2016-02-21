define(['angularAMD', 'bootstrap'], function (angularAMD) {

    'use strict';

    angularAMD.directive('translateBox', function () {

        return {
            restrict: 'EA',
            templateUrl: 'views/core/translate.box.tpl.html',
            controller: ['$scope', '$rootScope', '$translate', '$window','$cookies', function ($scope, $rootScope, $translate, $window, $cookies) {

                    $scope.isUserAdministrator = ($rootScope.userRole == 'ADMIN');

                    $scope.changeLanguage = function (key) {

                        $translate.preferredLanguage( key );
                        $translate.use( key );
                        $rootScope.$broadcast("languageChanged", $translate.use());
                        $cookies.put($cookies.get('userId'), key );

                    };

                    $scope.getCookieValue = function( ){
                        return $cookies.get($cookies.get('userId'));
                    };

                    $scope.isAuthenticated = function(){
                        return $rootScope.logged && $scope.isUserAdministrator;
                    };

                    $scope.$on("LogoutDone", function(  ){
                        $translate.use('pt_BR');
                    });

                    $scope.$on("AuthenticationDone", function( evt, data){

                        $translate.use(data.language);

                        $( ".translate-option" ).each(function() {
                            $( this ).val(data.language);
                        });
                    });

                }],
            link: function (scope, element, attrs) {

                $(".translate-option").change(function () {
                    scope.changeLanguage($(this).val());
                });

                if(scope.isAuthenticated()){
                    if(scope.getCookieValue() != null){
                        $(".translate-option").each(function() {
                            $( this ).val(scope.getCookieValue());
                        });
                    }
                }

                scope.$on('languageChanged', function (evt, data) {
                    $(".translate-option").each(function () {
                        $(this).val(data);
                    });

                }, true);
            }
        };
    });
});
