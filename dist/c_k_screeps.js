var moduleOx = {
    run: function (name, number, bodyparts, spawnName) {
        var spawn = Game.spawns[spawnName];
        var screeps_x = _.filter(Game.creeps, function (creep) { return creep.memory.role == name && creep.room.name == spawn.room.name; });
        var bodypartsCount = 0;
        var roomname = spawn.room.name;
        for (var i = 0; i < screeps_x.length; i++) {
            bodypartsCount += screeps_x[i].body.length;
        }
        if (!Memory.reset_time_recorder) {
            Memory.reset_time_recorder = {};
        }
        if (!Memory.time_recorder[spawn.name]) {
            Memory.time_recorder[spawn.name] = 0;
        }
        function spawnCreepByRole(name, bodyparts) {
            var newName = name + Game.time + [spawn.name];
            var ifOk = spawn.spawnCreep(bodyparts, newName, {
                memory: {
                    role: name,
                    spawnName: spawnName
                }
            });
            if (ifOk == OK) {
                console.log('Spawning new ' + name + ': ' + newName);
                if (!Memory.stats.creep_num[spawn.name]) {
                    Memory.stats.creep_num[spawn.name] = {};
                }
                if (!Memory.stats.creep_num[spawn.name][name]) {
                    Memory.stats.creep_num[spawn.name][name] = 0;
                }
                Memory.stats.creep_num[spawn.name][name] = screeps_x.length + 1;
                console.log(name + ' changed: ' + Memory.stats.creep_num[spawn.name][name]);
                Memory.reset_time_recorder[spawn.name] = true;
            }
            else if (ifOk == ERR_NOT_ENOUGH_ENERGY) {
                console.log('warning: spawning ' + bodyparts.join() + ' low energy, spawning failed');
                Memory.reset_time_recorder[spawn.name] = true;
            }
            else if (ifOk == ERR_BUSY) { }
            else {
                console.log('warning: spawning failed,return: ' + ifOk);
            }
        }
        if (name == ('harvester' || 'energyMiner' || 'carrier') && screeps_x.length == 0) {
            spawnCreepByRole(name, bodyparts);
        }
        if (screeps_x.length < number && Memory.time_recorder[spawn.name] > 0 && spawn.spawnCreep([WORK, CARRY, MOVE], 'test', {
            dryRun: true
        }) != ERR_BUSY) {
            Memory.time_recorder[spawn.name] -= 2;
        }
        if ((screeps_x.length < number && name == ('harvester' || 'energyMiner' || 'carrier') && Memory.time_recorder[spawn.name] > 4 && Memory.time_recorder[spawn.name] < 16) ||
            (screeps_x.length < number && name == ('harvester' || 'energyMiner' || 'carrier') && (Game.rooms[roomname].energyAvailable == Game.rooms[roomname].energyCapacityAvailable))) {
            spawnCreepByRole(name, bodyparts);
        }
        else if ((screeps_x.length < number && Memory.time_recorder[spawn.name] < 4) ||
            (screeps_x.length < number && (Game.rooms[roomname].energyAvailable == Game.rooms[roomname].energyCapacityAvailable))) {
            spawnCreepByRole(name, bodyparts);
        }
        var container = spawn.room.find(FIND_STRUCTURES, {
            filter: function (i) { return i.structureType == STRUCTURE_CONTAINER; }
        });
        if (screeps_x.length < number && Memory.reset_time_recorder[spawn.name] == true) {
            Memory.reset_time_recorder[spawn.name] = false;
            Memory.time_recorder[spawn.name] = (spawn.room.controller.level * 30 + number * 10 + bodypartsCount * 4 + ((container.length > 0 && Memory.stats.containerEnergyNum[spawnName] > 5000) ? 0 : 480));
            if (name == ('harvester' || 'energyMiner' || 'carrier') && screeps_x.length == 0) {
                Memory.time_recorder[spawn.name] += ((spawn.room.controller.level <= 3) ? 0 : spawn.room.controller.level - 2) * 170;
            }
        }
    }
};
module.exports = moduleOx;
