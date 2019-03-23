const SF = require('../lib');
module.exports = SF
/**
 * @apiDescription 创建SF
 * @apiName new SF
 *
 * @apiParam {String} clientCode 客户编码
 * @apiParam {String} checkWord 校验码
 * @apiParam {String} [url=http://bsp-oisp.sf-express.com/bsp-oisp/sfexpressService] 调用地址
 * @type {SF}
 */
const sf = new SF({
	clientCode: 'DGM',
	checkWord: 'ceNuNyP3jZ3COOm8Jh4oVQkuMNWcAhhG'
})

/**
 * @apiDescription 下单
 * @apiName OrderService
 * @apiSuccessExample {json} Success-Response:
 *   {
 *   	"OrderResponse": {
 *   		"filter_result": "2",
 *   		"destcode": "539",
 *   		"mailno": "444010688260",
 *   		"origincode": "532",
 *   		"orderid": "0002",
 *   		"rls_info": {
 *   			"rls_errormsg": "444010688260:",
 *   			"invoke_result": "OK",
 *   			"rls_code": "1000",
 *   			"rls_detail": {
 *   				"waybillNo": "444010688260",
 *   				"sourceCityCode": "532",
 *   				"destCityCode": "539",
 *   				"destDeptCode": "539AE",
 *   				"destTransferCode": "539W",
 *   				"destRouteLabel": "539AE",
 *   				"proName": "顺丰标快",
 *   				"cargoTypeCode": "C201",
 *   				"limitTypeCode": "T4",
 *   				"expressTypeCode": "B1",
 *   				"codingMapping": "21",
 *   				"xbFlag": "0",
 *   				"printFlag": "000000000",
 *   				"twoDimensionCode": "MMM={'k1':'539W','k2':'539AE','k3':'','k4':'T4','k5':'444010688260','k6':'','k7':'36f4e170'}",
 *   				"proCode": "T4",
 *   				"printIcon": "00000000"
 *   			}
 *   		}
 *   	}
 *   }
 *
 * @apiErrorExample {json} Error-Response:
 *   { code: '8119', text: '月结卡号不存在或已失效' }
 */

//// 下单
// const createOrderOpts = {
// 	"orderid": "0002",
// 	"express_type": "1",
// 	"j_company": "西瓜の公司",
// 	"j_contact": "大西瓜",
// 	"j_tel": "15842345665",
// 	"j_province": "山东省",
// 	"j_city": "青岛市",
// 	"j_qu": "崂山区",
// 	"j_address": "丽达广场对面",
// 	"d_company": "菠萝の公司",
// 	"d_contact": "大菠萝",
// 	"d_tel": "15544456578",
// 	"d_province": "山东省",
// 	"d_city": "临沂市",
// 	"d_qu": "兰山区",
// 	"d_address": "金雀山路齐鲁大厦",
// 	"pay_method": "1",
// 	"custid": "7551234567",
// 	"daishou": "0",
// 	"things": "小笼包",
// 	"things_num": "1",
// 	"remark": "精密仪器，小心轻拿轻放~",
// }
// sf.OrderService(createOrderOpts).then(function(result) {
// 	console.log(JSON.stringify(result))
// }).catch(function(err) {
// 	console.log(err)
// })

/**
 * @apiDescription 订单过滤
 * @apiName OrderFilterService
 * @apiSuccessExample {json} Success-Response:
 *   {"OrderFilterResponse":{"filter_result":"1","orderid":"0002"}}
 *
 * @apiErrorExample {json} Error-Response:
 *   {"code":"8028","text":"客户未配置此业务"}
 */

// // 订单过滤
// const filterOpts = {
//  "search_orderid":"0002",
//  "search_d_address":"金雀山路齐鲁大厦",
//  "search_d_tel":"15544456578",
//  "search_j_custid":"7551234567",
//  "search_j_address":"丽达广场对面",
//  "search_j_tel":"15842345665"
// }
// sf.OrderFilterService(filterOpts).then(function(result){
//  console.log(JSON.stringify(result))
// }).catch(function(err) {
//  console.log(err)
// })

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

// // 订单查询
// sf.OrderSearchService("0002").then(function(result) {
// 	console.log(JSON.stringify(result))
// }).catch(function(err) {
// 	console.log(err)
// })

/**
 * @apiDescription 路由信息查询（根据顺丰运单号）
 * @apiName RouteService
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

// // 路由信息查询（根据顺丰运单号）
// sf.RouteService('444010688260').then(function(result) {
// 	console.log(JSON.stringify(result))
// }).catch(function(err) {
// 	console.log(err)
// })

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

// 路由信息查询-根据客户订单号
sf.RouteServiceByOrderId('0002').then(function(result) {
	console.log(JSON.stringify(result))
}).catch(function(err) {
	console.log(err)
})
