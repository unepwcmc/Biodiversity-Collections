define(['angularAMD', 'core/factory/imageFactory' ], function (angularAMD) {

    'use strict';

    angularAMD.directive('collectionImage', ['$timeout', '$rootScope', 'toastr', 'Image',
        function ( $timeout, $rootScope, toastr, Image ) {

            return {

                restrict: 'EA',
                templateUrl: 'views/collection/image.tpl.html',

                controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$stateParams', '$translate',
                    function( $scope, $http, $rootScope, $state, $q, $stateParams, $translate ) {

                        loadImage();

                        $scope.addFile = function( file ){

                            if(file.size > 1024 * 1024 * 5){
                                $scope.showWarningMessage('THE_FILE_SIZE_ETC','WARNING');
                                return;
                            }

                            $rootScope.$broadcast("ATTACH_FILE", file );
                        };

                        $rootScope.$on('IMAGE_ADDED', function(){
                            loadImage();
                            $('#ipt-file').val(null);
                        },true);

                        $rootScope.$on('BIODIVERSITY_LOADED', function(){
                           loadImage();
                        },true);

                        function loadImage(){
                            if( $scope.collection.image != undefined)
                                $('#collection-image').attr('src',$rootScope.getHost() + "medias/" + $scope.collection.image.attachment.id + "/image");
                        }

                    }],
                link: function (scope, element, attrs) {

                    $('#ipt-file').on('change', function (evt) {

                        if (!$(this).val().match(/(?:gif|jpg|png|bmp)$/)) {
                            scope.showWarningMessage('inputted file path is not an image!','WARNING');
                            return;
                        }

                        var files = $(evt.currentTarget).get(0).files;

                        if(files.length > 0) {
                            showSelectedImage(files);
                            scope.addFile(files[0]);
                        }
                    });

                    function showSelectedImage( files ){

                        var selectedFile = files[0];
                        var reader = new FileReader();

                        reader.onload = function(event) {
                            $('#collection-image').attr('src',event.target.result);
                        };
                        reader.readAsDataURL(selectedFile);
                    }

                }
            };
        }]);
});
