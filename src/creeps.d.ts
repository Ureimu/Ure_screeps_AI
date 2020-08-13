/*
* 生成身体部件列表的简化输入类型，属性名代表部件名，属性值代表生成部件数量。
*/
type bpgGene = {
    [bodypartsName in BodyPartConstant]?: number;
};

declare namespace NodeJS {
    interface Global {
        log: any,
        bpg: Function,
        GenedGetBodyparts: Array<bpgGene>,
        GenedBodypartsList: BodyPartConstant[],
    }
}