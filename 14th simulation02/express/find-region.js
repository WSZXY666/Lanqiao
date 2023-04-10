//传入所有省级行政单位和目标行政单位名称
function findRegion(regions, regionName) {
    // TODO: 在这里写入具体的实现逻辑
    // 需要从树状结构的行政信息中，遍历找到目标区域的行政信息，如输入：成都市，返回 [四川省，成都市]
    // 如果所输入的位置信息不存在，则返回 null
    let arrRes = [];

    // 遍历区域中的所有省级行政单位
    for (let item of regions) {
        // 如果省级行政单位的名称和目标名称相同，保存该区域的省份名称
        if (item.name === regionName) {
            arrRes[0] = item.name;
            break;
        } else {
            // 如果不相同，则继续遍历该省级行政单位下的所有市级行政单位
            // 省级行政单位中没有双流区，继续遍历该省级行政单位下的所有市级行政单位
            // 将该省级行政单位的所有市级行政单位和该省级行政单位的名字传给shi
            shi(item.children, item.name);
        }
    }

    // 声明了两个内部函数 shi 和 qu，用于遍历地区树状结构的节点
    function shi(arr, name) {
        // 遍历区域中的所有市级行政单位
        for (let item1 of arr) {
            // 如果市级行政单位的名称和目标名称相同，保存该区域的省份和市级行政单位名称
            if (item1.name === regionName) {
                arrRes[0] = name;
                arrRes[1] = item1.name;
                break;
            } else {
                // 如果不相同，则继续遍历该市级行政单位下的所有区县级行政单位
                // 市级行政单位中没有双流区，继续遍历该市级行政单位下的所有区县级行政单位
                // 将该市级行政单位的所有区县级行政单位、该省级行政单位的名字和该市级行政单位的名字传给qu
                qu(item1.children, name, item1.name);
            }
        }
    }

    function qu(arr, ...nameArr) {
        // 遍历区域中的所有区县级行政单位
        for (let item of arr) {
            // 如果区县级行政单位的名称和目标名称相同，保存该区域的省份、市级行政单位和区县级行政单位名称
            // 区县级行政单位中有双流区，将双流区加入数组nameArr，并将数组nameArr的数据赋给数组arrRes
            if (item.name === regionName) {
                nameArr.push(item.name);
                arrRes = nameArr;
                break;
            }
        }
    }

    // 判断是否找到了目标区域，如果没有找到，返回 null；如果找到了，返回区域名称数组
    if (arrRes.length === 0) {
        return null;
    } else {
        return arrRes;
    }
}

// 导出 findRegion 函数
module.exports = findRegion;
