define(['angularAMD', 'jquery'], function (angularAMD) {

    'use strict';

    angularAMD.directive('elastic', ['$timeout', '$parse', function($timeout, $parse) {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {
                    $scope.initialHeight = $scope.initialHeight || element[0].style.height;

                    var resize = function(eventType) {
                        //var paddingTop = Number($(element).css('padding-top').replace("px", "")) || 0,
                        //    paddingBottom = Number($(element).css('padding-bottom').replace("px", "")) || 0,
                        //    convertedPadding = paddingTop + paddingBottom,
                        //    paddingToConsider = (eventType === 'input') ? convertedPadding : 0;

                        element[0].style.height = $scope.initialHeight;
                        var heightToUse = (element[0].scrollHeight !== 0) ? (element[0].scrollHeight) : 35;

                        element[0].style.height = "" + heightToUse + "px";
                    };

                    var modelValue = $parse(attrs.ngModel);
                    $scope.$watch(modelValue, function(value) {
                        if (value) {
                            resize();
                        }
                    });

                    element.on("input change paste cut click", function(evt) {
                        resize(evt.type);
                    });

                    $timeout(resize, 0);
                }
            };
        }
    ]);
});
