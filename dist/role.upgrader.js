var roleUpgrader_m = {
    run: function (creep) {
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }
        var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (target) {
            creep.pickup(target);
        }
        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES, {
                filter: function (Source) {
                    return Source.energy > 0;
                }
            });
            var targets2 = creep.room.find(FIND_STRUCTURES, {
                filter: function (i) { return i.structureType == STRUCTURE_CONTAINER &&
                    i.store[RESOURCE_ENERGY] > 0; }
            });
            if (sources[0]) {
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {
                        visualizePathStyle: {
                            stroke: '#ffaa00'
                        }
                    });
                }
            }
            else if (targets2[0]) {
                if (creep.withdraw(targets2[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets2[0], {
                        visualizePathStyle: {
                            stroke: '#ffaa00'
                        }
                    });
                }
            }
        }
    }
};
module.exports = roleUpgrader_m;
