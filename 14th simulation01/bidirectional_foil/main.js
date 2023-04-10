// 实现了一个基于 Promise 的请求控制器，可以控制同时运行的请求数量，避免过多的请求造成服务器负载过高。
// 使用 promise 模拟请求 + 3000ms后完成得到发射后结果
/*
createRequest()函数用于创建一个请求。
它返回一个闭包，该闭包返回一个 Promise，Promise 会在 3000ms + i * 100ms 后完成，通过 Math.random() >= 0.05 模拟了请求成功和失败的两种情况。
如果请求成功，Promise 将返回一个字符串表示成功消息；如果请求失败，Promise 将返回一个字符串表示失败消息。
 */
function createRequest(i) {
    return function () {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            setTimeout(() => {
                if (Math.random() >= 0.05) {
                    /*
                    这里的 Date.now() - start 表示从请求开始到请求结束的时间差，单位是毫秒。
                    start 是请求开始的时间戳，Date.now() 返回当前时间的时间戳，两者相减就是请求的耗时。
                    所以 ${Date.now() - start} 返回的是请求耗时的毫秒数。
                     */
                    resolve(
                        `第${i + 1}艘曲率飞船达到光速，成功逃离，用时${Date.now() - start}`
                    );
                } else {
                    reject(
                        `第${i + 1}艘曲率飞船出现故障，无法达到光速，用时${
                            Date.now() - start
                        }`
                    );
                }
            }, 3000 + i * 100);
        });
    };
}
// 用于控制请求的并发数量。
class RequestControl {
    /*
    该类的构造函数接受一个对象参数，包含两个属性：max 和 el。max 表示可以同时运行的最大请求数量，el 表示请求结果需要添加到的 DOM 元素。
    */
    constructor({max, el}) {
        this.max = max; // 10
        this.el = document.querySelector(el); // ul标签
        this.requestQueue = [];
        setTimeout(() => {
            this.requestQueue.length > 0 && this.run();

        });
        this.startTime = Date.now();
    }

    //用于向请求队列中添加请求，这些请求将会被控制器进行管理和处理。
    addRequest(request) {
        this.requestQueue.push(request);
    }

    /*
    控制器的核心方法，它使用一个 while 循环，不断从请求队列中取出请求，然后把这些请求存入 pendingQueue 数组。
    同时，它还会检查 pendingQueue 的长度，如果达到 max 值，则使用 Promise.race() 方法等待最快完成的请求，并从 pendingQueue 中移除它。

    使用 Promise.race() 方法等待其中一个 promise 实例变为 resolved 或 rejected 状态。
    一旦有一个 promise 实例变为 resolved 或 rejected 状态，它就会从 pendingQueue 中移除，并在 then() 或 catch() 块中调用 shift() 方法。
     */

    /*
    在执行每个请求时，使用 then() 方法将成功的结果传递给 render() 方法，render() 方法将结果渲染到指定的 DOM 元素中。
    这个 run() 方法会重复这个过程，直到队列为空。
    如果请求失败，catch() 方法将失败的消息传递给 render() 方法，也将消息渲染到 DOM 元素中。
     */
    /*
    requestQueue是指存储请求的数组队列，pendingQueue是指存储Promise对象的数组队列，该Promise对象包含了请求的处理结果和错误信息。
    pendingQueue是在运行时动态生成的，用于暂存正在处理的Promise对象，同时通过控制pendingQueue数组的长度来限制同时运行的请求的数量，防止并发请求数过高导致服务器崩溃。
     */
    async run() {
        // TODO：待补充代码
        const pendingQueue = [];
        while (this.requestQueue.length > 0) {
            pendingQueue.push(
                this.requestQueue.shift()()
                    .then(msg => {
                        this.render(msg);
                    })
                    .then(() => {
                        pendingQueue.shift(); // shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
                    })
                    .catch(err => {
                        this.render(err);
                        pendingQueue.shift();
                    }))
            if (pendingQueue.length === this.max) {
                await Promise.race(pendingQueue);
            }
        }
    }

    /*
    该方法创建一个新的 <li> 元素，并将上面处理的请求结果添加到元素的文本内容中。然后，将该元素添加到指定的元素（el）中。
     */
    render(context) {
        const childNode = document.createElement("li");
        childNode.innerText = context;
        this.el.appendChild(childNode);
    }
}

/*
在主函数中，创建一个 RequestControl 实例，并使用 createRequest() 函数创建 25 个请求，添加到请求队列中。
每个请求将在3秒后返回，其中一个请求有5%的概率失败。
通过以上代码，可以实现控制请求并发数的功能，有效避免服务器压力过大的问题。
 */
let requestControl = new RequestControl({max: 10, el: "#app"});
for (let i = 0; i < 25; i++) {
    const request = createRequest(i);
    requestControl.addRequest(request);
}

// 导出 requestControl 变量
module.exports = {
    requestControl,
};

/*
max = 10 // 1、首先，会创建一个 RequestControl 实例，传入 {max: 10, el: "#app"} 作为参数。这会触发 RequestControl 类的构造函数，并初始化一些属性和方法。
el = ul
requestQueue = [];

request1:第1艘曲率飞船达到光速，成功逃离，用时3015 // 2、接着，使用 createRequest() 函数创建了 25 个请求。（每个请求会通过 createRequest() 函数返回的 Promise 进行异步处理）
request2:第2艘曲率飞船达到光速，成功逃离，用时3101
request3:第3艘曲率飞船达到光速，成功逃离，用时3202
.
.
.
request25:第25艘曲率飞船达到光速，成功逃离，用时5406
requestQueue = [request1,request2,request3,...,request25]; // 3、通过 requestControl.addRequest(request) 方法将这些请求添加到 requestControl 实例的请求队列中。

pendingQueue = [request1,request2,request3,...,request10]  // 4、然后，setTimeout() 方法会在延迟时间为 0 毫秒后调用回调函数，该回调函数中会判断请求队列是否为空，并调用 this.run() 方法来处理请求队列中的请求。
第1艘曲率飞船达到光速，成功逃离，用时3015 // 5、当请求成功时会调用 resolve() 方法，并将成功的消息通过 this.render(msg) 方法渲染到页面上。
第2艘曲率飞船达到光速，成功逃离，用时3101
第3艘曲率飞船达到光速，成功逃离，用时3202
.
.
.
pendingQueue = [request11,request12,request13,...,request20]
第11艘曲率飞船达到光速，成功逃离，用时4004
第12艘曲率飞船达到光速，成功逃离，用时4103
第13艘曲率飞船达到光速，成功逃离，用时4204
.
.
.
pendingQueue = [request21,request22,request23,request24,request25]
第21艘曲率飞船达到光速，成功逃离，用时5006
第22艘曲率飞船达到光速，成功逃离，用时5100
第23艘曲率飞船达到光速，成功逃离，用时5208
第24艘曲率飞船出现故障，无法达到光速，用时5315 // 6、当请求失败时会调用 reject() 方法，并将失败的消息通过 this.render(err) 方法渲染到页面上。
第25艘曲率飞船达到光速，成功逃离，用时5406
// 7、最后，当所有请求处理完毕后，整个文件的执行结束。页面上会展示请求的处理结果，包括成功的消息和失败的消息，最终结果取决于每个请求的随机成功率。
 */

/*
   因为请求是异步处理的，所以输出的顺序可能会与请求添加的顺序不完全一致。
   例如，某个请求可能由于随机成功率较低而失败，但由于其他请求处理较快，所以该失败的请求可能在其他请求后面输出。
   但整体上，最多同时处理的请求数量不会超过 max 参数所指定的数量。
   请注意，因为 setTimeout() 方法的延迟时间是固定的，所以实际执行时间可能会受到系统性能和网络延迟等因素的影响。
   但在正常情况下，每个请求会在约 3 秒后完成，并将结果渲染到页面上。如果请求队列较大，可能会需要较长的时间来处理完所有请求。
   在整个执行过程中，页面上会不断地添加新的请求处理结果，直到所有请求都处理完毕。
 */