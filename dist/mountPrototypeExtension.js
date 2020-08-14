"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountPrototypeExtension = void 0;
var mount_RoomPoition_1 = require("./mount.RoomPoition");
var mount_Creep_1 = require("./mount.Creep");
var mount_Source_1 = require("./mount.Source");
function mountPrototypeExtension() {
    if (!global.prototypeMounted) {
        console.log('[mount] 重新挂载拓展');
        global.prototypeMounted = true;
        mount_RoomPoition_1.mountRoomPositionEx();
        mount_Creep_1.mountCreepEx();
        mount_Source_1.mountSourceEx();
    }
}
exports.mountPrototypeExtension = mountPrototypeExtension;
