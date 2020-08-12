var create_and_keep_screeps = require('c_k_screeps');
var stateScanner = require('stateScanner');
var tower_sp = require('tower');
var c_k_info = require('c_k_info');
var temporary = require('temporarySetting');
var link_sp = require('link');
var getMission = require('getMission');
var htmj = require('htmlwithjs');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRenovator = require('role.renovator');
var roleCarrier = require('role.carrier');
var roleEnergyMiner = require('role.energyMiner');
var roleExtraCarrier = require('role.extraCarrier');
var roleAttacker = require('role.attacker');
var roleOutwardsEnengyMiner = require('role.outwardsEnergyMiner');
var roleClaimer = require('role.claimer');
var roleUltraUpgrader = require('role.ultraUpgrader');
module.exports.loop = function () {
    c_k_info.run();
    link_sp.run();
    getMission.run();
    temporary.runMission();
    for (var name_1 in Memory.creeps) {
        if (!Game.creeps[name_1]) {
            if (Memory.creeps[name_1].spawnName) {
                Memory.stats.creep_num[Memory.creeps[name_1].spawnName][Memory.creeps[name_1].role] -= 1;
            }
            delete Memory.creeps[name_1];
            console.log('Clearing non-existing creep memory:', name_1);
        }
        if (Memory.creeps[name_1] && Object.keys(Memory.creeps[name_1]).length == 0 && Game.creeps[name_1].spawning == false) {
            if (Memory.creeps[name_1].spawnName) {
                Memory.stats.creep_num[Memory.creeps[name_1].spawnName][Memory.creeps[name_1].role] -= 1;
            }
            Game.creeps[name_1].suicide();
            console.log('Clearing non-existing memory of the creep:', name_1);
        }
    }
    function create_and_keep_screeps_list(nameList, numberList, bodyparts, spawnName) {
        for (var i = 0; i < nameList.length; i++) {
            create_and_keep_screeps.run(nameList[i], numberList[i], bodyparts[nameList[i]], spawnName);
        }
    }
    for (var spawnName in Game.spawns) {
        var spawn = Game.spawns[spawnName];
        if (!spawn.spawning) {
            for (var name_2 in Game.rooms) {
                if (spawn.room.name == name_2) {
                    for (var i = 0, j = Memory.c_k_info.energyAvailableList.length; i < j; i++) {
                        if (Game.rooms[name_2].energyAvailable >= Memory.c_k_info.energyAvailableList[i]) {
                            create_and_keep_screeps_list(Memory.c_k_info.creepRoleList[i], Memory.c_k_info.creepSpawnNumberList[i], Memory.c_k_info.bodypartSetting[i], spawnName);
                            break;
                        }
                    }
                }
            }
        }
    }
    var roleToRunList = [roleHarvester, roleUpgrader, roleBuilder, roleRenovator, roleCarrier, roleEnergyMiner];
    if (!Memory.c_k_info.creepRoleListGivenOut) {
        Memory.c_k_info.creepRoleListGivenOut = ['harvester', 'upgrader', 'builder', 'renovator', 'carrier', 'energyMiner'];
    }
    for (var name_3 in Game.creeps) {
        var creep = Game.creeps[name_3];
        for (var i = 0, j = Memory.c_k_info.creepRoleListGivenOut.length; i < j; i++) {
            if (creep.memory.role == Memory.c_k_info.creepRoleListGivenOut[i]) {
                roleToRunList[i].run(creep);
            }
        }
    }
    var roleToRunListOutwards = [roleExtraCarrier, roleAttacker, roleOutwardsEnengyMiner, roleClaimer, roleUltraUpgrader];
    if (!Memory.c_k_info.creepRoleListGivenOutOutwards) {
        Memory.c_k_info.creepRoleListGivenOutOutwards = ['extraCarrier', 'attacker', 'outwardsEnergyMiner', 'claimer', 'ultraUpgrader'];
    }
    temporary.workSetting();
    for (var name_4 in Game.creeps) {
        var creep = Game.creeps[name_4];
        for (var i = 0, j = Memory.c_k_info.creepRoleListGivenOutOutwards.length; i < j; i++) {
            for (var m = 0, n = Memory.creepWorkSetting[Memory.c_k_info.creepRoleListGivenOutOutwards[i]].length; m < n; m++) {
                if (creep.memory.role == Memory.c_k_info.creepRoleListGivenOutOutwards[i]) {
                    temporary.run(creep);
                    roleToRunListOutwards[i].run(creep);
                }
            }
        }
    }
    for (var i = 0, j = Memory.c_k_info.creepRoleListGivenOutOutwards.length; i < j; i++) {
        for (var m = 0, n = Memory.creepWorkSetting[Memory.c_k_info.creepRoleListGivenOutOutwards[i]].length; m < n; m++) {
            roleToRunListOutwards[i].keep(m);
        }
    }
    stateScanner.run();
    for (var roomName in Game.rooms) {
        var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
            filter: {
                structureType: STRUCTURE_TOWER
            }
        });
        if (towers) {
            tower_sp.defend(Game.rooms[roomName].name);
            roomName = Game.rooms[roomName].name;
            tower_sp.repair(roomName, 3000);
        }
    }
};
