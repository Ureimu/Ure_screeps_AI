{
    var ckso_1 = require('c_k_screeps_outwards');
    var roleClaimer_m = {
        run: function (creep) {
            var roomToClaim = Game.rooms[creep.memory.targetRoom];
            if (creep.memory.claiming.doReserve) {
                if (creep.room.name != creep.memory.targetRoom) {
                    creep.moveTo(new RoomPosition(25, 20, creep.memory.targetRoom));
                }
                else if (roomToClaim.controller) {
                    if (creep.reserveController(roomToClaim.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roomToClaim.controller);
                    }
                }
            }
            else if (creep.room.name != creep.memory.targetRoom) {
                creep.moveTo(new RoomPosition(25, 20, creep.memory.targetRoom));
            }
            else if (roomToClaim.controller && !roomToClaim.controller.my) {
                if (creep.claimController(roomToClaim.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roomToClaim.controller);
                }
            }
            else if (roomToClaim.controller.my) {
                if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                    creep.memory.building = false;
                    creep.say('🔄 harvest');
                }
                if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                    creep.memory.building = true;
                    creep.say('🚧 build');
                }
                var targetsSpawn_x = creep.room.find(FIND_STRUCTURES, {
                    filter: function (structure) {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                var targetsSpawn = creep.pos.findClosestByRange(targetsSpawn_x);
                if (creep.memory.building) {
                    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (targetsSpawn_x.length) {
                        if (creep.transfer(targetsSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetsSpawn, {
                                visualizePathStyle: {
                                    stroke: '#ffffff'
                                }
                            });
                        }
                    }
                    else if (targets.length) {
                        if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], {
                                visualizePathStyle: {
                                    stroke: '#ffffff'
                                }
                            });
                        }
                    }
                    else {
                        var roleUpgrader_1 = require('role.upgrader');
                        roleUpgrader_1.run(creep);
                    }
                }
                else {
                    var sources = creep.room.find(FIND_SOURCES);
                    if (sources[1].energy > 0) {
                        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sources[1], {
                                visualizePathStyle: {
                                    stroke: '#ffaa00'
                                }
                            });
                        }
                    }
                }
            }
        },
        keep: function (missionNumber) {
            ckso_1.trySpawn('claimer', Memory.creepWorkSetting.claimer[missionNumber].bodyparts, Memory.creepWorkSetting.claimer[missionNumber].spawnName, Memory.creepWorkSetting.claimer[missionNumber].targetRoom, ckso_1.keepCreepNumber(Memory.creepWorkSetting.claimer[missionNumber].spawnNumber, 'claimer', Memory.creepWorkSetting.claimer[missionNumber].spawnName, missionNumber)
                && Memory.creepWorkSetting.claimer[missionNumber].ifRun, missionNumber);
        },
        creepMemory: function (creep, doReserve) {
            if (!creep.memory.claiming) {
                creep.memory.claiming = {
                    doReserve: doReserve
                };
            }
        },
        workSetting: function (i, doReserve, spawnName, bodyparts, targetRoom, spawnNumber) {
            Memory.creepWorkSetting.claimer[i] = {
                'doReserve': doReserve,
                'spawnName': spawnName,
                'bodyparts': bodyparts,
                'targetRoom': targetRoom,
                'spawnNumber': spawnNumber,
                'ifRun': false
            };
        },
        workSettingLog: function (i, logString) {
            if (!Memory.creepWorkSetting.claimer[i].logString) {
                Memory.creepWorkSetting.claimer[i].logString = logString;
            }
        }
    };
    module.exports = roleClaimer_m;
}
