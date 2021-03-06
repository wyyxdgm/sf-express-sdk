'use strict'
const request = require("request");
const queryString = require('query-string')
const crypto = require('crypto')
const x2j = require('xml2json')
const sfUtil = require('./sf.util')

function SF(opts) {
  this.clientCode = opts.clientCode
  this.checkWord = opts.checkWord
  this.url = opts.url || 'http://bsp-oisp.sf-express.com/bsp-oisp/sfexpressService'
}

SF.prototype.OrderService = function(data) {
  let xml = '<?xml version="1.0" encoding="utf-8" ?>';
  xml += '<Request service="OrderService" lang="zh-CN">';
  xml += '<Head>' + this.clientCode + '</Head>';
  xml += '<Body>';
  xml += '<Order';
  xml += ` orderid="${data['orderid']}"`;
  if (data['is_docall'] != 0 && data['is_docall'] != "") {
    xml += ` is_docall="${data['is_docall']}"`;
  }
  if (data['sendstarttime'] != 0 && data['sendstarttime'] != "") {
    xml += ` sendstarttime="${data['sendstarttime']}"`;
  }
  xml += ` express_type="${data['express_type']}"`;
  xml += ` j_company="${data['j_company']}"`;
  xml += ` j_contact="${data['j_contact']}"`;
  xml += ` j_tel="${data['j_tel']}"`;
  xml += ` j_address="${data['j_address']}"`;
  xml += ` d_company="${data['d_company']}"`;
  xml += ` d_contact="${data['d_contact']}"`;
  xml += ` d_tel="${data['d_tel']}"`;
  xml += ` d_address="${data['d_address']}"`;
  xml += ` pay_method="${data['pay_method']}"`;
  xml += ` j_province="${data['j_province']}"`;
  xml += ` j_city="${data['j_city']}"`;
  xml += ` j_county="${data['j_qu']}"`;
  xml += ` d_province="${data['d_province']}"`;
  xml += ` d_city="${data['d_city']}"`;
  xml += ` d_county="${data['d_qu']}"`;
  xml += ` custid="${data['custid']}"`;
  xml += ` remark="${data['remark']}"`;
  xml += ` parcel_quantity="${1}">`;
  if (data['things_num'] != 0 && data['things_num'] != "") {
    xml += '<Cargo name="' + data['things'] + '" count="' + data['things_num'] + '"></Cargo>';
  }
  if (data['daishou'] != '' && data['daishou'] != 0) {
    xml += '<AddedService name="COD" value="' + data['daishou'] + '" value1="' + data['custid'] + '" />';
  }
  xml += '</Order>';
  xml += '</Body>';
  xml += '</Request>';

  const self = this
  return sfUtil.OrderService(data).then(function() {
    return self.Send(xml)
  })
}

SF.prototype.OrderFilterService1 = function(address, mode) {
  mode = 1
  let xml = '<?xml version="1.0" encoding="utf-8" ?>';
  xml += '<Request service="OrderFilterService" lang="zh-CN">';
  xml += '<Head>' + this.clientCode + '</Head>';
  xml += '<Body>';
  xml += '<OrderFilter filter_type="1" d_address="' + address + '" />';
  xml += '</Body>';
  xml += '</Request>';
  return this.Send(xml)
}

SF.prototype.OrderFilterService = function(opts) {
  const orderid = opts['search_orderid'];
  const d_address = opts['search_d_address'];
  const d_tel = opts['search_d_tel'];
  const j_tel = opts['search_j_tel'];
  const j_address = opts['search_j_address'];
  const j_custid = opts['search_j_custid'];

  let xml = '<?xml version="1.0" encoding="utf-8" ?>';
  xml += '<Request service="OrderFilterService" lang="zh-CN">';
  xml += '<Head>' + this.clientCode + '</Head>';
  xml += '<Body>';
  xml += '<OrderFilter orderid="' + orderid + '" filter_type="1" d_address="' + d_address + '">';
  xml += '<OrderFilterOption j_tel="' + j_tel + '" j_address="' + j_address + '" d_tel="' + d_tel + '" j_custid="' + j_custid + '" />';
  xml += '</OrderFilter>';
  xml += '</Body>';
  xml += '</Request>';

  const self = this
  return sfUtil.OrderFilterService(opts).then(function() {
    return self.Send(xml)
  })
}

SF.prototype.OrderSearchService = function(orderid) {
  let xml = '<?xml version="1.0" encoding="utf-8" ?>';
  xml += '<Request service="OrderSearchService" lang="zh-CN">';
  xml += '<Head>' + this.clientCode + '</Head>';
  xml += '<Body>';
  xml += '<OrderSearch orderid="' + orderid + '" />';
  xml += '</Body>';
  xml += '</Request>';

  const self = this
  return sfUtil.OrderSearchService(orderid).then(function() {
    return self.Send(xml)
  })
}

SF.prototype.RouteService = function(opts) {
  const tracking_type = opts['tracking_type'] =
    undefined === opts['tracking_type'] ? 1 : opts['tracking_type'];
  const method_type = opts['method_type'] =
    undefined === opts['method_type'] ? 1 : opts['method_type'];
  const tracking_number = opts['tracking_number'];
  let xml = '<?xml version="1.0" encoding="utf-8" ?>';
  xml += '<Request service="RouteService" lang="zh-CN">';
  xml += '<Head>' + this.clientCode + '</Head>';
  xml += '<Body>';
  xml += '<RouteRequest tracking_type="' + tracking_type + '" method_type="' + method_type + '" tracking_number="' + tracking_number + '"/> ';
  xml += '</Body>';
  xml += '</Request>';

  const self = this
  return sfUtil.RouteService(opts).then(function() {
    return self.Send(xml)
  })
}

SF.prototype.RouteServiceByOrderId = function(orderid) {
  return this.RouteService({
    tracking_number: orderid,
    tracking_type: 2
  });
}

SF.prototype.OrderConfirmService = function(opts) {
  const orderid = opts['orderid'];
  const dealtype = opts['dealtype'] =
    undefined === opts['dealtype'] ? '2' : opts['dealtype'];
  let xml = '<?xml version="1.0" encoding="utf-8" ?>';
  xml += '<Request service="OrderConfirmService" lang="zh-CN">';
  xml += '<Head>' + this.clientCode + '</Head>';
  xml += '<Body>';
  xml += '<OrderConfirm orderid="' + orderid + '" dealtype="' + dealtype + '"></OrderConfirm>';
  xml += '</Body>';
  xml += '</Request>';

  const self = this
  return sfUtil.OrderConfirmService(opts).then(function() {
    return self.Send(xml)
  })
}

SF.prototype.OrderConfirmServiceCancel = function(orderid) {
  return this.OrderConfirmService({
    orderid: orderid
  });
}

SF.prototype.Send = function(xml) {
  const hash = crypto.createHash('md5')
  const verifyCode = hash.update(xml + this.checkWord, 'utf8').digest('base64');
  const self = this;

  return new Promise(function(resolve, reject) {
    request.post({
      url: self.url,
      form: {
        xml: xml,
        verifyCode: verifyCode
      }
    }, function(err, response, body) {
      if (err) {
        reject(err)
      } else {
        const jsonBody = JSON.parse(x2j.toJson(body).replace('$t', 'text')).Response
        const answer = jsonBody.ERROR || jsonBody.Body || {}
        resolve(answer)
      }
    })
  })
}

module.exports = SF