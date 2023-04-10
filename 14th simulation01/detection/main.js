/**
 * @description: 数据类型检测
 * @param {*} data 传入的待检测数据
 * @return {*} 返回数据类型
 */
function getType(data) {
    // TODO：待补充代码
    const type = typeof data;
    if (type !== "object") {
        return type;
    }
    return Object.prototype.toString
        .call(data)
        .replace(/^\[object (\S+)\]$/, "$1")
        /*
        .match(/\s([a-zA-Z]+)\]$/)[1] // 这种写法也可以。
        .slice(8, -1) // 这种写法也可以。
         */
        .toLocaleLowerCase();
    /*
    这段代码用于判断数据类型并返回其类型字符串。
    1、Object.prototype.toString.call(data) 将 data 对象转换成字符串类型，并返回其类型字符串，例如 "[object Array]" 表示 data 是一个数组对象。
      不调用 call，this 指向 Object.prototype，判断类型为 Object。调用 call，this 指向 []，判断类型为 Array。
    2、.replace(/^[object (\S+)]$/, “$1”) 使用正则表达式匹配类型字符串，并提取其中的实际类型名称，例如将 "[object Array]" 转换成 "Array" 。
    3、.toLocaleLowerCase() 将实际类型名称转换成小写字母形式。
    最终返回的字符串就是 data 对象的类型名称，例如 "array"、"object"、"string" 等。
     */
    /*
    “$1”是一个正则表达式中的捕获组（capturing group）引用，表示捕获到的第一个子字符串。
    在.replace()方法中，它表示将匹配到的子字符串替换为第一个捕获组中的值。
    例如，/(\d{4})-(\d{2})-(\d{2})/.replace(“2022-06-30”, “$2/$3/$1”)会返回”06/30/2022”，因为捕获组$1的值是”2022”，捕获组$2的值是”06”，捕获组$3的值是”30”。
    在本例中，”$1”表示替换后的字符串中的第一个括号里的子字符串。
    整个捕获组((\S+))的意思就是：匹配一个或多个非空白字符.
     */
}

module.exports = {
    getType
}


