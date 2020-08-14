"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mountRoomPositionEx = void 0;
function mountRoomPositionEx() {
    _.assign(RoomPosition.prototype, RoomPositionExtension);
}
exports.mountRoomPositionEx = mountRoomPositionEx;
var RoomPositionExtension = {
    getSquare: function () {
        var squareList = [];
        var squarePos = [0, 1, 1, 1, 1, 0, 1, -1, 0, -1, -1, -1, -1, 0, -1, 1];
        for (var i = 0; i < 16; i += 2) {
            squareList.push(new RoomPosition(this.x + squarePos[i], this.y + squarePos[i + 1], this.roomName));
        }
        return squareList;
    },
    fillSpawnEngry: function () {
    },
    fillTower: function () {
    },
};
