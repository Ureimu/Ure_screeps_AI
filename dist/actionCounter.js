"use strict";
var warpGetUsed = false;
var totalCPU = 0;
var actionsTime = {};
var historyTotalCPU = {};
var historyForcedCPU = {};
var functionsToWarp = [
    { name: 'Game.notify', parent: Game, val: Game.notify },
    { name: 'Market.cancelOrder', parent: Game.market, val: Game.market.cancelOrder },
    { name: 'Market.changeOrderPrice', parent: Game.market, val: Game.market.changeOrderPrice },
    { name: 'Market.createOrder', parent: Game.market, val: Game.market.createOrder },
    { name: 'Market.deal', parent: Game.market, val: Game.market.deal },
    { name: 'Market.extendOrder', parent: Game.market, val: Game.market.extendOrder },
    { name: 'ConstructionSite.remove', parent: ConstructionSite.prototype, val: ConstructionSite.prototype.remove },
    { name: 'Creep.attack', parent: Creep.prototype, val: Creep.prototype.attack },
    { name: 'Creep.attackController', parent: Creep.prototype, val: Creep.prototype.attackController },
    { name: 'Creep.build', parent: Creep.prototype, val: Creep.prototype.build },
    { name: 'Creep.claimController', parent: Creep.prototype, val: Creep.prototype.claimController },
    { name: 'Creep.dismantle', parent: Creep.prototype, val: Creep.prototype.dismantle },
    { name: 'Creep.drop', parent: Creep.prototype, val: Creep.prototype.drop },
    { name: 'Creep.generateSafeMode', parent: Creep.prototype, val: Creep.prototype.generateSafeMode },
    { name: 'Creep.harvest', parent: Creep.prototype, val: Creep.prototype.harvest },
    { name: 'Creep.heal', parent: Creep.prototype, val: Creep.prototype.heal },
    { name: 'Creep.move', parent: Creep.prototype, val: Creep.prototype.move },
    { name: 'Creep.notifyWhenAttacked', parent: Creep.prototype, val: Creep.prototype.notifyWhenAttacked },
    { name: 'Creep.pickup', parent: Creep.prototype, val: Creep.prototype.pickup },
    { name: 'Creep.rangedAttack', parent: Creep.prototype, val: Creep.prototype.rangedAttack },
    { name: 'Creep.rangedHeal', parent: Creep.prototype, val: Creep.prototype.rangedHeal },
    { name: 'Creep.rangedMassAttack', parent: Creep.prototype, val: Creep.prototype.rangedMassAttack },
    { name: 'Creep.repair', parent: Creep.prototype, val: Creep.prototype.repair },
    { name: 'Creep.reserveController', parent: Creep.prototype, val: Creep.prototype.reserveController },
    { name: 'Creep.signController', parent: Creep.prototype, val: Creep.prototype.signController },
    { name: 'Creep.suicide', parent: Creep.prototype, val: Creep.prototype.suicide },
    { name: 'Creep.transfer', parent: Creep.prototype, val: Creep.prototype.transfer },
    { name: 'Creep.upgradeController', parent: Creep.prototype, val: Creep.prototype.upgradeController },
    { name: 'Creep.withdraw', parent: Creep.prototype, val: Creep.prototype.withdraw },
    { name: 'Flag.remove', parent: Flag.prototype, val: Flag.prototype.remove },
    { name: 'Flag.setColor', parent: Flag.prototype, val: Flag.prototype.setColor },
    { name: 'Flag.setPosition', parent: Flag.prototype, val: Flag.prototype.setPosition },
    { name: 'PowerCreep.delete', parent: PowerCreep.prototype, val: PowerCreep.prototype.delete },
    { name: 'PowerCreep.drop', parent: PowerCreep.prototype, val: PowerCreep.prototype.drop },
    { name: 'PowerCreep.enableRoom', parent: PowerCreep.prototype, val: PowerCreep.prototype.enableRoom },
    { name: 'PowerCreep.move', parent: PowerCreep.prototype, val: PowerCreep.prototype.move },
    { name: 'PowerCreep.notifyWhenAttacked', parent: PowerCreep.prototype, val: PowerCreep.prototype.notifyWhenAttacked },
    { name: 'PowerCreep.pickup', parent: PowerCreep.prototype, val: PowerCreep.prototype.pickup },
    { name: 'PowerCreep.renew', parent: PowerCreep.prototype, val: PowerCreep.prototype.renew },
    { name: 'PowerCreep.spawn', parent: PowerCreep.prototype, val: PowerCreep.prototype.spawn },
    { name: 'PowerCreep.suicide', parent: PowerCreep.prototype, val: PowerCreep.prototype.suicide },
    { name: 'PowerCreep.transfer', parent: PowerCreep.prototype, val: PowerCreep.prototype.transfer },
    { name: 'PowerCreep.upgrade', parent: PowerCreep.prototype, val: PowerCreep.prototype.upgrade },
    { name: 'PowerCreep.usePower', parent: PowerCreep.prototype, val: PowerCreep.prototype.usePower },
    { name: 'PowerCreep.withdraw', parent: PowerCreep.prototype, val: PowerCreep.prototype.withdraw },
    { name: 'Room.createConstructionSite', parent: Room.prototype, val: Room.prototype.createConstructionSite },
    { name: 'Room.createFlag', parent: Room.prototype, val: Room.prototype.createFlag },
    { name: 'Structure.destroy', parent: Structure.prototype, val: Structure.prototype.destroy },
    { name: 'Structure.notifyWhenAttacked', parent: Structure.prototype, val: Structure.prototype.notifyWhenAttacked },
    { name: 'StructureController.activateSafeMode', parent: StructureController.prototype, val: StructureController.prototype.activateSafeMode },
    { name: 'StructureController.unclaim', parent: StructureController.prototype, val: StructureController.prototype.unclaim },
    { name: 'StructureFactory.produce', parent: StructureFactory.prototype, val: StructureFactory.prototype.produce },
    { name: 'StructureLab.boostCreep', parent: StructureLab.prototype, val: StructureLab.prototype.boostCreep },
    { name: 'StructureLab.runReaction', parent: StructureLab.prototype, val: StructureLab.prototype.runReaction },
    { name: 'StructureLab.unboostCreep', parent: StructureLab.prototype, val: StructureLab.prototype.unboostCreep },
    { name: 'StructureLink.transferEnergy', parent: StructureLink.prototype, val: StructureLink.prototype.transferEnergy },
    { name: 'StructureNuker.launchNuke', parent: StructureNuker.prototype, val: StructureNuker.prototype.launchNuke },
    { name: 'StructureObserver.observeRoom', parent: StructureObserver.prototype, val: StructureObserver.prototype.observeRoom },
    { name: 'StructurePowerSpawn.processPower', parent: StructurePowerSpawn.prototype, val: StructurePowerSpawn.prototype.processPower },
    { name: 'StructureRampart.setPublic', parent: StructureRampart.prototype, val: StructureRampart.prototype.setPublic },
    { name: 'StructureSpawn.spawnCreep', parent: StructureSpawn.prototype, val: StructureSpawn.prototype.spawnCreep },
    { name: 'StructureSpawn.recycleCreep', parent: StructureSpawn.prototype, val: StructureSpawn.prototype.recycleCreep },
    { name: 'StructureSpawn.renewCreep', parent: StructureSpawn.prototype, val: StructureSpawn.prototype.renewCreep },
    { name: 'Spawning.cancel', parent: StructureSpawn.Spawning.prototype, val: StructureSpawn.Spawning.prototype.cancel },
    { name: 'Spawning.setDirections', parent: StructureSpawn.Spawning.prototype, val: StructureSpawn.Spawning.prototype.setDirections },
    { name: 'StructureTerminal.send', parent: StructureTerminal.prototype, val: StructureTerminal.prototype.send },
    { name: 'StructureTower.attack', parent: StructureTower.prototype, val: StructureTower.prototype.attack },
    { name: 'StructureTower.heal', parent: StructureTower.prototype, val: StructureTower.prototype.heal },
    { name: 'StructureTower.repair', parent: StructureTower.prototype, val: StructureTower.prototype.repair },
];
function warpActions() {
    functionsToWarp.forEach(function (_a) {
        var name = _a.name, parent = _a.parent, val = _a.val;
        return warpAction(name, parent, val);
    });
}
function warpAction(name, parent, action) {
    var actionName = name.split('.').pop();
    function warppedAction() {
        var start = warpGetUsed ? Game.cpu._getUsed() : Game.cpu.getUsed();
        var code = action.apply(this, arguments);
        var end = warpGetUsed ? Game.cpu._getUsed() : Game.cpu.getUsed();
        if (code === OK && end - start > 0.1) {
            if (!actionsTime[name]) {
                actionsTime[name] = { calls: 0, CPU: 0 };
            }
            actionsTime[name].calls++;
            actionsTime[name].CPU += end - start;
            totalCPU += end - start;
        }
        return code;
    }
    parent['_' + actionName] = action;
    parent[actionName] = warppedAction;
}
function init(warpGetUsedCPU) {
    if (warpGetUsedCPU === void 0) { warpGetUsedCPU = false; }
    warpGetUsed = warpGetUsedCPU;
    actionsTime = {};
    totalCPU = 0;
    function warppedFunction() {
        return Game.cpu._getUsed() - totalCPU;
    }
    if (warpGetUsed && !Game.cpu._getUsed) {
        Game.cpu._getUsed = Game.cpu.getUsed;
        Game.cpu.getUsed = warppedFunction;
    }
    Game.actionCounter = { singleTick: singleTick, ratio: ratio };
}
function singleTick() {
    var cpu = warpGetUsed ? Game.cpu._getUsed() : Game.cpu.getUsed();
    var totalCalls = _.sum(actionsTime, function (obj) { return obj.calls; });
    var totalCPU = _.sum(actionsTime, function (obj) { return obj.CPU; });
    var header = 'calls\t\ttime\t\tavg\t\taction';
    var footer = [
        "Avg: " + (totalCPU / totalCalls).toFixed(2),
        "TotalCPU: " + totalCPU.toFixed(2),
        "TotalAction: " + totalCalls,
        "Ratio: " + (totalCPU / cpu).toFixed(2) + "%"
    ].join('\t');
    var lines = [header];
    var allLines = Object.keys(actionsTime).map(function (actionName) {
        var action = actionsTime[actionName];
        return {
            name: actionName,
            calls: action.calls,
            totalCPU: action.CPU,
            avg: action.CPU / action.calls,
        };
    }).sort(function (val1, val2) { return val2.totalCPU - val1.totalCPU; })
        .map(function (data) { return [
        data.calls, data.totalCPU.toFixed(2),
        data.avg.toFixed(2),
        data.name
    ].join('\t\t'); });
    for (var _i = 0, allLines_1 = allLines; _i < allLines_1.length; _i++) {
        var line = allLines_1[_i];
        lines.push(line);
    }
    lines.push(footer);
    return lines.join('\n');
}
function getData() {
    return {
        actionsTime: actionsTime,
        totalCalls: _.sum(actionsTime, function (obj) { return obj.calls; }),
        totalCPU: totalCPU,
    };
}
function save(length) {
    var cpu_used = warpGetUsed ? Game.cpu._getUsed() : Game.cpu.getUsed();
    var index = Game.time % length;
    historyTotalCPU[index] = cpu_used;
    historyForcedCPU[index] = totalCPU;
}
function ratio() {
    var total_sum = 0;
    var forced_sum = 0;
    var length = 0;
    for (var i in historyTotalCPU) {
        total_sum += historyTotalCPU[i];
        forced_sum += historyForcedCPU[i];
        length += 1;
    }
    return "\u23F2\uFE0F \u524D " + length + "tick \u5E73\u5747cpu:" + (total_sum / length).toFixed(3) + ", \u5E73\u5747\u5F3A\u5236cpu:" + (forced_sum / length).toFixed(3) + ", \u6BD4\u4F8B:" + (forced_sum / total_sum).toFixed(3);
}
module.exports = {
    warpActions: warpActions,
    init: init,
    singleTick: singleTick,
    getData: getData,
    save: save,
    ratio: ratio
};
