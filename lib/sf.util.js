'use strict'
const _ = require('lodash')

function isPass(value) {
  return true
}

function notEmpty(value) {
  return !_.isEmpty(value) || _.isInteger(value)
}

function SFCheck() {
  this.matchRules = {
    OrderService: {
      "orderid": notEmpty,
      "is_docall": isPass,
      "sendstarttime": isPass,
      "express_type": notEmpty,
      "j_company": notEmpty,
      "j_contact": notEmpty,
      "j_tel": notEmpty,
      "j_province": notEmpty,
      "j_city": notEmpty,
      "j_qu": notEmpty,
      "j_address": notEmpty,
      "d_company": notEmpty,
      "d_contact": notEmpty,
      "d_tel": notEmpty,
      "d_province": notEmpty,
      "d_city": notEmpty,
      "d_qu": notEmpty,
      "d_address": notEmpty,
      "pay_method": notEmpty,
      "custid": notEmpty,
      "daishou": notEmpty,
      "things": notEmpty,
      "things_num": notEmpty,
      "remark": isPass,
    },
    OrderFilterService: {
      "search_orderid": notEmpty,
      "search_d_address": notEmpty,
      "search_d_tel": notEmpty,
      "search_j_custid": notEmpty,
      "search_j_address": notEmpty,
      "search_j_tel": notEmpty
    },
    RouteService: {
      "tracking_type": notEmpty,
      "method_type": notEmpty,
      "tracking_number": notEmpty
    },
    OrderConfirmService: {
      "orderid": notEmpty,
      "dealtype": notEmpty
    }
  }
}

SFCheck.prototype.process = function(name, opts) {
  const self = this
  return new Promise(function(resolve, reject) {
    if (typeof opts !== 'object') {
      return reject({
        code: '0010',
        text: '参数必须是Object类型'
      })
    }
    const mustHaveParams = Object.keys(self.matchRules[name])
    const userHaveParams = Object.keys(opts)

    const lostParams = _.filter(mustHaveParams, function(param) {
      return !_.includes(userHaveParams, param)
    })
    if (!_.isEmpty(lostParams)) {
      return reject({
        code: '0011',
        text: '参数缺失:' + lostParams.join(',')
      })
    }
    let noMatchRulesArray = []
    Object.keys(opts).forEach(function(param) {
      if (!self.matchRules[name][param](opts[param])) noMatchRulesArray.push(param + '=' + opts[param])
    })
    if (notEmpty(noMatchRulesArray)) {
      return reject({
        code: '0012',
        text: '参数错误:' + noMatchRulesArray.join(';')
      })
    }
    resolve()
  })
}

SFCheck.prototype.OrderService = function(opts) {
  return this.process('OrderService', opts)
}

SFCheck.prototype.OrderFilterService = function(opts) {
  return this.process('OrderFilterService', opts)
}

SFCheck.prototype.OrderSearchService = function(orderid) {
  return _.isEmpty(orderid) ? Promise.reject({
    code: '0001',
    text: '客户订单号不能为空'
  }) : Promise.resolve(isPass())
}

SFCheck.prototype.RouteService = function(opts) {
  return this.process('RouteService', opts)
}

SFCheck.prototype.OrderConfirmService = function(opts) {
  return this.process('OrderConfirmService', opts)
}

module.exports = new SFCheck()