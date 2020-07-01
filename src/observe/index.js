/***
 * 数据劫持方法 通过Object.defindProperty 方法将数据添加get set方法
 */

import { isObjectOrArray, isArray } from '../util/index'
import { arrayMethods } from '../array'

class ObServer {
    constructor(value) {
        if (isArray(value)) {
            //=> 如果是数组的话 需要对数组中的每项内容做数据挟持 而不是对索引进行挟持
            this.observeArray(value)
            //=> 数组中存在一些能改变数组自身数据的方法 比如push pop shift unshift sort slice reverse 需要将这些方法重写
            value.__proto__ = arrayMethods
        } else {
            //=> 对对象元素进行数据挟持
            this.walk(value)
        }
    }
    //=> 数组的数据劫持
    observeArray (data) {
        data.forEach(item => {
            observe(item)
        })
    }
    //=> 对象类的数据劫持
    walk (data) {
        const keys = Object.keys(data)
        keys.forEach(key => {
            defindReactive(data, key, data[key])
        })
    }
}
function defindReactive (data, key, value) {
    observe(value) //=> 进来判断 如果是对象 使用递归继续将子元素数据劫持
    Object.defineProperty(data, key, {
        configurable: true,
        enumerable: false,
        get () {
            return value;
        },
        set (newval) {
            if (newval === value) return
            observe(newval) //=> 为修改的信息 设置数据劫持
            value = newval

        }
    })
}
export function observe (data) {
    const isobjorarray = isObjectOrArray(data)
    if (!isobjorarray) return  //=>  如果不是对象或者数组直接返回
    return new ObServer(data)
}