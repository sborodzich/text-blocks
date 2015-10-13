'use strict';

var ng = require('angular');

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