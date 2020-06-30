/*****
 * 
 * 函数初始化
 */

export function initMixin (Vue) {
    Vue.prototype._init = function (options) {
        console.log(options)
    }
}