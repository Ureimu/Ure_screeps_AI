"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalFunctionRegister = void 0;
function globalFunctionRegister() {
    if (!global.bpg) {
        global.bpg = function (bodyparts) {
            var bodypartsList = [];
            if (!!global.GenedGetBodyparts && bodyparts == global.GenedGetBodyparts)
                return global.GenedBodypartsList;
            for (var i = 0, j = bodyparts.length; i < j; i++) {
                for (var key in bodyparts[i]) {
                    for (var _i = 0, BODYPARTS_ALL_1 = BODYPARTS_ALL; _i < BODYPARTS_ALL_1.length; _i++) {
                        var name_1 = BODYPARTS_ALL_1[_i];
                        if (key == name_1) {
                            for (var i1 = 0, j1 = bodyparts[i][key]; i1 < j1; i1++) {
                                bodypartsList.push(name_1);
                            }
                        }
                    }
                }
            }
            global.GenedGetBodyparts = bodyparts;
            global.GenedBodypartsList = bodypartsList;
            return bodypartsList;
        };
        console.log('[global] 重新挂载全局函数');
    }
    else {
        return;
    }
}
exports.globalFunctionRegister = globalFunctionRegister;
