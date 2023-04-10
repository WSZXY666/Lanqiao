let rollTime; // 定义定时器变量用来清除定时器
let time = 0; // 转动次数
let speed = 300; // 转动时间间隔
let times; // 总转动次数
// 开始按钮点击事件后开始抽奖
$("#start").on("click", function () {
    $("#award").text(""); //清空中奖信息
    times = parseInt(Math.random() * (20 - 30 + 1) + 20, 10); // 定义总转动次数，随机20-30次
    rolling();
});

// TODO：请完善此函数
function rolling() {
    time++; // 转动次数加1
    clearTimeout(rollTime);
    rollTime = setTimeout(() => {
        /**
         * 获取当前转动到的li
         * 因为总共有8个li，且li的class设置的正好是转盘顺时针转动时.li加对应的序号
         * 即.li1是第一个~~.li4是第四个 ~~.li8是第八个，转到第九个时回到.li1
         * 所以我们可以利用转动次数对8取余来获取对应的DOM元素li
         */
        let className = `.li${time % 8}`
        //但time是8的整数倍时，按照逻辑我们需要获取.li8，但这时time对8取余等于0，所以这种情况我们需要单独讨论
        if (time % 8 === 0) {
            className = `.li8`
        }
        /**
         * 对我们获取到的指定元素添加active选中类
         * .siblings()为获取当前元素的所有兄弟节点
         * .siblings().removeClass("active")为移除兄弟节点的active类
         */
        $(`${className}`).addClass("active").siblings().removeClass("active")
        window.requestAnimationFrame(rolling); // 进行递归动画
    }, speed);

    // time > times 转动停止
    if (time > times) {
        clearInterval(rollTime);
        // 获取选中元素的文本值
        let text = $(`.active`).text();
        //将获取到的文本值赋值给id为award的元素
        $("#award").text(`恭喜您抽中了${text}!!!`);
        time = 0;
    }
}
