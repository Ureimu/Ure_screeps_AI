{
    var ckso_1 = require('c_k_screeps_outwards');
    var roleUltraUpgrader_m = {
        run: function (creep) {
            if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.upgrading = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.upgrading && creep.store.getFreeCapacity() < 150) {
                creep.memory.upgrading = true;
                creep.say('⚡ upgrade');
            }
            if (!creep.memory.boosted) {
                var targetLabFlag_1 = Game.flags[creep.memory.upgradinginf.targetLabFlag];
                if (ckso_1.moveToRoom(creep, targetLabFlag_1.pos.roomName)) {
                    var lab = creep.room.find(FIND_STRUCTURES, {
                        filter: function (i) {
                            return (i.pos.x == targetLabFlag_1.pos.x
                                && i.pos.y == targetLabFlag_1.pos.y);
                        }
                    });
                    var labReturn = lab[0].boostCreep(creep);
                    if (labReturn == ERR_NOT_IN_RANGE) {
                        creep.moveTo(lab[0], {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                    else if (labReturn == OK) {
                        creep.memory.boosted = true;
                    }
                }
            }
            else if (creep.memory.upgrading) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            }
            else {
                var targetSourceFlag_1 = Game.flags[creep.memory.upgradinginf.targetSourceFlag];
                if (ckso_1.moveToRoom(creep, targetSourceFlag_1.pos.roomName)) {
                    var source = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: function (i) {
                            return (i.pos.x == targetSourceFlag_1.pos.x
                                && i.pos.y == targetSourceFlag_1.pos.y);
                        }
                    });
                    if (creep.withdraw(source[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source[0], {
                            visualizePathStyle: {
                                stroke: '#ffaa00'
                            }
                        });
                    }
                }
            }
        },
        keep: function (missionNumber) {
            ckso_1.trySpawn('ultraUpgrader', Memory.creepWorkSetting.ultraUpgrader[missionNumber].bodyparts, Memory.creepWorkSetting.ultraUpgrader[missionNumber].spawnName, Memory.creepWorkSetting.ultraUpgrader[missionNumber].targetRoom, ckso_1.keepCreepNumber(Memory.creepWorkSetting.ultraUpgrader[missionNumber].spawnNumber, 'ultraUpgrader', Memory.creepWorkSetting.ultraUpgrader[missionNumber].spawnName, missionNumber)
                && Memory.creepWorkSetting.ultraUpgrader[missionNumber].ifRun, missionNumber);
        },
        creepMemory: function (creep, targetSourceFlag, targetLabFlag) {
            if (!creep.memory.upgradinginf) {
                creep.memory.upgradinginf = {};
                creep.memory.upgradinginf.targetSourceFlag = targetSourceFlag;
                creep.memory.upgradinginf.targetLabFlag = targetLabFlag;
            }
        },
        workSetting: function (i, targetSourceFlag, targetLabFlag, spawnName, bodyparts, targetRoom, spawnNumber) {
            Memory.creepWorkSetting.ultraUpgrader[i] = {
                'targetSourceFlag': targetSourceFlag,
                'targetLabFlag': targetLabFlag,
                'spawnName': spawnName,
                'bodyparts': bodyparts,
                'targetRoom': targetRoom,
                'spawnNumber': spawnNumber,
                'ifRun': false
            };
        },
        workSettingLog: function (i, logString) {
            if (!Memory.creepWorkSetting.ultraUpgrader[i].logString) {
                Memory.creepWorkSetting.ultraUpgrader[i].logString = logString;
            }
        }
    };
    module.exports = roleUltraUpgrader_m;
}
