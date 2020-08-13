"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
var binary = require('priority_queue');
var wasmModule = new WebAssembly.Module(binary);
var BaseQueue = (function () {
    function BaseQueue() {
    }
    BaseQueue.prototype.size = function () {
        return this.instance.size();
    };
    BaseQueue.prototype.clear = function () {
        this.instance.clear();
    };
    BaseQueue.prototype.isEmpty = function () {
        return this.instance.is_empty();
    };
    return BaseQueue;
}());
var PriorityQueue = (function (_super) {
    __extends(PriorityQueue, _super);
    function PriorityQueue(isMinRoot) {
        var _this = _super.call(this) || this;
        var instance;
        var cache = [];
        var imports = {
            env: {
                emscripten_notify_memory_growth: function () {
                }
            },
            wasi_snapshot_preview1: {
                proc_exit: function () { }
            }
        };
        instance = new WebAssembly.Instance(wasmModule, imports).exports;
        instance.init(+!!isMinRoot);
        _this.push = function (node) {
            try {
                instance.push(+node.priority, cache.length);
                cache.push(node);
            }
            catch (e) {
                if (e instanceof TypeError) {
                    throw e;
                }
                else {
                    throw Error("priorityQueue is full.\n\t Current size is " + instance.size() + ", buffer length is " + instance.memory.buffer.byteLength * 2 / 1024 + "KB.");
                }
            }
        };
        _this.pop = function () {
            if (instance.size() > 0) {
                var pointer = instance.top();
                var id = instance.get_identifier(pointer);
                var node = cache[id];
                instance.pop();
                cache[id] = undefined;
                return node;
            }
            else {
                return undefined;
            }
        };
        _this.top = function () {
            if (instance.size() > 0) {
                var pointer = instance.top();
                return cache[instance.get_identifier(pointer)];
            }
            else {
                return undefined;
            }
        };
        Object.defineProperty(_this, 'instance', {
            value: instance
        });
        return _this;
    }
    PriorityQueue.prototype.push = function (node) { };
    PriorityQueue.prototype.top = function () { return; };
    PriorityQueue.prototype.pop = function () { return; };
    return PriorityQueue;
}(BaseQueue));
exports.PriorityQueue = PriorityQueue;
