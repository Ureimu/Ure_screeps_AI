{
    var ckso_1 = require('c_k_screeps_outwards');
    var roleOutwardsEnergyMiner = {
        run: function (creep) {
            if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] < 50) {
                creep.memory.harvesting = true;
                creep.say('🔄 harvest');
            }
            if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
                creep.memory.harvesting = false;
                creep.say('🚧 transfer');
            }
            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target) {
                creep.pickup(target);
            }
            if (!creep.memory.lasthits) {
                creep.memory.lasthits = creep.hits;
                creep.memory.beingAttacked = false;
            }
            if (creep.hits < creep.memory.lasthits) {
                creep.say('attacked');
                creep.memory.beingAttacked = true;
            }
            if (creep.memory.beingAttacked == true && creep.hits == creep.hitsMax) {
                creep.say('healed');
                creep.memory.beingAttacked = false;
            }
            creep.memory.lasthits = creep.hits;
            if (creep.memory.harvesting) {
                var targetSourceFlag_1 = Game.flags[creep.memory.harvestinginf.targetSourceFlag];
                if (ckso_1.moveToRoom(creep, targetSourceFlag_1.pos.roomName)) {
                    var source = creep.room.find(FIND_SOURCES, {
                        filter: function (Source) {
                            return (Source.pos.x == targetSourceFlag_1.pos.x
                                && Source.pos.y == targetSourceFlag_1.pos.y);
                        }
                    });
                    if (creep.harvest(source[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source[0], {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                }
            }
            else {
                var targetContainerFlag_1 = Game.flags[creep.memory.harvestinginf.targetContainerFlag];
                if (ckso_1.moveToRoom(creep, targetContainerFlag_1.pos.roomName)) {
                    var container = creep.room.find(FIND_STRUCTURES, {
                        filter: function (i) {
                            return (i.pos.x == targetContainerFlag_1.pos.x
                                && i.pos.y == targetContainerFlag_1.pos.y);
                        }
                    });
                    if (creep.transfer(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container[0], {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                }
            }
        },
        keep: function (missionNumber) {
            ckso_1.trySpawn('outwardsEnergyMiner', Memory.creepWorkSetting.outwardsEnergyMiner[missionNumber].bodyparts, Memory.creepWorkSetting.outwardsEnergyMiner[missionNumber].spawnName, Memory.creepWorkSetting.outwardsEnergyMiner[missionNumber].targetRoom, ckso_1.keepCreepNumber(Memory.creepWorkSetting.outwardsEnergyMiner[missionNumber].spawnNumber, 'outwardsEnergyMiner', Memory.creepWorkSetting.outwardsEnergyMiner[missionNumber].spawnName, missionNumber)
                && Memory.creepWorkSetting.outwardsEnergyMiner[missionNumber].ifRun, missionNumber);
        },
        creepMemory: function (creep, targetSourceFlag, targetContainerFlag) {
            if (!creep.memory.harvestinginf) {
                creep.memory.harvestinginf = {};
                creep.memory.harvestinginf.targetSourceFlag = targetSourceFlag;
                creep.memory.harvestinginf.targetContainerFlag = targetContainerFlag;
            }
        },
        workSetting: function (i, targetSourceFlag, targetContainerFlag, spawnName, bodyparts, targetRoom, spawnNumber) {
            Memory.creepWorkSetting.outwardsEnergyMiner[i] = {
                'targetSourceFlag': targetSourceFlag,
                'targetContainerFlag': targetContainerFlag,
                'spawnName': spawnName,
                'bodyparts': bodyparts,
                'targetRoom': targetRoom,
                'spawnNumber': spawnNumber,
                'ifRun': false
            };
        },
        workSettingLog: function (i, logString) {
            if (!Memory.creepWorkSetting.outwardsEnergyMiner[i].logString) {
                Memory.creepWorkSetting.outwardsEnergyMiner[i].logString = logString;
            }
        }
    };
    module.exports = roleOutwardsEnergyMiner;
}
