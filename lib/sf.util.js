'use strict'
const _ = require('lodash')

function isPass(value) {
  return true
}

function notEmpty(value) {
  return !_.isEmpty(value)
}

function SFCheck() {
  this.matchRules = {
    OrderService: {
      "orderid": notEmpty,
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
    }
  }
}

SFCheck.prototype.process = function(name, opts) {
  const self = this
  return new Promise(function(resolve, reject) {
    if (typeof opts !== 'object') {
      reject('params can not string')
    }
    const mustHaveParams = Object.keys(self.matchRules[name])
    const userHavaParams = Object.keys(opts)

    const lostParams = _.filter(mustHaveParams, function(param) {
      return !_.includes(userHavaParams, param)
    })
    if (!_.isEmpty(lostParams)) {
      reject('params ' + JSON.stringify(lostParams) + ' not exist')
    }

    Object.keys(opts).forEach(function(param) {
      if (!self.matchRules[name][param](opts[param])) {
        reject('format error:' + param + ' value is ' + opts[param])
      }
    })
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
    code: '0002',
    text: '客户订单号不能为空'
  }) : Promise.resolve(isPass());
}

SFCheck.prototype.RouteService = function(mailno) {
  return _.isEmpty(mailno) ? Promise.reject({
    code: '0001',
    text: '顺丰运单号不能为空'
  }) : Promise.resolve(isPass());
}

SFCheck.prototype.RouteServiceByOrderId = function(orderid) {
  return _.isEmpty(orderid) ? Promise.reject({
    code: '0002',
    text: '客户订单号不能为空'
  }) : Promise.resolve(isPass());
}

module.exports = new SFCheck()
