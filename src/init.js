/*****
 * 
 * 函数初始化
 */
import { initState } from './state'
export function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        let vm = this
        vm.$options = options
        initState(vm) //=> 函数初始化的方法
    }
}