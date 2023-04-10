function convertToTree(regions, rootId = "0") {
    // TODO: 在这里写入具体的实现逻辑
    // 将平铺的结构转化为树状结构，并将 rootId 下的所有子节点数组返回
    // 如果不存在 rootId 下的子节点，则返回一个空数组
    let resArr = []
    regions.forEach(element => {
        if (element.pid === rootId) {
            resArr.push(element);
            element.children = convertToTree(regions, element.id);
        }
    });
    return resArr;
}

module.exports = convertToTree; // 检测需要，请勿删除
