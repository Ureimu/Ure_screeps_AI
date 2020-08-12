{
    var roleExtraCarrier_1 = require('role.extraCarrier');
    var roleAttacker_1 = require('role.attacker');
    var roleOutwardsEnengyMiner_1 = require('role.outwardsEnergyMiner');
    var roleClaimer_1 = require('role.claimer');
    var roleUltraUpgrader_1 = require('role.ultraUpgrader');
    var temporary_1 = {
        run: function (creep) {
            function ifName(name) {
                if (creep.memory.role == name) {
                    return true;
                }
                else {
                    return false;
                }
            }
            var roleToRunListOutwards = [roleExtraCarrier_1, roleAttacker_1, roleOutwardsEnengyMiner_1, roleClaimer_1, roleUltraUpgrader_1];
            var roleList = Memory.c_k_info.creepRoleListGivenOutOutwards;
            for (var i = 0, j = Memory.creepWorkSetting[roleList[0]].length; i < j; i++) {
                if (ifName(roleList[0]) && creep.memory.missionNumber == i) {
                    roleToRunListOutwards[0].creepMemory(creep, Memory.creepWorkSetting[roleList[0]][i].carryFrom, Memory.creepWorkSetting[roleList[0]][i].carryTo, Memory.creepWorkSetting[roleList[0]][i].carryThings);
                    if (i == 5 && Memory.creepWorkSetting[roleList[0]][i].ifRun == false) {
                        creep.suicide();
                    }
                }
            }
            for (var i = 0, j = Memory.creepWorkSetting[roleList[1]].length; i < j; i++) {
                if (ifName(roleList[1]) && creep.memory.missionNumber == i) {
                    roleToRunListOutwards[1].creepMemory(creep, Memory.creepWorkSetting[roleList[1]][i].targets, Memory.creepWorkSetting[roleList[1]][i].flagToStay);
                }
            }
            for (var i = 0, j = Memory.creepWorkSetting[roleList[2]].length; i < j; i++) {
                if (ifName(roleList[2]) && creep.memory.missionNumber == i) {
                    roleToRunListOutwards[2].creepMemory(creep, Memory.creepWorkSetting[roleList[2]][i].targetSourceFlag, Memory.creepWorkSetting[roleList[2]][i].targetContainerFlag);
                }
            }
            for (var i = 0, j = Memory.creepWorkSetting[roleList[3]].length; i < j; i++) {
                if (ifName([roleList[3]]) && creep.memory.missionNumber == i) {
                    roleToRunListOutwards[3].creepMemory(creep, Memory.creepWorkSetting[roleList[3]][i].doReserve);
                }
            }
            for (var i = 0, j = Memory.creepWorkSetting[roleList[4]].length; i < j; i++) {
                if (ifName([roleList[4]]) && creep.memory.missionNumber == i) {
                    roleToRunListOutwards[4].creepMemory(creep, Memory.creepWorkSetting[roleList[4]][i].targetSourceFlag, Memory.creepWorkSetting[roleList[4]][i].targetLabFlag);
                }
            }
        },
        workSetting: function () {
            if (!Memory.creepWorkSetting) {
                Memory.creepWorkSetting = {};
            }
            for (var i = 0, j = Memory.c_k_info.creepRoleListGivenOutOutwards.length; i < j; i++) {
                if (!Memory.creepWorkSetting[Memory.c_k_info.creepRoleListGivenOutOutwards[i]]) {
                    Memory.creepWorkSetting[Memory.c_k_info.creepRoleListGivenOutOutwards[i]] = [];
                }
            }
            if (Memory.creepWorkSetting.refresh) {
                roleExtraCarrier_1.workSetting(0, '5f08f47f8630484e3f42ca44', '5eff14ec7109c31f7bef9000', 'energy', 'Spawn2', (global.bpg([{ 'carry': 8, 'move': 8 }])), 'E34S21');
                roleExtraCarrier_1.workSettingLog(0, '第一次创建的任务，可以先看看。\n该任务是将E35S21的storage能量搬运到E34S21的storage。');
                roleExtraCarrier_1.workSetting(1, '5f09c71ff1837985d4e0693f', '5eff14ec7109c31f7bef9000', 'energy', 'Spawn1', (global.bpg([{ 'carry': 8, 'move': 1 }])), 'E34S21');
                roleExtraCarrier_1.workSettingLog(1, '将link的能量输送到容器');
                roleExtraCarrier_1.workSetting(2, '5f0cd6ac716e443522c6d8af', '5f0d6c22dbdda427e473bbf9', 'XGH2O', 'Spawn1', (global.bpg([{ 'carry': 4, 'move': 4 }])), 'E34S21');
                roleExtraCarrier_1.workSettingLog(2, '将XGH2O从终端输送到LAB');
                roleExtraCarrier_1.workSetting(3, '5eff14ec7109c31f7bef9000', '5f09c71ff1837985d4e0693f', 'energy', 'Spawn1', (global.bpg([{ 'carry': 16, 'move': 1 }])), 'E34S21');
                roleExtraCarrier_1.workSettingLog(3, '将能量从大容器输送到Link');
                roleExtraCarrier_1.workSetting(4, '5eff14ec7109c31f7bef9000', '5f0d6c22dbdda427e473bbf9', 'energy', 'Spawn1', (global.bpg([{ 'carry': 16, 'move': 1 }])), 'E34S21');
                roleExtraCarrier_1.workSettingLog(4, '将能量从大容器输送到Lab');
                roleExtraCarrier_1.workSetting(5, '5f0cd6ac716e443522c6d8af', '5eff14ec7109c31f7bef9000', 'energy', 'Spawn1', (global.bpg([{ 'carry': 16, 'move': 16 }])), 'E34S21');
                roleExtraCarrier_1.workSettingLog(5, '将能量从终端输送到大容器');
                roleExtraCarrier_1.workSetting(6, '5f08f47f8630484e3f42ca44', '5f1beed97f30cdfc7919dcd2', 'energy', 'Spawn2', (global.bpg([{ 'carry': 9, 'move': 1 }])), 'E35S21');
                roleExtraCarrier_1.workSettingLog(6, 'E35S21升级任务\n将能量从大容器输送到终端');
                roleAttacker_1.workSetting(0, '(creep.room.find(FIND_STRUCTURES,\
                {filter: (i) => {\
                return i.structureType == STRUCTURE_WALL }}))', 'E33S21Defender', 'Spawn1', [MOVE, ATTACK], 'E33S21');
                roleAttacker_1.workSettingLog(0, '这个任务是用来清除其他图的城墙的,rcl>0');
                roleAttacker_1.workSetting(1, '(creep.room.find(FIND_HOSTILE_CREEPS))', 'E34S21Defender', 'Spawn1', global.bpg([{ 'tough': 25 }, { 'move': 15, 'attack': 5 }]), 'E34S21');
                roleAttacker_1.workSettingLog(1, '这个任务是用来进行防御的,rcl>=4');
                roleAttacker_1.workSetting(2, '(creep.room.find(FIND_HOSTILE_CREEPS))', 'E33S21Defender', 'Spawn1', global.bpg([{ 'tough': 25 }, { 'move': 15, 'attack': 5 }]), 'E33S21');
                roleAttacker_1.workSettingLog(2, '这个任务是用来进行防御的,rcl>=4');
                roleAttacker_1.workSetting(3, '(creep.room.find(FIND_HOSTILE_CREEPS))', 'E31S18Defender', 'Spawn3', global.bpg([{ 'tough': 6 }, { 'move': 9, 'attack': 3 }]), 'E31S18');
                roleAttacker_1.workSettingLog(3, 'E31S18,这个任务是用来进行防御的,rcl>=4');
                roleOutwardsEnengyMiner_1.workSetting(0, 'E33S21Source0', 'E34S21Link0', 'Spawn4', (global.bpg([{ 'work': 15, 'move': 15, 'carry': 15 }])), 'E33S21', 1);
                roleOutwardsEnengyMiner_1.workSettingLog(0, '采集外矿运输到指定建筑的任务');
                roleClaimer_1.workSetting(0, true, 'Spawn4', (global.bpg([{ 'claim': 2, 'move': 4 }])), 'E33S21', 1);
                roleClaimer_1.workSettingLog(0, '做预定任务');
                roleClaimer_1.workSetting(1, false, 'Spawn1', (global.bpg([{ 'move': 5, 'claim': 1 }])), 'E31S18', 1);
                roleClaimer_1.workSettingLog(1, '占领E31S18');
                roleClaimer_1.workSetting(2, false, 'Spawn4', (global.bpg([{ 'move': 20, 'work': 10, 'carry': 20 }])), 'E31S18', 2);
                roleClaimer_1.workSettingLog(2, '援建E31S18');
                roleUltraUpgrader_1.workSetting(0, 'E34S21Link1', 'E34S21Lab0', 'Spawn1', (global.bpg([{ 'work': 15, 'move': 8, 'carry': 8 }])), 'E34S21', 1);
                roleUltraUpgrader_1.workSettingLog(0, '做快速升级任务');
                Memory.creepWorkSetting.refresh = false;
            }
        },
        runMission: function () {
            var mis = Memory.creepWorkSetting;
            var hostiles = {
                'E34S21': Game.rooms['E34S21'].find(FIND_HOSTILE_CREEPS),
                'E31S18': Game.rooms['E31S18'].find(FIND_HOSTILE_CREEPS)
            };
            for (var roomName in hostiles) {
                for (var i = 0, j = mis.attacker.length; i < j; i++) {
                    if (hostiles[roomName].length > 0 && mis.attacker[i].targetRoom == roomName && mis.attacker[1].ifRun == false) {
                        mis.attacker[1].ifRun = true;
                    }
                    else if (hostiles[roomName].length == 0 && mis.attacker[i].targetRoom == roomName && mis.attacker[1].ifRun == true) {
                        mis.attacker[1].ifRun = false;
                    }
                }
            }
            if (mis.ultraUpgrader[0].ifRun == true) {
                var usingLab = Game.getObjectById('5f0d6c22dbdda427e473bbf9');
                var terminal = Game.getObjectById('5f0cd6ac716e443522c6d8af');
                if (usingLab.store[RESOURCE_ENERGY] < 300 && mis.extraCarrier[4].ifRun == false) {
                    mis.extraCarrier[4].ifRun = true;
                }
                else if (usingLab.store[RESOURCE_ENERGY] == 2000 && mis.extraCarrier[4].ifRun == true) {
                    mis.extraCarrier[4].ifRun = false;
                }
                if (usingLab.store['XGH2O'] < 450 && mis.extraCarrier[2].ifRun == false) {
                    mis.extraCarrier[2].ifRun = true;
                }
                else if (usingLab.store['XGH2O'] == 3000 && mis.extraCarrier[2].ifRun == true) {
                    mis.extraCarrier[2].ifRun = false;
                }
                if (usingLab.store['XGH2O'] < 450 && terminal.store['XGH2O'] < 450) {
                    mis.ultraUpgrader[0].ifRun = false;
                }
            }
            if (mis.extraCarrier[5].ifRun == true) {
                var terminal = Game.getObjectById('5f0cd6ac716e443522c6d8af');
                if (terminal.store[RESOURCE_ENERGY] < 15000) {
                    mis.extraCarrier[5].ifRun = false;
                }
            }
        }
    };
    module.exports = temporary_1;
}
