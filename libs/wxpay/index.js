'use strict';

const request = require('request');
const qs = require('querystring');
const clone = require('clone');
const utils = require('../utils');

// 签名方式
const sign_types = {
    MD5: 'md5',
    SHA: 'HMAC-SHA256'
};

// 交易方式
const trade_type = 'APP';

const api_urls = {
    unifiedOrder: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    orderQuery: 'https://api.mch.weixin.qq.com/pay/orderquery',
    closeOrder: 'https://api.mch.weixin.qq.com/pay/closeorder',
    refund: 'https://api.mch.weixin.qq.com/secapi/pay/refund',
    refundQuery: 'https://api.mch.weixin.qq.com/pay/refundquery',
    downloadBill: 'https://api.mch.weixin.qq.com/pay/downloadbill',
    downloadFundFlow: 'https://api.mch.weixin.qq.com/pay/downloadfundflow',
    report: 'https://api.mch.weixin.qq.com/payitil/report',
    batchQueryComment: 'https://api.mch.weixin.qq.com/billcommentsp/batchquerycomment'
};

const sandbox_urls = {
    unifiedOrder: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    orderQuery: 'https://api.mch.weixin.qq.com/pay/orderquery',
    closeOrder: 'https://api.mch.weixin.qq.com/pay/closeorder',
    refund: 'https://api.mch.weixin.qq.com/secapi/pay/refund',
    refundQuery: 'https://api.mch.weixin.qq.com/pay/refundquery',
    downloadBill: 'https://api.mch.weixin.qq.com/pay/downloadbill',
    downloadFundFlow: 'https://api.mch.weixin.qq.com/pay/downloadfundflow',
    report: 'https://api.mch.weixin.qq.com/payitil/report',
    batchQueryComment: 'https://api.mch.weixin.qq.com/billcommentsp/batchquerycomment'
};

// 定义微信支付类
class WXPay {
    // 构造函数
    constructor({appid, mchid, partnerKey, pfx, spbill_create_ip, sandbox } = {}, debug = false) {
        this.appid            = appid;
        this.mchid            = mchid;
        this.partnerKey       = partnerKey;
        this.pfx              = pfx;
        this.spbill_create_ip = spbill_create_ip;
        this.sandbox          = sandbox;
        this.urls             = sandbox ? sandbox_urls : api_urls;  // 根据是否沙箱来设置
        this.debug            = debug;                             // 开启debug则将输出调试信息
    }

    // 获取唤起支付的参数
    params(data){
        this.unifiedOrder(data);
    }

    // 统一下单
    unifiedOrder(params){

        let data = {
            ...params,
            appid: this.appid,
            mch_id: this.mchid,
            nonce_str: utils.nonce(),
            sign_type: params.sign_type || 'MD5',
            notify_url: params.notify_url || this.notify_url,
            spbill_create_ip: params.spbill_create_ip || this.spbill_create_ip,
            trade_type: params.trade_type || 'JSAPI'
        };

        return this._request(this.urls.unifiedOrder, data);
    }

    // 签名
    _sign(){

    }

    // 请求
    _request(url, data) {

    }

}

WXPay.prototype.getParams = (data) => {
    const _this = this;
    return new Promise((resolve, reject) => {
        _this.unifiedOrder(data).then((result) => {
            // 此处需要再做处理(); 包装成APP唤起支付参数(直接使用)
            return resolve(result);
        }).catch((error) => {
            return reject(error);
        });
    });
};


// 统一下单
WXPay.prototype.unifiedOrder = (data, callback) => {
    this._valid(data, ['']);
    const params = this._sign(data);
    // callback 为选填函数
    return new Promise((resolve, reject) => {
        this._request(api_urls.unifiedOrder, params).then((result) => {
            return resolve(result);
        }).catch((error) => {
            return reject(error);
        })
    });
};

// 订单查询
WXPay.prototype.orderQuery = (params) => {
    return new Promise((resolve, reject) => {
        this._request(api_urls.unifiedOrder, params).then((result) => {
            return resolve(result);
        }).catch((error) => {
            return reject(error);
        })
    })
};

// 关闭订单
WXPay.prototype.closeOrder = () => {

};

// 申请退款
WXPay.prototype.refund = () => {
    const url = '';

};

// 退款查询
WXPay.prototype.refundQuery = (data) => {
    this._valid(data, []);
    data.sign = this._sign(data);
    return new Promise((resolve, reject) => {
        this._request(api_urls.refundQuery, data).then((result) => {
            return resolve(result);
        }).catch((error) => {
            return reject(error);
        })
    });
};


// 下载对账单
WXPay.prototype.downloadBill = (data) => {
    this._valid(data, ['bill_date']);
    data.sign = this._sign(data);
    return new Promise((resolve, reject) => {
        this._request(api_urls.downloadBill, data).then((result) => {
            return resolve(result);
        }).catch((error) => {
            return reject(error);
        })
    });
};

// 下载资金账单
WXPay.prototype.downloadFundFlow = (data) => {
    this._valid(data, ['interface_url', 'execute_time_']);
    // TODO: 签名方式仅支持sha256
    data.sign = this._sign(data, sign_types.SHA);
    return new Promise((resolve, reject) => {
        this._request(api_urls.downloadFundFlow, data).then((result) => {
            return resolve(result);
        }).catch((error) => {
            return reject(error);
        })
    });
};

// 交易保障
WXPay.prototype.report = (data) => {
    this._valid(data, ['interface_url', 'execute_time_']);
    data.sign = this._sign(data);
    return new Promise((resolve, reject) => {
        this._request(api_urls.report, data).then((result) => {
            return resolve(result);
        }).catch((error) => {
            return reject(error);
        })
    });
};

// 拉取订单评价数据
WXPay.prototype.batchQueryComment = (data) => {
    this._valid(data, ['begin_time', 'end_time', 'offset']);
    data.sign = this._sign(data);
    return new Promise((resolve, reject) => {
       this._request(api_urls.batchQueryComment, data).then((result) => {
           return resolve(result);
       }).catch((error) => {
           return reject(error);
       })
    });
};

WXPay.prototype.payNotify = (data) => {

};

WXPay.prototype.refundNotify = (data) => {

};

WXPay.prototype.signVerify = (data) => {

};

// 网络请求
WXPay.prototype._request = (url, params) => {
    return new Promise((resolve, reject) => {
        // 需要对data做xml封装
        const data = utils.buildXML(params);
        return request.post(url, data, (error, result) => {
            if(error) {
                return reject(error);
            } else {
                return resolve(null, result);
            }
        });
    });
};


// 签名算法(默认md5)
WXPay.prototype._sign = (data, type = 'md5') => {
    const params = clone(data);
    let result = {};
    Object.keys(params).sort().forEach((item) => {
        if(params[item].trim().length > 0 && item !== 'sign') {
            result[item] = params[item];
        }
    });

    let sign = utils.md5(qs.stringify(result) + `key=${this.key}`).toUpperCase();

    if(type === sign_types.SHA) {
        sign = utils.sha1(result, this.key).toUpperCase();
    }
};


WXPay.prototype._valid = (data, keys) => {
    // 判断的条件就是,data中有无指定key,且不为空
    const list = Object.keys(data);
    for(let i = 0; i < keys.length; i++) {

    }
};




module.exports = WXPay;
