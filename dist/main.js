"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var globalFunction_1 = require("./globalFunction");
var mountPrototypeExtension_1 = require("./mountPrototypeExtension");
module.exports.loop = function () {
    globalFunction_1.globalFunctionRegister();
    mountPrototypeExtension_1.mountPrototypeExtension();
    Game.spawns['Spawn1'].spawnCreep(global.bpg([{ 'work': 1, 'move': 1, 'carry': 1 }]), 'harv' + 1);
};
