{
    var roleMineralHarvester = {
        run: function (creep) {
            if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] < 50) {
                creep.memory.harvesting = true;
                creep.say('🔄 harvest');
            }
            if (creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
                creep.memory.harvesting = false;
                creep.say('🚧 transfer');
            }
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
            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target) {
                creep.pickup(target);
            }
            if (creep.memory.harvesting) {
                if (sources.length > 0) {
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {
                            visualizePathStyle: {
                                stroke: '#ffaa00'
                            }
                        });
                    }
                }
            }
            else {
                if (targets1.length > 0) {
                    if (creep.transfer(targets1[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets1[0], {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                }
            }
        }
    };
    module.exports = roleMineralHarvester;
}
