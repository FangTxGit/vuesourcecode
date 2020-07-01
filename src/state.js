/**
 * 函数初始化方法
 */
import { observe } from './observe/index'
export function initState (vm) {
    let options = vm.$options

    if (options.data) {
        initData(vm)
    }
}
// data数据初始化
function initData (vm) {
    let data = vm.$options.data
    //=> 判断一下data 是否为函数 如果是的话 就将函数的this指向vm并且执行，得到return的对象
    //=> 并且将data挂在到vm上
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    //=> 数据劫持 (核心)
    //=> Object.defineProperty 方法 将所有数据都加上get set方法
    observe(data)
}