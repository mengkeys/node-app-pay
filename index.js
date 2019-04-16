'use strict';
const AliPay = require('./libs/alipay');
const WXPay  = require('./libs/wxpay');
const ApplePay = require('./libs/applepay');
const JDPay    = require('./libs/jdpay');
const DiPay    = require('./libs/dipay');
const MeiPay    = require('./libs/meipay');
const BaiduPay  = require('./libs/baidupay');


module.exports = {
    AliPay,
    ApplePay,
    WXPay,
    JDPay,
    MeiPay,
    DiPay,
    BaiduPay
};
