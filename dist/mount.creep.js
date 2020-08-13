"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountCreepEx = void 0;
function mountCreepEx() {
    _.assign(Creep.prototype, creepExtension);
}
exports.mountCreepEx = mountCreepEx;
var creepExtension = {
    checkEnemy: function () {
    },
    fillSpawnEngry: function () {
    },
    fillTower: function () {
    },
};
