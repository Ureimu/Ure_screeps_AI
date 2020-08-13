"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionCounter = require("./actionCounter");
actionCounter.warpActions();
var mountGlobalFunction_1 = require("./mountGlobalFunction");
var mountPrototypeExtension_1 = require("./mountPrototypeExtension");
module.exports.loop = function () {
    actionCounter.init();
    mountGlobalFunction_1.globalFunctionRegister();
    mountPrototypeExtension_1.mountPrototypeExtension();
    Game.spawns['Spawn1'].spawnCreep(global.bpg([{ 'work': 1, 'move': 1, 'carry': 1 }]), 'harv' + 1);
    actionCounter.save(1500);
    if (!global.detail)
        global.detail = actionCounter.singleTick;
};
