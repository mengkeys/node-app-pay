'use strict';

const xml2js = require('xml2js');
const crypto = require('crypto');
const moment = require('moment');

// XML构建
exports.buildXML = (obj, opt) => {
    const options = opt || {
        rootName: 'xml',
        cdata: true,
        xmlDec: {
            version: '1.0',
            encoding: 'UTF-8',
            standalone: 'no'
        }
    };
    const builder = new xml2js.Builder(options);
    return builder.buildObject(obj);
};

// XML解析
exports.parseXML = (xml, callback) => {

    const parser = new xml2js.Parser({
        explicitArray : false,
        ignoreAttrs : true
    });

    return new Promise((resolve, reject) => {
        parser.parseString(xml, (err, result) => {
            if(err) {
                return reject(err);
            } else {
                return resolve(result);
            }
        });
    });
};

// md5 加密
exports.md5 = (str) => {
    if(typeof str !== 'string') {
        str = JSON.stringify(str);
    }
    return crypto.createHash('md5').update(str).digest('hex');
};

// sha1加密
exports.sha256 = (str, secret) => {
    return crypto.createHmac('sha256', key).update(str).digest('hex');
};

// 生成时间戳
// 微信时间戳方式：
// 其他
exports.timestamp = () => {
    return moment().format('')
};

// 随机字符串
// 可指定长度,代码集,返回方式等
exports.nonce = (len) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let noceStr = '', maxPos = chars.length;
    while (length--) noceStr += chars[Math.random() * maxPos |0];
    return noceStr;
};

exports.sign = (type, obj) => {

};


