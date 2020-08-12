{
    var ckso_1 = require('c_k_screeps_outwards');
    var roleExtraCarrier_1 = {
        run: function (creep) {
            if (!creep.memory.carrying.carryFrom || !creep.memory.carrying.carryTo || !creep.memory.carrying.carryThings) {
                console.log('bug Here In Extra Carrier');
            }
            else {
                var origin_1 = Game.getObjectById(creep.memory.carrying.carryFrom);
                var destination = Game.getObjectById(creep.memory.carrying.carryTo);
                var things = creep.memory.carrying.carryThings;
                if (!creep.memory.harvesting && creep.store[things] == 0) {
                    creep.memory.harvesting = true;
                    creep.say('🔄 harvest');
                }
                if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
                    creep.memory.harvesting = false;
                    creep.say('🚧 transfer');
                }
                if (creep.memory.harvesting) {
                    if (creep.withdraw(origin_1, things) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(origin_1, {
                            visualizePathStyle: {
                                stroke: '#ffaa00'
                            }
                        });
                    }
                }
                else {
                    if (creep.transfer(destination, things) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(destination, {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                }
            }
        },
        keep: function (missionNumber) {
            ckso_1.trySpawn('extraCarrier', Memory.creepWorkSetting.extraCarrier[missionNumber].bodyparts, Memory.creepWorkSetting.extraCarrier[missionNumber].spawnName, Memory.creepWorkSetting.extraCarrier[missionNumber].targetRoom, ckso_1.keepCreepNumber(1, 'extraCarrier', Memory.creepWorkSetting.extraCarrier[missionNumber].spawnName, missionNumber)
                && Memory.creepWorkSetting.extraCarrier[missionNumber].ifRun, missionNumber);
        },
        creepMemory: function (creep, carryFrom, carryTo, carryThings) {
            if (!creep.memory.carrying) {
                creep.memory.carrying = {
                    carryFrom: carryFrom,
                    carryTo: carryTo,
                    carryThings: carryThings
                };
            }
        },
        workSetting: function (i, carryFrom, carryTo, carryThings, spawnName, bodyparts, targetRoom) {
            Memory.creepWorkSetting.extraCarrier[i] = {
                'carryFrom': carryFrom,
                'carryTo': carryTo,
                'carryThings': carryThings,
                'spawnName': spawnName,
                'bodyparts': bodyparts,
                'targetRoom': targetRoom,
                'ifRun': false
            };
        },
        workSettingLog: function (i, logString) {
            if (!Memory.creepWorkSetting.extraCarrier[i].logString) {
                Memory.creepWorkSetting.extraCarrier[i].logString = logString;
            }
        }
    };
    module.exports = roleExtraCarrier_1;
}
