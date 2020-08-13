// 将拓展签入 Source 原型
export function mountSourceEx() {
    _.assign(Source.prototype, sourceExtension);
}

// 自定义的 Source 的拓展
const sourceExtension = {
    // 自定义周围空格检测
    checkBlankSpace() {
        // 代码实现...
    },
    // 填充所有 spawn 和 extension
    fillSpawnEngry() {
        // 代码实现...
    },
    // 填充所有 tower
    fillTower() {
        // 代码实现...
    },
    // 其他更多自定义拓展
}