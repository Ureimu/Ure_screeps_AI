import actionCounter = require("./actionCounter");
actionCounter.warpActions();
import { globalFunctionRegister } from "./mountGlobalFunction"
import { mountPrototypeExtension } from "./mountPrototypeExtension"


module.exports.loop = function () {
    actionCounter.init();

    globalFunctionRegister();
    mountPrototypeExtension();

    Game.spawns['Spawn1'].spawnCreep(global.bpg([{ 'work': 1, 'move': 1, 'carry': 1 }]), 'harv' + 1);
    Game.spawns['Spawn1'].memory
    actionCounter.save(1500);
    if (!global.detail) global.detail = actionCounter.singleTick;//打印所有任务的详细cpu消耗情况列表
}