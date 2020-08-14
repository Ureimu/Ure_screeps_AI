/** 
* 生成身体部件列表的简化输入类型，属性名代表部件名，属性值代表生成部件数量。
*/
type bpgGene = {
    [bodypartsName in BodyPartConstant]?: number;
};

declare namespace NodeJS {
    interface Global {
        log: any,
        detail: ()=>void,
        bpg: (arg0: Array<bpgGene>)=>BodyPartConstant[],
        GenedGetBodyparts: Array<bpgGene>,
        GenedBodypartsList: BodyPartConstant[],
        prototypeMounted: boolean,
    }
}

interface SourceMemory {
    id: Id<Source>,
    blankSpace: number,
}

interface Source {
    /**
     * 返回周围正方形区域的不是wall的地形数量
     *
     * @returns {number} 非wall的空格个数
     */
    checkBlankSpace(): number,

    /**
     * source的名称.
     *
     * @type {string}
     * @memberof Source
     */
    sourceName: string,

    /**
     * 重置source的memory.
     *
     * @memberof Source
     */
    resetMemory(): void,

    /**
     * source的一个访问对应memory的捷径。
     *
     * @type {{[name: string]: SourceMemory}}
     * @memberof Source
     */
    memory: {[name: string]: SourceMemory},
}

interface Memory {
    sources: {[name: string]: SourceMemory},
    changebool: {
        newSource: boolean
    }
    taskPools: {[name: string]: Array<{}>}
}