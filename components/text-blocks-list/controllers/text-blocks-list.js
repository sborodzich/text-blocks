'use strict';

var ng = require('angular');

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