'use strict';

var ng = require('angular');

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