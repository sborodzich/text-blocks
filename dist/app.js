(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('blocks-list', [
    'ui.router'
])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/text-blocks-list");

        $stateProvider
            .state('text-blocks-list', {
                url: "/text-blocks-list",
                templateUrl: "components/text-blocks-list/views/text-blocks-list.html"
            });
    }]);

require('./text-blocks-list/controllers/text-blocks-list.js');
require('./text-blocks-list/services/text-blocks-list.js');
require('./text-blocks-list/services/text-blocks-factory.js');
require('./text-blocks-list/services/utils.js');
require('./text-blocks-list/directives/text-block.js');
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./text-blocks-list/controllers/text-blocks-list.js":2,"./text-blocks-list/directives/text-block.js":3,"./text-blocks-list/services/text-blocks-factory.js":4,"./text-blocks-list/services/text-blocks-list.js":5,"./text-blocks-list/services/utils.js":6}],2:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('blocks-list')
    .controller('TextBlocksListController', ['textBlocksListService', function (textBlocksListService) {
        var self = this;

        self.textBlocksList = textBlocksListService.getTextBlocksList();

        self.selectedBlocksAmount = function () {
            return textBlocksListService.getSelectedBlocksAmount();
        };

        self.selectedRedBlocksAmount = function () {
            return textBlocksListService.getSelectedRedBlocksAmount();
        };

        self.selectedGreenBlocksAmount = function () {
            return textBlocksListService.getSelectedGreenBlocksAmount();
        };

        self.createTextBlock = function (type, text) {
            textBlocksListService.createTextBlock(type, text);

            self.text = '';
        };
    }]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('blocks-list')
    .factory('textBlocksFactory', ['utils', function (utils) {
        function SimpleTextBlock(text) {
            this.text = text || chance.sentence();
            this.selected = false;
        }

        function ComplexTextBlock(text) {
            SimpleTextBlock.apply(this, arguments);
            this.colored = false;
        }

        function createTextBlock(type, text) {
            switch (type) {
                case 'simple':
                    return new SimpleTextBlock(text);
                case 'complex':
                    return new ComplexTextBlock(text);
                default :
                    throw new Error('Fabric has no such type:' + type);
            }
        }

        utils.inherits(ComplexTextBlock, SimpleTextBlock);

        return {
            createTextBlock: createTextBlock,
            ComplexTextBlock: ComplexTextBlock,
            SimpleTextBlock: SimpleTextBlock
        };
    }]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('blocks-list')
    .service('textBlocksListService', ['textBlocksFactory', function (textBlocksFactory) {
        var self = this,
            textBlockList = [];

        self.getTextBlocksList = function () {
            return textBlockList;
        };

        self.getSelectedBlocksAmount = function () {
            return textBlockList.filter(function (textBlock) {
                return textBlock.selected;
            }).length;
        };

        self.getSelectedRedBlocksAmount = function () {
            return textBlockList.filter(function (textBlock) {
                return textBlock.selected && textBlock.colored;
            }).length;
        };

        self.getSelectedGreenBlocksAmount = function () {
            var selected = 0;

            ng.forEach(textBlockList, function (textBlock) {

                if (textBlock instanceof textBlocksFactory.ComplexTextBlock && textBlock.selected && !textBlock.colored) {
                    selected++;
                }
            });

            return selected;
        };

        self.createTextBlock = function (type, text) {
            var textBlockItem = textBlocksFactory.createTextBlock(type, text);

            textBlockList.push(textBlockItem);
        };

        self.elementSelection = function (elem) {
            elem.selected = !elem.selected;
        };

        self.deleteElement = function (elemIndex) {
            textBlockList.splice(elemIndex, 1);
        };

        self.changeBlockColor = function (elem) {
            elem.colored = !elem.colored;
        };

        self.returnType = function (elem) {
            if (elem instanceof textBlocksFactory.ComplexTextBlock) {
                return 'complex';
            } else if (elem instanceof textBlocksFactory.SimpleTextBlock) {
                return 'simple';
            }
        };
    }]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
'use strict';

var ng = (typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null);

ng.module('blocks-list')
    .factory('utils', function () {
        function inherits(child, parent) {
            child.prototype = Object.create(parent.prototype, {
                constructor: {
                    writable: false,
                    enumerable: true,
                    value: child
                }
            });
        }

        return {
            inherits: inherits
        }
    });
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
