const pay = require('../index');

const wxpay = new pay.WXPay({
    appid: '',
    mch_id: '',
    key: '',
    pfx: ''
});

wxpay.unifiedOrder({
    out_trade_no: '201904162042560123',
    body: '消费-测试',
    total_fee: 1
}).then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
