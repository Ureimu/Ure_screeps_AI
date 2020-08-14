// 将拓展签入 Source 原型
export function mountSourceEx() {
    _.assign(Source.prototype, SourceExtension);
}
// 自定义的 Source 的拓展
const SourceExtension = {
    /**
     * 返回周围正方形的不是wall的地形数量
     *
     * @returns {number} 非wall的空格个数
     */
    checkBlankSpace(): number {
        let square:RoomPosition[] = this.pos.getSquare();
        let BlankSpace: number = 0;
        for (const squared of square) {
            const look = squared.look();
            look.forEach(function(lookObject) {
                if(lookObject.type == 'terrain' &&
                lookObject['terrian'] != 'wall') {
                    BlankSpace++;
                }
            });
        }
        return BlankSpace;
    },
    sourceName: this.room.name+'Source'+'['+this.pos.x+','+this.pos.y+']',
    resetMemory(): void {
        Memory.sources[this.sourceName]={
            id : this.id,
            blankSpace : this.checkBlankSpace(),
        };
    },
    memory: Memory.sources[this.sourceName],
    harvestTask(): void {
        
    }
}