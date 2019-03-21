// module.exports = require('./lib')
const SF = require('./lib')
module.exports = SF
const sf = new SF({
	checkHeader: 'RMWLKJ_8pPGs',
	checkBody: 'RMWLKJ_8pPGs', // j8DzkIFgmlomPt0aLuwU
	url: 'http://bsp-oisp.sf-express.com', // http://bsp-ois.sit.sf-express.com:9080
	path: '/bsp-oisp/sfexpressService'
})
//
//// 下单
const createOrderOpts = {
	"orderid": "0001",
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
	"custid": "5322059827",
	"daishou": "0",
	"things": "小笼包",
	"things_num": "1",
	"remark": "精密仪器，小心轻拿轻放~",
}
sf.OrderService(createOrderOpts).then(function(result) {
	console.log(result)
}).catch(function(err) {
	console.log(err)
})

//// 订单过滤
//const filterOpts = {
//  "search_orderid":"10004",
//  "search_d_address":"金雀山路齐鲁大厦",
//  "search_d_tel":"15544456578",
//  "search_j_custid":"5322059827",
//  "search_j_address":"丽达广场对面",
//  "search_j_tel":"15842345665"
//}
//sf.OrderFilterService(filterOpts).then(function(result){
//  console.log(result)
//}).catch(function(err) {
//  console.log(err)
//})


// // 订单查询
// sf.OrderSearchService(10001).then(function(result){
//   console.log(result)
// }).catch(function(err){
//   console.log(err)
// })

// // 路由信息查询
// sf.RouteService(444836769091).then(function(result){
//   console.log(result)
// }).catch(function(err) {
//   console.log(err)
// })
