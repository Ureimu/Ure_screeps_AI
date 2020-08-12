{
    var roleUpgrader_1 = require('role.upgrader');
    var roleBuilder_1 = {
        run: function (creep) {
            if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
            }
            if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }
            var target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if (target) {
                creep.pickup(target);
            }
            if (creep.memory.building) {
                var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {
                            visualizePathStyle: {
                                stroke: '#ffffff'
                            }
                        });
                    }
                }
                else {
                    roleUpgrader_1.run(creep);
                }
            }
            else {
                var sources = creep.room.find(FIND_SOURCES);
                var container_e = creep.room.find(FIND_STRUCTURES, {
                    filter: function (i) { return i.structureType == STRUCTURE_CONTAINER &&
                        i.store[RESOURCE_ENERGY] > creep.store.getFreeCapacity(); }
                });
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: function (structure) {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                var targets1 = creep.room.find(FIND_STRUCTURES, {
                    filter: function (structure) {
                        return structure.structureType == STRUCTURE_CONTAINER &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                if (sources[1].energy > 0 && (targets.length || targets1.length)) {
                    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {
                            visualizePathStyle: {
                                stroke: '#ffaa00'
                            }
                        });
                    }
                }
                else if (sources[0].energy > 0) {
                    if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0], {
                            visualizePathStyle: {
                                stroke: '#ffaa00'
                            }
                        });
                    }
                }
                else {
                    var closest = creep.pos.findClosestByRange(container_e);
                    if (creep.withdraw(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closest, {
                            visualizePathStyle: {
                                stroke: '#ffaa00'
                            }
                        });
                    }
                }
            }
        }
    };
    module.exports = roleBuilder_1;
}
