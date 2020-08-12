{
    var inf = {
        creepNum: function () {
            if (!Memory.creepNum) {
                console.log(JSON.stringify(Memory.stats.creep_num, null, 4));
            }
            else {
                console.log('no creep');
            }
        },
        containerEnergyNum: function (roomName) {
            var container = Game.rooms[roomName].find(FIND_STRUCTURES, {
                filter: function (i) { return i.structureType == (STRUCTURE_CONTAINER); }
            });
            var sum = 0;
            for (var i = 0; i < container.length; i++) {
                sum += container[i].store[RESOURCE_ENERGY];
            }
            return sum;
        },
        storageEnergyNum: function (roomName) {
            if (Game.rooms[roomName].storage) {
                var storage = Game.rooms[roomName].storage;
                var sum = 0;
                sum = storage.store[RESOURCE_ENERGY];
                return sum;
            }
        }
    };
    module.exports = inf;
}
