/**
 * 数组方法
 *
 */
const methodsName = ['push', 'pop', 'shift', 'unshift', 'sort', 'slice', 'reverse']
export const arrayMethods = Object.create(Array.prototype)
const oldArrayMethods = arrayMethods.__proto__
//=> 重写array 原型上 能够改变数组本身的 方法
methodsName.forEach(name => {
    arrayMethods[name] = function (...arg) {
        //=> 执行原型上本身的方法
        console.log('数组原型的方法被重写了')

        return oldArrayMethods[name].apply(this, arg)
    }
})
