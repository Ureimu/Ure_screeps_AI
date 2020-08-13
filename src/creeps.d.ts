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