const SF = require('../lib')
const assert = require('chai').assert
const sf = new SF({
  checkHeader: 'BSPdevelop',
  checkBody: 'j8DzkIFgmlomPt0aLuwU',
  url: 'http://bsp-ois.sit.sf-express.com:9080',
  port: 9080,
  path: '/bsp-ois/sfexpressService'
})

describe('createOrder', function(){
  it('Should format error when not have orderId', function(){
	const createOrderOpts = {
	  "express_type":"1",
  	  "j_company":"西瓜の公司",
  	  "j_contact":"大西瓜",
  	  "j_tel":"15842345665",
  	  "j_province":"山东省",
  	  "j_city":"青岛市",
  	  "j_qu":"崂山区",
  	  "j_address":"丽达广场对面",
  	  "d_company":"菠萝の公司",
  	  "d_contact":"大菠萝",
  	  "d_tel":"15544456578",
  	  "d_province":"山东省",
  	  "d_city":"临沂市",
  	  "d_qu":"兰山区",
  	  "d_address":"金雀山路齐鲁大厦",
  	  "pay_method":"1",
  	  "custid":"5322059827",
  	  "daishou":"0",
  	  "things":"小笼包",
  	  "things_num":"1",
  	  "remark":"精密仪器，小心轻拿轻放~",
	}
	sf.OrderService(createOrderOpts).then(function(result){
	  assert.isNotOk('')
	}).catch(function(err){
	  assert.isOk('')
	})
  })
})
