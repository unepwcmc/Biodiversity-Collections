/**
 * Collection Sample directive
 * @author: jozecarlos.it@gmail.com
 *
 */
define([ 'angularAMD',
         'core/factory/documentFactory',
         'core/directives/core.table.sorter.directive',
         'collection/directives/collection.publication.popover.directive'], function (angularAMD) {

    'use strict';

    angularAMD.directive('publications', ['$timeout', '$rootScope', '$stateParams', '$window', '$http', '$cookies','Document','$q',

        function ($timeout, $rootScope, $stateParams, $window, $http, $cookies, Document, $q) {

            return {
                restrict: 'EA',
                templateUrl: 'views/collection/publications.tpl.html',
                controller: ['$scope', '$rootScope', '$stateParams', '$translate',
                    function($scope, $rootScope, $stateParams, $translate){

                        $scope.checkboxes_selected = false;
                        $scope.file = null;
                        $scope.documents = new Document();
                        angular.extend($scope.documents, {totalElements : 0, number: 0, size: 5, totalPages: 0});
                        $scope.documents.load($stateParams.id, $scope.documents.number, $scope.documents.size);

                        $scope.paginatePublications = function(page, size){
                            $scope.documents.load( $stateParams.id , page, size);
                        };

                        $scope.saveOrUpdate = function(){

                            console.log($scope.document);

                            if($scope.document.id){
                                $scope.updateDocument();
                            }
                            else{
                                $scope.saveNewDocument();
                            }
                        };

                        $scope.showPublicationForm = function(){

                            $scope.document = { authors :[""] };

                            $('#publicatioModal').modal('show');
                        };

                        $scope.$on('EDIT_DOCUMENT_EVENT', function( evt, data){

                            $scope.document = data;
                            $('#publicatioModal').modal('show');
                        });

                        $scope.saveNewDocument = function(){

                            if($scope.file == null){
                                $scope.showWarningMessage('PLEASE_ADD_A_FILE','WARNING');
                                return;
                            }

                            $scope.document.contentType = getFileExtension($scope.file.name);
                            $scope.document.status = true;
                            $scope.document.collection = { id: $stateParams.id };

                            $scope.documents.save($scope.document, function( data, status){

                                if(status === 200){

                                    $scope.documents.upload($scope.file, function(data, status){
                                        successState();
                                        $scope.showSuccessMessage('DOCUMENT_CREATED_SUCCESSFULLY','SUCCESS');
                                    });
                                }else{
                                    $scope.showErrorMessage( data ,'ERROR');
                                }
                            });
                        };

                        $scope.updateDocument = function(){

                            if($scope.file !== null){
                                $scope.document.contentType = getFileExtension($scope.file.name);
                            }

                            $scope.document.collection = { id: $stateParams.id };

                            $scope.documents.update( $scope.document, function( data, status){

                                if(status === 200){

                                    if($scope.file != null){

                                        $scope.documents.upload($scope.file, function(data, status){
                                                successState();
                                                $scope.showSuccessMessage('DOCUMENT_UPDATED_SUCCESSFULLY','SUCCESS');
                                        });
                                    }
                                    else{
                                        successState();
                                        $scope.showSuccessMessage('DOCUMENT_UPDATED_SUCCESSFULLY','SUCCESS');
                                    }
                                }else{
                                    $scope.showErrorMessage( data ,'ERROR');
                                }
                            });
                        };

                        $scope.deleteDocument = function( id ){

                            if($scope.documents.number > 0){
                                if( (($scope.documents.totalElements - 1) % $scope.documents.size) == 0){
                                    $scope.documents.number = $scope.documents.number - 1;
                                    $scope.documents.totalPages = $scope.documents.totalPages - 1;
                                }
                            }

                            $scope.documents.delete( id, function( data, status){

                                if(status === 200){
                                    $scope.documents.load($stateParams.id, $scope.documents.number, $scope.documents.size);
                                    $scope.showSuccessMessage('DOCUMENT_DELETED_SUCCESSFULLY','SUCCESS');
                                }else{
                                    $scope.showErrorMessage( data ,'ERROR');
                                }
                            });
                        };

                        $scope.checkAndUnCheckAll = function(){
                            $scope.checkboxes_selected = !$scope.checkboxes_selected;

                            $("input[type=checkbox]").each(function () {
                                $(this).prop("checked", $scope.checkboxes_selected);
                            });

                        };

                        $scope.deleteAll = function(){

                            var promises = [];

                            $("input[type=checkbox]").each(function () {
                                if($(this).is(":checked")){
                                    if($(this).data('publication-id') != undefined)
                                        promises.push( $http.delete( $rootScope.getHost() + "documents/" + $(this).data('publication-id') ));
                                }
                            });

                            if($scope.documents.number > 0){
                                if( (($scope.documents.totalElements - 1) % $scope.documents.size) == 0){
                                    $scope.documents.number = $scope.documents.number - 1;
                                    $scope.documents.totalPages = $scope.documents.totalPages - 1;
                                }
                            }

                            $q.all( promises ).then(function( results ){
                                $scope.showSuccessMessage('DOCUMENT_DELETED_SUCCESSFULLY','SUCCESS');
                                $scope.documents.load($stateParams.id, $scope.documents.number, $scope.documents.size);
                                $scope.checkboxes_selected = !$scope.checkboxes_selected;
                            });
                        };

                        function getFileExtension(filename)
                        {
                            var ext = /^.+\.([^.]+)$/.exec(filename);
                            return ext == null ? "" : ext[1];
                        }

                        function successState(){

                            $scope.file = null;
                            $('#publication_ipt_file').val("");
                            $scope.document = {};
                            $('#publicatioModal').modal('hide');
                            $scope.documents.load($stateParams.id, $scope.documents.number, $scope.documents.size);
                            $scope.multimedia_form.$setPristine();
                            $scope.multimedia_form.$setUntouched();
                        }

                    }],
                link: function (scope, element, attrs) {

                    $("#publication-size-box").change(function() {
                        scope.documents.size = parseInt($(this).val());
                        scope.paginatePublications(scope.documents.number, parseInt($(this).val()))
                    });

                    $('#publication_ipt_file').on('change', function (evt) {

                        var files = $(evt.currentTarget).get(0).files;

                        if(files.length > 0) {
                            scope.file = files[0];
                        }
                    });
                }
            };
        }]);
});
