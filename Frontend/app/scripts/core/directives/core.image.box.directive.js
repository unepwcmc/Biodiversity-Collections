define(['angularAMD', 'core/factory/imageFactory' ], function (angularAMD) {

    'use strict';

    angularAMD.directive('imageBox', ['$timeout', '$rootScope', 'toastr', 'Image',
        function ( $timeout, $rootScope, toastr, Image ) {

            return {

                restrict: 'EA',
                templateUrl: 'views/core/image.box.tpl.html',
                scope: { title: '@', image: '@', id: '@' },
                controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$stateParams', '$translate',
                    function( $scope, $http, $rootScope, $state, $q, $stateParams, $translate ) {

                        $rootScope.$watch('editMode', function(newValue, oldValue){
                            $scope.editMode = $rootScope.editMode;
                        },true);


                        $scope.addFile = function( file ){

                            if(file.size > 1024 * 1024 * 5){
                                $scope.showWarningMessage('THE_FILE_SIZE_ETC','WARNING');
                                return;
                            }

                            $scope.$emit("ATTACH_FILE", file );
                        };

                        $scope.loadImage = function( img ){

                            $timeout( function(){
                                if( $scope.image != ''){

                                    img.attr('src',"/images/icons/ajax-loader-large.gif");

                                    $http.get($rootScope.getHost() + "medias/" + $scope.id + "/image")
                                        .success( function( data, status){
                                            img.attr('src',"data:image/*;base64," + data);
                                    });
                                }
                            },500)
                        };

                    }],
                link: function (scope, element, attrs) {

                    scope.$watch('id', function(newValue, oldValue){
                        scope.loadImage($(element).find('img.img-box'));
                    },true);

                    scope.$on('IMAGE_ADDED', function(){
                        scope.loadImage($(element).find('img.img-box'));
                        $(element).find('.img-file').val(null);
                    },true);

                    scope.$on('RESET_THUMBNAIL', function(){
                        $(element).find('img.img-box').attr("src", "/images/empty_img.png");
                        $(element).find('.img-file').val(null);
                    },true);

                    $(element).find('a.btn-img').click(function(){
                        $(element).find('.img-file').click();
                    });

                    $(element).find('.img-file').on('change', function (evt) {

                        if (!$(this).val().match(/(?:gif|jpg|jpeg|png|bmp)$/)) {
                            scope.showWarningMessage('INPUTTED_FILE_PATH_ERROR','WARNING');
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
                            $(element).find('img.img-box').attr('src',event.target.result);
                        };
                        reader.readAsDataURL(selectedFile);
                    }

                }
            };
        }]);
});
