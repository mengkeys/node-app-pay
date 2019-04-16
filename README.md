# APP 支付Node.JS 模块


## 注意事项
1. 本模块仅关注APP支付领域;
2. 除网络请求外、不对第三方返回数据做任何处理


## 渠道规划

| 序号 | 渠道 | 实现 |
| --- | --- | --- |
|  1  | 微信支付 | 实现 |
|  2  | 支付宝支付 | 实现 |
|  3  | 京东支付 | 实现 |
|  4  | 滴滴支付 | 实现 |
|  5  | 美团支付 | 实现 |
|  6  | 百度支付 | 实现　|
|  7  | 苹果支付 | 实现 |


## 模块使用

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

// 其他支付方式类似

module.exports = { alipay, wxpay };

```


