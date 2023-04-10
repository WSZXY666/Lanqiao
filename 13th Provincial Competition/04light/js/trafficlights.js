// TODO：完善此函数 显示红色颜色的灯
function red() {
    const defaultlight = document.getElementById('defaultlight');
    const red = document.getElementById('redlight');
    setTimeout(() => {
        console.log("red");
        defaultlight.style.display = 'none'
        red.style.display = 'inline-block'
    }, 3000);
}

// TODO：完善此函数  显示绿色颜色的灯
function green() {
    const greenlight = document.getElementById('greenlight');
    const red = document.getElementById('redlight');
    setTimeout(() => {
        console.log("green");
        red.style.display = 'none'
        greenlight.style.display = 'inline-block'
    }, 6000);
}

// TODO：完善此函数
function trafficlights() {
    red();
    green();
}

// function red() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('red');
//             document.querySelector('#defaultlight').style.display = "none";
//             document.querySelector('#redlight').style.display = "inline-block";
//             resolve();
//         }, 3000);
//     })
// }
//
// function green() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log('green');
//             document.querySelector('#redlight').style.display = "none";
//             document.querySelector('#greenlight').style.display = "inline-block";
//             resolve();
//         }, 3000);
//     })
// }
//
// async function trafficlights() {
//     await red();
//     await green();
// }

trafficlights();
