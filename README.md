# APP 支付Node.JS 模块

> 本模块只关注APP支付领域

| 方式 | 版本 | 文档 |
| --- | --- | --- |
| 微信APP支付 |  | |
| 支付宝APP支付 | 2.0 | |


```js

// 引入模块
const pay = require('app-pay');

// 实例化支付宝
const alipay = new pay.Alipay({    
    publicKey: '',
    privateKey: '',
});


// 实例化微信
const wxpay  = new pay.Wxpay({
    appid: '',
    mchid: '',
    partenerKey: '',
    pfx: '',
});

module.exports = { alipay, wxpay };

```

| 接口 | 包含 |
| --- | --- |
| createOrder |   |
| queryOrder |    |
| createRefund |   |
| queryRefund |    |

> 本模块不对返回数据进行处理,只对网络通信进行错误处理、第三方返回数据将完全保存,请根据需求自行处理

