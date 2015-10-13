'use strict';

var ng = require('angular');

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