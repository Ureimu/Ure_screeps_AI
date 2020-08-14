import {PriorityQueue} from './PriorityQueue'

/**
 * 将Memory中保存的队列转换为c++队列对象.
 *
 * @param {string} wantedTaskQueueName 队列名称
 * @returns {(PriorityQueue|undefined)} c++队列对象
 */
function getQueue(wantedTaskQueueName: string): PriorityQueue|undefined{
    for(let taskPoolName in Memory.taskPools){
        if(taskPoolName == wantedTaskQueueName){
            let taskQueue = new PriorityQueue(true);
            for(let task of Memory.taskPools[taskPoolName]){
                taskQueue.push(task);
            }
            return taskQueue;
        }
    }
    console.log('[error] 任务池中没有任务列表：'+wantedTaskQueueName);
}

/**
 * 将c++队列对象保存到Memory.
 *
 * @param {PriorityQueue} queue 要保存的队列
 * @param {string} TaskQueueName 队列名称
 */
function setQueue(queue: PriorityQueue, TaskQueueName: string): void{
    Memory.taskPools[TaskQueueName]=[];
    for(let i=0,j=queue.size();i<j;i++){
        Memory.taskPools[TaskQueueName].push(<{}><unknown>queue.pop());
    }
}

export = {
    /**
     * 将Memory中保存的队列转换为c++队列对象.
     *
     * @param {string} wantedTaskQueueName 队列名称
     * @returns {(PriorityQueue|undefined)} c++队列对象
     */
    getQueue: getQueue,

    /**
     * 将c++队列对象保存到Memory.
     *
     * @param {PriorityQueue} queue 要保存的队列
     * @param {string} TaskQueueName 队列名称
     */
    setQueue: setQueue,
}