global.global.bpg = function (bodyparts) {
    var bodypartsList = [];
    if (!!global.GenedGetBodyparts && bodyparts == global.GenedGetBodyparts)
        return global.GenedBodypartsList;
    var list0 = ['move', 'work', 'carry', 'attack', 'ranged_attack', 'heal', 'claim', 'tough'];
    for (var i = 0, j = bodyparts.length; i < j; i++) {
        for (var key in bodyparts[i]) {
            for (var _i = 0, list0_1 = list0; _i < list0_1.length; _i++) {
                var name_1 = list0_1[_i];
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
