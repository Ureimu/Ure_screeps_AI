"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountPrototypeExtension = void 0;
var mount_creep_1 = require("./mount.creep");
function mountPrototypeExtension() {
    if (!global.prototypeMounted) {
        console.log('[mount] 重新挂载拓展');
        global.prototypeMounted = true;
        mount_creep_1.mountCreepEx();
    }
}
exports.mountPrototypeExtension = mountPrototypeExtension;
