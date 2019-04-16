# APP 支付Node.JS 模块


## 注意事项
1. 本模块仅关注APP支付领域;
2. 除网络请求外、不对第三方返回数据做任何处理


## 方式一览

| 序号 | 渠道 | 实现 |
| --- | --- | --- |
|  1  | 微信支付 | [x] |
|  2  | 支付宝支付 | [x] |
|  3  | 京东支付 | [] |
|  4  | 滴滴支付 | [] |
|  5  | 美团支付 | [] |
|  6  | 百度支付 | []　|
|  7  | 苹果支付 | [] |

> 注意: 上述列表仅包含主流支付系统

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


