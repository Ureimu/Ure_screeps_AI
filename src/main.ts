import { spawn } from "child_process"
import { worker } from "cluster"

module.exports.loop = function () {
    Game.spawns['Spawn1'].spawnCreep(['move','carry','work'],'harv'+1);
}