'use strict';

var ng = require('angular');

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