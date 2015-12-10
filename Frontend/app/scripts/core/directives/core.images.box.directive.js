define(['angularAMD', 'core/factory/imageFactory' ], function (angularAMD) {

    'use strict';

    angularAMD.directive('imagesBox', ['$timeout', '$rootScope', 'toastr', 'Image','BaseController',
        function ( $timeout, $rootScope, toastr, Image, BaseController ) {

            return {

                restrict: 'EA',
                templateUrl: 'views/core/images.box.tpl.html',
                scope: { title: '@', images: '=', id: '@' },
                controller: ['$scope', '$http', '$rootScope', '$state', '$q', '$stateParams', '$translate',
                    function( $scope, $http, $rootScope, $state, $q, $stateParams, $translate ) {

                        angular.extend($scope, BaseController);

                        $rootScope.$watch('editMode', function(newValue, oldValue){
                            $scope.editMode = $rootScope.editMode;
                        },true);

                        $scope.$watch('images.length', function(newValue, oldValue){
                            if(newValue != oldValue)
                                 loadImage();
                        },true);

                        $scope.addFile = function( files ){

                            for(var i = 0; i < files.length; i++){

                                if(files[i].size > 1024 * 1024 * 5){
                                     $scope.showWarningMessage('THE_FILE_SIZE_ETC','WARNING');
                                     return;
                                }
                            }

                            $rootScope.$broadcast("ATTACH_FILE", files );
                        };

                        $scope.removeImage = function( id ){
                            $rootScope.$broadcast("REMOVE_IMAGE", id );
                        };

                        $rootScope.$on('IMAGE_ADDED', function(){
                            loadImage();
                            $('#ipt-file').val(null);
                        },true);

                        function loadImage(){

                            if($scope.images.length > 0){

                                for(var i = 0; i < $scope.images.length; i++){

                                    (function( index ){

                                        $timeout( function(){

                                            if(index == 0){
                                                $('#box-image').attr('src',$rootScope.getHost() + "medias/" + $scope.images[index].attachment.id + "/image");
                                            }
                                            var thumbnail = $('#box-image-' + ( index +1 ));
                                                thumbnail.attr('src',$rootScope.getHost() + "medias/" + $scope.images[index].attachment.id + "/image");
                                                thumbnail.next().data('img-id', $scope.images[index].id );
                                                thumbnail.data('empty', 0);

                                        },250);

                                    })(i);

                                }
                            }
                            else if( $scope.id != '')
                                $('#box-image').attr('src',$rootScope.getHost() + "medias/" + $scope.id + "/image");
                        }

                    }],
                link: function (scope, element, attrs) {

                    $('#ipt-file').on('change', function (evt) {

                        var files = $(evt.currentTarget).get(0).files;

                        if( files.length > 5){
                            scope.showWarningMessage('ONLY_FIVE_FILES_WILL_BE_SELECTED','WARNING');
                        }

                        if(files.length > 0) {
                            showSelectedImage(files);
                            scope.addFile(files);
                        }
                    });

                    $('a.bt-img-close-click').click( function( evt ){

                        scope.removeImage($(this).data('img-id'));
                        $(this).prev().attr("src", "/images/empty_img.png");
                        $(this).prev().data("empty", 1);

                    });

                    $('.img-thumbnail-mini').click(function(evt){
                        $('#box-image').attr('src',$(this).attr('src'));
                    });

                    function showSelectedImage( files ){

                        for(var i = 0; i < files.length; i++){

                            (function(file, index) {

                                var selectedFile = file;
                                var reader = new FileReader();

                                reader.onload = function(event) {

                                    var thumbnail = $('#box-image-' + ( index +1));

                                    if(thumbnail.data('empty') == 1){

                                        if(index == 0){
                                            $('#box-image').attr('src',event.target.result);
                                        }
                                        thumbnail.attr('src',event.target.result);
                                        thumbnail.data('empty', 0);
                                    }

                                };
                                reader.readAsDataURL(selectedFile);

                            })(files[i], i);
                        }
                    }

                }
            };
        }]);
});
