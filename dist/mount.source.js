"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountSourceEx = void 0;
function mountSourceEx() {
    _.assign(Source.prototype, SourceExtension);
}
exports.mountSourceEx = mountSourceEx;
var SourceExtension = {
    checkBlankSpace: function () {
        var square = this.pos.getSquare();
        var BlankSpace = 0;
        for (var _i = 0, square_1 = square; _i < square_1.length; _i++) {
            var squared = square_1[_i];
            var look = squared.look();
            look.forEach(function (lookObject) {
                if (lookObject.type == 'terrain' &&
                    lookObject['terrian'] != 'wall') {
                    BlankSpace++;
                }
            });
        }
        return BlankSpace;
    },
    sourceName: this.room.name + 'Source' + '[' + this.pos.x + ',' + this.pos.y + ']',
    resetMemory: function () {
        Memory.sources[this.sourceName] = {
            id: this.id,
            blankSpace: this.checkBlankSpace(),
        };
    },
    memory: Memory.sources[this.sourceName],
    harvestTask: function () {
    }
};
