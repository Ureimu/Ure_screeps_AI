"use strict";
function getNewSource() {
    Memory.sources = {};
    for (var room in Game.rooms) {
        if (Game.rooms[room].controller.my) {
            var sources = Game.rooms[room].find(FIND_SOURCES);
            for (var _i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
                var source = sources_1[_i];
                source.resetMemory();
            }
        }
    }
}
module.exports = {
    getNewSource: getNewSource,
};
