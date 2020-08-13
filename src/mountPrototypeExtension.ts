import {mountCreepEx} from './mount.creep'
import {mountSourceEx} from './mount.source'

// 挂载所有的额外属性和方法
export function mountPrototypeExtension():void {
    if (!global.prototypeMounted) {
        console.log('[mount] 重新挂载拓展')
        global.prototypeMounted = true;
        
        mountCreepEx();
        mountSourceEx();
    }
}