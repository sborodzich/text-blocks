'use strict';

var ng = require('angular');

ng.module('blocks-list')
    .directive('textBlockItem', ['textBlocksListService', function (textBlocksListService) {

        return {
            restrict: 'EA',
            templateUrl: 'components/text-blocks-list/templates/text-block.html',
            replace: true,
            scope: {
                textBlock: '=',
                elemIndex: '='
            },
            link: function (scope, element, attrs) {
                var closeButton = element.find('.close-button');

                scope.isComplex = textBlocksListService.returnType(scope.textBlock) === 'complex';

                element.on('click', function () {
                    element.toggleClass('selected');

                    scope.$apply(function () {
                        textBlocksListService.elementSelection(scope.textBlock);
                    });
                });

                closeButton.on('click', function (event) {
                    var type = textBlocksListService.returnType(scope.textBlock);

                    if (type === 'complex') {
                        var confirmation = confirm('Do you really want to delete this item?');

                        if (confirmation) {
                            scope.$apply(function () {
                                textBlocksListService.deleteElement(scope.elemIndex);
                            });
                        } else {
                            event.stopPropagation();
                        }
                    } else if (type === 'simple') {
                        scope.$apply(function () {
                            textBlocksListService.deleteElement(scope.elemIndex);
                        });
                    }
                });

                element.on('dblclick', function () {
                    scope.$apply(function () {
                        textBlocksListService.changeBlockColor(scope.textBlock);
                    });
                });
            }
        };
    }]);