{
    var stateScanner_1 = {
        run: function () {
            if (Game.time % 20)
                return;
            var inf = require('inf');
            if (!Memory.stats)
                Memory.stats = {};
            if (!Memory.stats.rcl)
                Memory.stats.rcl = {};
            if (!Memory.stats.rclLevel)
                Memory.stats.rclLevel = {};
            if (!Memory.stats.containerEnergyNum)
                Memory.stats.containerEnergyNum = {};
            if (!Memory.stats.storageEnergyNum)
                Memory.stats.storageEnergyNum = {};
            if (!Memory.stats.missionRunning)
                Memory.stats.missionRunning = {};
            Memory.stats.gcl = (Game.gcl.progress / Game.gcl.progressTotal) * 100;
            Memory.stats.gclLevel = Game.gcl.level;
            Memory.stats.gpl = (Game.gpl.progress / Game.gpl.progressTotal) * 100;
            Memory.stats.gplLevel = Game.gpl.level;
            Memory.stats.cpu = Game.cpu.getUsed();
            Memory.stats.lastBucket = Memory.stats.bucket;
            Memory.stats.bucket = Game.cpu.bucket;
            Memory.stats.cpuAverageUsed = Memory.stats.hasGeneratePixel ? (Game.cpu.limit - (Memory.stats.bucket - Memory.stats.lastBucket + 5000) / 20) : (Game.cpu.limit - (Memory.stats.bucket - Memory.stats.lastBucket) / 20);
            Memory.stats.pixels = Game.resources['pixel'];
            for (var _i = 0, _a = Object.keys(Memory.creepWorkSetting); _i < _a.length; _i++) {
                var name_1 = _a[_i];
                Memory.stats.missionRunning[name_1] = [];
                for (var i = 0, j = Memory.creepWorkSetting[name_1].length; i < j; i++) {
                    var rx = Memory.creepWorkSetting[name_1][i];
                    Memory.stats.missionRunning[name_1][i] = {};
                    Memory.stats.missionRunning[name_1][i].ifRun = rx.ifRun;
                    Memory.stats.missionRunning[name_1][i].logString = rx.logString;
                }
            }
            for (var name_2 in Game.rooms) {
                if (Game.rooms[name_2] && Game.rooms[name_2].controller && Game.rooms[name_2].controller.my) {
                    Memory.stats.rcl[name_2] = (Game.rooms[name_2].controller.progress / Game.rooms[name_2].controller.progressTotal) * 100;
                    Memory.stats.rclLevel[name_2] = Game.rooms[name_2].controller.level;
                }
                if (Game.rooms[name_2]) {
                    Memory.stats.containerEnergyNum[name_2] = inf.containerEnergyNum(name_2);
                    Memory.stats.storageEnergyNum[name_2] = inf.storageEnergyNum(name_2);
                }
            }
            if (Game.cpu.bucket > 9000) {
                Game.cpu.generatePixel();
                Memory.stats.hasGeneratePixel = true;
            }
            else {
                Memory.stats.hasGeneratePixel = false;
            }
        },
    };
    module.exports = stateScanner_1;
}
