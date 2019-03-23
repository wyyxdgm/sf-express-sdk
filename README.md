# sf-express-sdk

(顺丰快递接口)丰桥服务平台部分接口实现、npm package

## 使用方法

1. npm包安装

```bash
npm install sf-express-sdk
```

2. 在[丰桥官网](https://qiao.sf-express.com/)申请API接入，获取：客户编码、校验码、调用地址

3. 覆盖代码中的 `<客户编码>`, `<校验码>`, `<调用地址>`

## API列表

* [下单](#下单)

		OrderService(<opt>)

* [订单过滤](#订单过滤)

		OrderFilterService(<opt>)

* [订单查询](#订单查询)

		OrderSearchService(<orderid>)

* [路由信息查询（根据顺丰运单号）](#路由信息查询（根据顺丰运单号）)

		RouteService({tracking_number: <mailno>, tracking_type:1, method_type:1})

* [路由信息查询（根据客户订单号）](#路由信息查询（根据客户订单号）)

		RouteServiceByOrderId(<orderid>)

* [取消订单](#取消订单)

		OrderConfirmServiceCancel(<orderid>)

		OrderConfirmService({orderid: <orderid>, dealtype: 2})

<div id="配置"></div>
### 配置

```js
/**
 * @apiDescription 创建SF
 * @apiName new SF
 *
 * @apiParam {String} clientCode 客户编码
 * @apiParam {String} checkWord 校验码
 * @apiParam {String} [url=http://bsp-oisp.sf-express.com/bsp-oisp/sfexpressService] 调用地址
 */
const SF = require('sf-express-sdk');
const sf = new SF({
	clientCode: '<客户编码>',
	checkWord: '<校验码>',
	url: '<调用地址>'
});
```
<div id="下单"></div>
### 下单

```js
/**
 * @apiDescription 下单
 * @apiName OrderService
 * @apiSuccessExample {json} Success-Response:
 * {
 * 	"OrderResponse": {
 * 		"filter_result": "2",
 * 		"destcode": "539",
 * 		"mailno": "444010688260",
 * 		"origincode": "532",
 * 		"orderid": "0002",
 * 		"rls_info": {
 * 			"rls_errormsg": "444010688260:",
 * 			"invoke_result": "OK",
 * 			"rls_code": "1000",
 * 			"rls_detail": {
 * 				"waybillNo": "444010688260",
 * 				"sourceCityCode": "532",
 * 				"destCityCode": "539",
 * 				"destDeptCode": "539AE",
 * 				"destTransferCode": "539W",
 * 				"destRouteLabel": "539AE",
 * 				"proName": "顺丰标快",
 * 				"cargoTypeCode": "C201",
 * 				"limitTypeCode": "T4",
 * 				"expressTypeCode": "B1",
 * 				"codingMapping": "21",
 * 				"xbFlag": "0",
 * 				"printFlag": "000000000",
 * 				"twoDimensionCode": "MMM={'k1':'539W','k2':'539AE','k3':'','k4':'T4','k5':'444010688260','k6':'','k7':'36f4e170'}",
 * 				"proCode": "T4",
 * 				"printIcon": "00000000"
 * 			}
 * 		}
 * 	}
 * }
 *
 * @apiErrorExample {json} Error-Response:
 * { code: '8119', text: '月结卡号不存在或已失效' }
 */

const createOrderOpts = {
	"orderid": "0002",
	"express_type": "1",
	"j_company": "西瓜の公司",
	"j_contact": "大西瓜",
	"j_tel": "15842345665",
	"j_province": "山东省",
	"j_city": "青岛市",
	"j_qu": "崂山区",
	"j_address": "丽达广场对面",
	"d_company": "菠萝の公司",
	"d_contact": "大菠萝",
	"d_tel": "15544456578",
	"d_province": "山东省",
	"d_city": "临沂市",
	"d_qu": "兰山区",
	"d_address": "金雀山路齐鲁大厦",
	"pay_method": "1",
	"custid": "7551234567",
	"daishou": "0",
	"things": "小笼包",
	"things_num": "1",
	"remark": "精密仪器，小心轻拿轻放~",
}
sf.OrderService(createOrderOpts).then(function(result) {
	console.log(JSON.stringify(result))
}).catch(function(err) {
	console.log(err)
})
```
<div id="订单过滤"></div>
### 订单过滤

```js
/**
 * @apiDescription 订单过滤
 * @apiName OrderFilterService
 * @apiSuccessExample {json} Success-Response:
 * {"OrderFilterResponse":{"filter_result":"1","orderid":"0002"}}
 *
 * @apiErrorExample {json} Error-Response:
 * {"code":"8028","text":"客户未配置此业务"}
 */

const filterOpts = {
 "search_orderid":"0002",
 "search_d_address":"金雀山路齐鲁大厦",
 "search_d_tel":"15544456578",
 "search_j_custid":"7551234567",
 "search_j_address":"丽达广场对面",
 "search_j_tel":"15842345665"
}
sf.OrderFilterService(filterOpts).then(function(result){
 console.log(JSON.stringify(result))
}).catch(function(err) {
 console.log(err)
})
```
<div id="订单查询"></div>
### 订单查询

```js
/**
 * @apiDescription 订单查询
 * @apiName OrderSearchService
 * @apiSuccessExample {json} Success-Response:
 *   {
 *   	"OrderResponse": {
 *   		"filter_result": "2",
 *   		"destcode": "539",
 *   		"mailno": "444010688260",
 *   		"origincode": "532",
 *   		"orderid": "0002"
 *   	}
 *   }
 *
 * @apiErrorExample {json} Error-Response:
 *   {"code":"6150","text":"找不到该订单"}
 */

sf.OrderSearchService('0002').then(function(result) {
	console.log(JSON.stringify(result))
}).catch(function(err) {
	console.log(err)
})
```
<div id="路由信息查询（根据顺丰运单号）"></div>
### 路由信息查询（根据顺丰运单号）

```js
/**
 * @apiDescription 路由信息查询
 * @apiName RouteService
 * @apiParam {String} tracking_number 查询号
 * @apiParam {Number} [tracking_type=1] 查询号类别:1：根据顺丰运单号查询;2：根据客户订单号查询;3：逆向单，根据客户原始订单号查询
 * @apiParam {Number} [method_type=1] 路由查询类别1：标准路由查询;2：定制路由查询
 * @apiSuccessExample {json} Success-Response:
 *   {
 *   	"RouteResponse": {
 *   		"mailno": "444010688260",
 *   		"orderid": "0002",
 *   		"Route": [{
 *   			"remark": "顺丰速运 已收取快件（测试数据）",
 *   			"accept_time": "2018-05-01 08:01:44",
 *   			"accept_address": "广东省深圳市软件产业基地",
 *   			"opcode": "50"
 *   		}, {
 *   			"remark": "已签收,感谢使用顺丰,期待再次为您服务（测试数据）",
 *   			"accept_time": "2018-05-02 12:01:44",
 *   			"accept_address": "广东省深圳市软件产业基地",
 *   			"opcode": "80"
 *   		}]
 *   	}
 *   }
 *
 * @apiErrorExample {json} Error-Response:
 *   { code: '0001', text: '客户订单号不能为空' }
 *
 */
// 路由信息查询（根据顺丰运单号）
sf.RouteService({tracking_number: '444010688260'}).then(function(result) {
	console.log(JSON.stringify(result))
}).catch(function(err) {
	console.log(err)
})
```
<div id="路由信息查询（根据客户订单号）"></div>
### 路由信息查询（根据客户订单号）

```js
/**
 * @apiDescription 路由信息查询（根据客户订单号）
 * @apiName RouteServiceByOrderId
 * @apiSuccessExample {json} Success-Response:
 *   {
 *   	"RouteResponse": {
 *   		"mailno": "444010688260",
 *   		"orderid": "0002",
 *   		"Route": [{
 *   			"remark": "顺丰速运 已收取快件（测试数据）",
 *   			"accept_time": "2018-05-01 08:01:44",
 *   			"accept_address": "广东省深圳市软件产业基地",
 *   			"opcode": "50"
 *   		}, {
 *   			"remark": "已签收,感谢使用顺丰,期待再次为您服务（测试数据）",
 *   			"accept_time": "2018-05-02 12:01:44",
 *   			"accept_address": "广东省深圳市软件产业基地",
 *   			"opcode": "80"
 *   		}]
 *   	}
 *   }
 *
 * @apiErrorExample {json} Error-Response:
 *   { code: '0002', text: '顺丰运单号不能为空' }
 *
 */

sf.RouteServiceByOrderId('0002').then(function(result) {
	console.log(JSON.stringify(result))
}).catch(function(err) {
	console.log(err)
})
```
<div id="取消订单"></div>
### 取消订单

```js
/**
 * @apiDescription 订单取消
 * @apiName OrderConfirmService
 * @apiParam {String} orderid 客户订单号
 * @apiParam {Number} dealtype 客户订单操作标识：1：确认；2：取消
 * @apiSuccessExample {json} Success-Response:
 * {"OrderConfirmResponse":{"res_status":"2","orderid":"0002"}}
 *
 * @apiErrorExample {json} Error-Response:
 *   {"code":"8019","text":"订单已确认或已消单"}
 *
 */

sf.OrderConfirmService({
	orderid: '0002',
	dealtype: 2
}).then(function(result) {
	console.log(JSON.stringify(result))
}).catch(function(err) {
	console.log(err)
})
```
```js
/**
 * @apiDescription 取消订单
 * @apiName OrderConfirmServiceCancel
 * @apiParam {String} orderid 客户订单号
 * @apiSuccessExample {json} Success-Response:
 *   {"OrderConfirmResponse":{"res_status":"2","orderid":"0002"}}
 *
 * @apiErrorExample {json} Error-Response:
 *   { code: '0012', text: '参数错误:orderid=' }
 *
 */

sf.OrderConfirmServiceCancel('0002').then(function(result) {
	console.log(JSON.stringify(result))
}).catch(function(err) {
	console.log(err)
})
```
