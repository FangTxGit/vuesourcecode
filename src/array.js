/**
 * 数组方法
 *
 */
const methodsName = ['push', 'pop', 'shift', 'unshift', 'sort', 'slice', 'reverse']
// 缓存一下原数组方法
const oldArrayMethods = Array.prototype
// 创建数组对象
export const arrayMethods = Object.create(Array.prototype)
//=> 重写array 原型上 能够改变数组本身的 方法
methodsName.forEach(method => {
    arrayMethods[method] = function (...arg) {
        //=> 执行原型上本身的方法
        console.log('数组原型的方法被重写了')
        let ob = this.__ob__;   // 获取数组原型上的__ob__方法 用于调取observeArray数据挟持的方法
        oldArrayMethods[method].apply(this, arg) // 执行原数组的方法
        //#region  核心方法 拿到新数据 已经数据挟持
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = arg  //=> 此处将添加进来的数据arg 方法临时变量inserted中 这个inserted就是要挟持的数据
                break;
            case 'splice':   //=>  splice中有3个参数 （原数组，索引，增加的新数据） 这样要取到第三个参数
                inserted = arg.slice(2)
            default:
                break;
        }
        //=> 判断 如果inserted 有数据的话 就进行挟持 调取observe/index.js中的方法 observeArray
        //=> 如何调取   因为 observe/index.js 中要挟持的数组原型指向了 arrayMethods 方法 所以只要在this上绑定了observeArray方法 就能取到
        if (inserted) ob.observeArray(inserted)
        //#endregion

        return oldArrayMethods[method].apply(this, arg)
    }
})
