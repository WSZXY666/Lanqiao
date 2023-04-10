// 指定图表的配置项和数据
const charData = {
    title: {
        text: '云课课程销量和销售额看板',
        width: 100,
        height: 50,
        textStyle: {
            lineHeight: 50,
        },
        left: 'center',

    },
    grid: {
        top: 80,
    },
    tooltip: {
        show: true,
    },
    xAxis: {
        data: [],
    },
    // TODO：补全 `yAxis` 的设置，要求“销售额”（即，配置项 `name`）的位置（即，配置项 `position`）在图表的左侧，“销量”（即，配置项 `name`）的位置（即，配置项 `position`）在图表的右侧。
    yAxis: [{
        type: 'value',
        name: '销售额',
        position: 'left',
    },
        {
            type: 'value',
            name: '销量',
            position: 'right',
        }],
    series: [
        {
            name: '销售额',
            type: 'line',
            data: [],
            yAxisIndex: 0,
            smooth: true
        },
        {
            name: '销量',
            type: 'bar',
            data: [],
            yAxisIndex: 1,
            smooth: true
        }
    ]
};

// 以下代码为模拟后端服务器返回数据
let sale = 0;
let count = 0;
// 销售额
const saleObj = {};
// 销量
const countObj = {};
let index = 0;

function Ajax() {
    return new Promise((resolve, reject) => {
        let randomNum = Math.random();
        const randomSum = () => (randomNum * 500 + 900);
        const randomCount = () => (randomNum * 50 + 80);
        let i = index++ * 10
        let key = `10:${i == 0 ? "00" : i}`;
        if (index < 7) {
            sale = randomSum();
            Object.assign(saleObj, {[key]: sale.toFixed(2)})
            count = randomCount();
            Object.assign(countObj, {[key]: count.toFixed(2)})
        }

        const respondBody = {
            "code": 200,
            "msg": "success",
            "data": {
                saleObj,
                countObj
            }
        };
        setTimeout(() => {
            resolve(respondBody);
        }, 1000)
    })
}

async function renderChart() {
    const result = await Ajax();
    console.log(result.data);
    document.querySelector("#result").innerText = JSON.stringify(result);
    const myChart = echarts.init(document.getElementById('main'));
    // TODO：补全代码，正确给 X 轴的时间，以及 Y 轴的商品的销售额 saleObj 和销量赋值 countObj。
    let minute = times * 10 || times.toString().padStart(2, '0');
    charData.series[0].data = Object.values(result.data.saleObj);
    charData.series[1].data = Object.values(result.data.countObj);
    charData.xAxis.data.push(`10:${minute}`);

    myChart.setOption(charData, true);
    document.querySelector("#data").innerText = JSON.stringify(charData);
}

renderChart();
let times = 0;
let timer = setInterval(() => {
    renderChart();
    ++times == 6 && clearInterval(timer);
}, 2000)
