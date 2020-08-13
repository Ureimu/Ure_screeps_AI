import {globalFunctionRegister} from "./globalFunction"

module.exports.loop = function () {
    globalFunctionRegister();
    Game.spawns['Spawn1'].spawnCreep(global.bpg([{'work':1,'move':1,'carry':1}]),'harv'+1);
}