"use strict";
var PriorityQueue_1 = require("./PriorityQueue");
function getQueue(wantedTaskQueueName) {
    for (var taskPoolName in Memory.taskPools) {
        if (taskPoolName == wantedTaskQueueName) {
            var taskQueue = new PriorityQueue_1.PriorityQueue(true);
            for (var _i = 0, _a = Memory.taskPools[taskPoolName]; _i < _a.length; _i++) {
                var task = _a[_i];
                taskQueue.push(task);
            }
            return taskQueue;
        }
    }
    console.log('[error] 任务池中没有任务列表：' + wantedTaskQueueName);
}
function setQueue(queue, TaskQueueName) {
    Memory.taskPools[TaskQueueName] = [];
    for (var i = 0, j = queue.size(); i < j; i++) {
        Memory.taskPools[TaskQueueName].push(queue.pop());
    }
}
module.exports = {
    getQueue: getQueue,
    setQueue: setQueue,
};
