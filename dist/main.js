"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globalFunction_1 = require("./globalFunction");
module.exports.loop = function () {
    globalFunction_1.globalFunctionRegister();
    Game.spawns['Spawn1'].spawnCreep(global.bpg([{ 'work': 1, 'move': 1, 'carry': 1 }]), 'harv' + 1);
};
