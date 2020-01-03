import $ from 'jQuery'
export default function ajax (name, bean) {
    var param = {};
	param.name = name;
	param.bean = bean;
    var result = null;
    let baseUrl = 'http://203.91.37.111//TWO/restservices/web/adt_webMain/query'
	// if (typeof leapclient == "object") {
	// 	//平台Net.js封装请求
	// 	result = leapclient.request( "initSingle", {bean: param}, null, null, "web", "web")
	// }else {
	// 	if (!config.isNet) {
	// 		//使用ajax请求，数据加密
	// 		param.encrypt = true;
	// 		param.bean = encrypt_AES( param.bean);
	// 	}
		$.ajax({ 
			type: "post", 				 
			url: baseUrl,
			data: {bean:JSON.stringify(param)}, 
			async: false,
			dataType: "json",
			success: function(data){
                result = data;
			}
		});
	return result;
  }

