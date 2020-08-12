var tower_sp_m = {
    defend: function (roomName) {
        var hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            Game.notify("User " + username + " spotted in room " + roomName);
            var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
                filter: {
                    structureType: STRUCTURE_TOWER
                }
            });
            towers.forEach(function (tower) { return tower.attack(hostiles[0]); });
        }
    },
    getEnergy: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: function (structure) {
                return (structure.structureType == STRUCTURE_TOWER &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > creep.room.controller.level * 70);
            }
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
        }
    },
    repair: function (roomName, hits_min) {
        var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_TOWER
            }
        });
        var targets = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: function (object) { return (object.hits < object.hitsMax && object.hits < hits_min); }
        });
        targets.sort(function (a, b) { return a.hits - b.hits; });
        if (targets.length > 0) {
            towers.forEach(function (tower) { return tower.repair(targets[0]); });
        }
    }
};
module.exports = tower_sp_m;
