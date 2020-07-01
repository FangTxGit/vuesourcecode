/**
 * 工具类
 */

//=> 是否是对象或者数组
export function isObjectOrArray (data) {
    return Object.prototype.toString.call(data) === '[object Object]' || Object.prototype.toString.call(data) === '[object Array]'
}
//=> 是否是数组
export function isArray (data) {
    return Array.isArray(data)
}