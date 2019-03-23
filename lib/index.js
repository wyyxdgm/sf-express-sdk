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
  let xml = '<?xml version=\"1.0\" encoding=\"utf-8\" ?>';
  xml += '<Request service=\"OrderService\" lang=\"zh-CN\">';
  xml += '<Head>' + this.clientCode + '</Head>';
  xml += '<Body>';
  xml += '<Order orderid=\"' + data["orderid"] + '\" express_type=\"' + data["express_type"] + '\" j_company=\"' + data["j_company"] + '\" j_contact=\"' + data["j_contact"] + '\" j_tel=\"' + data["j_tel"] + '\" j_address=\"' + data["j_address"] + '\" d_company=\"' + data["d_company"] + '\" d_contact=\"' + data["d_contact"] + '\" d_tel=\"' + data["d_tel"] + '\" d_address=\"' + data["d_address"] + '\" pay_method=\"' + data["pay_method"] + '\" j_province=\"' + data["j_province"] + '\" j_city=\"' + data["j_city"] + '\" j_county=\"' + data["j_qu"] + '\" d_province=\"' + data["d_province"] + '\" d_city=\"' + data["d_city"] + '\" d_county=\"' + data["d_qu"] + '\" custid=\"' + data["custid"] + '\" remark=\"' + data["remark"] + '\" parcel_quantity="1">';
  if (data["things_num"] != 0 && data["things_num"] != "") {
    xml += '<Cargo name=\"' + data["things"] + '\" count=\"' + data["things_num"] + '\"></Cargo>';
  }
  if (data["daishou"] != "" && data["daishou"] != 0) {
    xml += '<AddedService name="COD" value=\"' + data["daishou"] + '\" value1=\"' + data["custid"] + '\" />';
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
  const orderid = opts["search_orderid"];
  const d_address = opts["search_d_address"];
  const d_tel = opts["search_d_tel"];
  const j_tel = opts["search_j_tel"];
  const j_address = opts["search_j_address"];
  const j_custid = opts["search_j_custid"];

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
  const tracking_type = undefined === opts["tracking_type"] ? 1 : opts["tracking_type"];
  const method_type = undefined === opts["method_type"] ? 1 : opts["method_type"];
  const tracking_number = opts["tracking_number"];
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
    tracking_number: orderid
  });
}

SF.prototype.OrderConfirmService = function(opts) {
  opts["dealtype"] = undefined === opts["dealtype"] ? '2' : opts["dealtype"];
  let xml = '<?xml version="1.0" encoding="utf-8" ?>';
  xml += '<Request service="OrderConfirmService" lang="zh-CN">';
  xml += '<Head>' + this.clientCode + '</Head>';
  xml += '<Body>';
  xml += '<OrderConfirm orderid="' + opts.orderid + '" dealtype="' + opts.dealtype + '"></OrderConfirm>';
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
