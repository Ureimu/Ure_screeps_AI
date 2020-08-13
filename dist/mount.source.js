"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountSourceEx = void 0;
function mountSourceEx() {
    _.assign(Source.prototype, sourceExtension);
}
exports.mountSourceEx = mountSourceEx;
var sourceExtension = {
    checkBlankSpace: function () {
    },
    fillSpawnEngry: function () {
    },
    fillTower: function () {
    },
};
