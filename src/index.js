
import { initMixin } from './init'
function Vue (options) {
    this._init(options)
}
//=> 函数初始化 给Vue原型上定义_init方法
initMixin(Vue)
export default Vue