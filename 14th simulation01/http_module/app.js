// TODO: 待补充代码
//首先通过require语句引入http模块，并创建了一个HTTP服务器实例，并将其赋值给变量app。
const http = require('http');
const app = http.createServer();
//调用app对象上的on方法，注册一个request事件处理函数。
//当有请求到来时，服务器会触发request事件并执行这个回调函数。
app.on('request', (req, res) => {
    //回调函数中向发起请求的客户端发送响应，即res.end(\’hello world\’)。
    res.end('hello world');
});
//通过app对象的listen方法监听8080端口，并在启动成功后在控制台输出一条消息。
app.listen(8080, () => {
    console.log('server is running on port:8080...');
});
