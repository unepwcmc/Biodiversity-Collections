define(['angularAMD', 'core/factory/imageFactory' ], function (angularAMD) {

    'use strict';

    angularAMD.directive('imageThumbnail', ['$timeout','$http',   function ( $timeout, $http ) {

            return {

                restrict: 'EA',
                templateUrl: 'views/core/thumbnail.tpl.html',
                scope:{
                    attachment:"=",
                    width:'=',
                    height:'='
                },
                controller: ['$scope', '$http', '$rootScope', function( $scope, $http, $rootScope) {

                        $scope.loadImage = function( img ){

                            if( $scope.attachment != undefined){

                                img.attr('src',"/images/icons/ajax-loader.gif");

                                $timeout( function(){

                                    $http.get($rootScope.getHost() + "medias/" +  $scope.attachment + "/image")
                                        .success( function( data, status){
                                            img.attr('src',"data:image/*;base64," + data);
                                        });

                                },500);
                            }
                        }

                    }],
                link: function (scope, element, attrs) {

                    scope.$watch('attachment', function(newValue, oldValue){
                        scope.loadImage($(element).find('img'));
                    },true);
                }
            };
        }]);
});
