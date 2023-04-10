// 返回条件为真的新数组
Array.prototype.myarray = function (callback) {
    // TODO：待补充代码
    let newarr = []
    this.forEach(item => {
        if (callback(item)) {
            newarr.push(item);
        }
    })
    return newarr;
};

