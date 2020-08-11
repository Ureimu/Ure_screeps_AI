// memory extension samples
interface CreepMemory {
    role: string,
    spawnName: string,
    targetRoom?: string,
    missionNumber?: string,
    attacking?: {
        targets: string,
        flagToStay: string
    },
    carrying?: {
        carryFrom: Id<AnyStoreStructure>,
        carryTo: Id<AnyStoreStructure>,
        carryThings: ResourceConstant
    },
}
//下面是几个任务类的定义
interface attackerSetting {
    targets: string,
    flagToStay: string,
    spawnName: string,
    bodyparts: BodyPartConstant,
    targetRoom: string,
    ifRun: boolean,
    logString?: string
}

interface claimerSetting {
    doReserve: boolean,
    spawnName: string,
    bodyparts: BodyPartConstant,
    targetRoom: string,
    spawnNumber: number,
    ifRun: boolean,
    logString?: string
}

interface extraCarrierSetting {
    carryFrom: Id<AnyStoreStructure>,
    carryTo: Id<AnyStoreStructure>,
    carryThings: ResourceConstant,
    spawnName: string,
    bodyparts: BodyPartConstant,
    targetRoom: string,
    spawnNumber?: number,//还没有给所有角色更新该自定义参数
    ifRun: boolean,
    logString?: string
}

interface Memory {
    creepNum: number,
    reset_time_recorder: any,
    uuid: number,
    log: any,
    stats: {
        creep_num: {
            spawnName: {
                creepRole: {
                    creepNumber: number,
                }
            }
        },
        containerEnergyNum: {
            spawnName: number;
        }
    },
    c_k_info: {
        bodypartSetting: object[],
        creepRoleList: object[],
        creepSpawnNumberList: object[],
        energyAvailableList: number[],
        creepRoleListGivenOut: string[],
        creepRoleListGivenOutOutwards: string[]
    },
    creepWorkSetting: {
        attacker: attackerSetting[],
        claimer: claimerSetting[],
        extraCarrier: extraCarrierSetting[]
    },
    time_recorder: {
        spawnName: number;
    },
}


// `global` extension samples
declare namespace NodeJS {
    interface Global {
        log: any,
        bpg: Function,
        GenedGetBodyparts: object[],
        GenedBodypartsList: BodyPartConstant[]
    }
}