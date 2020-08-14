"use strict";
function examineTask() {
    for (var sourceName in Memory.sources) {
        var source = Game.getObjectById(Memory.sources[sourceName].id);
    }
}
module.exports = {
    examineTask: examineTask,
};
