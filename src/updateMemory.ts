//每次占领新房间时会执行的模块。

function getNewSource() {
    Memory.sources={};
    for(let room in Game.rooms){
        if(Game.rooms[room].controller.my){
            let sources = Game.rooms[room].find(FIND_SOURCES);
            for(let source of sources){
                source.resetMemory();
            }
        }
    }
}

export = {
    getNewSource: getNewSource,
}