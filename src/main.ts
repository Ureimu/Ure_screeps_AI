import {globalFunctionRegister} from "./globalFunction"
import {mountPrototypeExtension} from "./mountPrototypeExtension"

module.exports.loop = function () {
    globalFunctionRegister();
    mountPrototypeExtension();
    Game.spawns['Spawn1'].spawnCreep(global.bpg([{'work':1,'move':1,'carry':1}]),'harv'+1);
}