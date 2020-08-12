var c_k_screeps_outwards = {
    trySpawn: function (name, bodyparts, spawnName, targetRoom, ifFunction, missionNumber) {
        var spawn = Game.spawns[spawnName];
        var screeps_x = _.filter(Game.creeps, function (creep) { return creep.memory.role == name && creep.memory.spawnName == spawn.name; });
        function spawnCreepByRole(name, bodyparts) {
            var newName = name + Game.time + [spawn.name];
            var ifOk = spawn.spawnCreep(bodyparts, newName, {
                memory: {
                    role: name,
                    spawnName: spawnName,
                    targetRoom: targetRoom,
                    missionNumber: missionNumber
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
                return 0;
            }
            else if (ifOk == ERR_NOT_ENOUGH_ENERGY) {
                console.log('warning: spawning ' + bodyparts.join() + ' low energy, spawning failed');
                return -404;
            }
            else if (ifOk == ERR_BUSY) {
                return -500;
            }
            else {
                console.log('warning: spawning failed,return: ' + ifOk);
                return ifOk;
            }
        }
        if (ifFunction) {
            spawnCreepByRole(name, bodyparts);
        }
    },
    keepCreepNumber: function (number, screepName, spawnName, missionNumber) {
        var spawn = Game.spawns[spawnName];
        var screeps_x = _.filter(Game.creeps, function (creep) { return creep.memory.role == screepName
            && creep.memory.spawnName == spawn.name && creep.memory.missionNumber == missionNumber; });
        if (screeps_x.length < number) {
            return true;
        }
        else {
            return false;
        }
    },
    goToRoom: function (creep) {
        if (creep.room.name != creep.memory.targetRoom) {
            creep.moveTo(new RoomPosition(25, 20, creep.memory.targetRoom), {
                visualizePathStyle: {
                    stroke: '#ffffff'
                }
            });
            return false;
        }
        else {
            return true;
        }
    },
    moveToRoom: function (creep, roomName) {
        if (creep.room.name != roomName) {
            creep.moveTo(new RoomPosition(25, 20, roomName), {
                visualizePathStyle: {
                    stroke: '#ffffff'
                }
            });
            return false;
        }
        else {
            return true;
        }
    }
};
module.exports = c_k_screeps_outwards;
