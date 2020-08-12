{
    var roleUpgrader_1 = require('role.upgrader');
    var roleBuilder_1 = require('role.builder');
    var tower_sp_1 = require('tower');
    var roleHarvester_1 = {
        run: function (creep) {
            if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] < 50) {
                creep.memory.harvesting = true;
                creep.say('🔄 harvest');
            }
            if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
                creep.memory.harvesting = false;
                creep.say('🚧 transfer');
            }
            var targets2 = creep.room.find(FIND_STRUCTURES, {
                filter: function (i) { return i.structureType == STRUCTURE_CONTAINER &&
                    i.store[RESOURCE_ENERGY] > 0; }
            });
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: function (structure) {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            var closestTargets = creep.pos.findClosestByRange(targets);
            var targets1 = creep.room.find(FIND_STRUCTURES, {
                filter: function (structure) {
                    return structure.structureType == STRUCTURE_CONTAINER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            var sources = creep.room.find(FIND_SOURCES, {
                filter: function (Source) {
                    return Source.energy > 0;
                }
            });
            var targets3 = creep.room.find(FIND_STRUCTURES, {
                filter: function (structure) {
                    return (structure.structureType == STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > creep.room.controller.level * 70);
                }
            });
            var storage_e = (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] > 0) ? creep.room.storage : null;
            var storage_ne = (creep.room.storage && creep.room.storage.store[RESOURCE_ENERGY] == 0) ? creep.room.storage : null;
            var storage_nfe = (creep.room.storage && creep.room.storage.store.getFreeCapacity(RESOURCE_ENERGY) > 0) ? creep.room.storage : null;
            if ((!targets.length && !targets1.length && !targets3.length && !storage_nfe)) {
                roleBuilder_1.run(creep);
                return;
            }
            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target) {
                creep.pickup(target);
            }
            if (creep.memory.harvesting) {
                var do_withdraw = -1;
                if (targets.length > 0 &&
                    (targets2.length > 0 || storage_e)) {
                    do_withdraw = 1;
                }
                else if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    do_withdraw = 0;
                }
                else {
                    do_withdraw = 2;
                }
                if (do_withdraw == 1 && (storage_ne || !creep.room.storage)) {
                    if (creep.withdraw(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets2[0], {
                            visualizePathStyle: {
                                stroke: '#ffaa00'
                            }
                        });
                    }
                }
                else if (do_withdraw == 1 && storage_e) {
                    if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {
                            visualizePathStyle: {
                                stroke: '#ffaa00'
                            }
                        });
                    }
                }
                else if (do_withdraw == 0) {
                    creep.moveTo(sources[0], {
                        visualizePathStyle: {
                            stroke: '#ffaa00'
                        }
                    });
                }
            }
            else {
                if (targets.length > 0) {
                    if (creep.transfer(closestTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestTargets, {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                }
                else if (targets3.length > 0) {
                    tower_sp_1.getEnergy(creep);
                }
                else if (targets1.length > 0) {
                    if (creep.transfer(targets1[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets1[0], {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                }
                else if (storage_nfe) {
                    if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                }
            }
        }
    };
    module.exports = roleHarvester_1;
}
