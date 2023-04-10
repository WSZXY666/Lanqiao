const inputs = document.querySelectorAll(".controls input");

/**
 * 上面已经选取了两个取色器
 * 请添加相应的 JS 事件处理函数并绑定到合适的事件监听器上（提示：change 事件）
 * 这样我们就可以用取色器选取颜色来生成下方的渐变色背景啦
 *  */
let gra = document.querySelector('.gradient');

inputs[0].onchange = function () {
    gra.style.setProperty("--color1", inputs[0].value);
    console.log(inputs[0].value);
}
inputs[1].onchange = function () {
    gra.style.setProperty("--color2", inputs[1].value);
    console.log(inputs[1].value);
}

/*
style.setProperty(propertyName, value) 中的 propertyName 表示想要修改的 CSS 属性名，如 'color', 'font-size' 等等。
value 则表示你想将这个属性设置成什么值。
 */
