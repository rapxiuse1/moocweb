import $ from 'jQuery'
export default function ajax (name, bean, callback) {
  var param = {};
	param.name = name;
	param.bean = bean;
  let result = null;
	//let baseUrl = 'http://203.91.37.111/TWO/restservices/TwoWeb/adt_restMain/query' //本地用
	let baseUrl = 'http://192.168.0.166:8088/TWO/restservices/TwoWeb/adt_restMain/query'//许凤
	//let baseUrl = 'http://192.168.0.151:8080/TWO/restservices/TwoWeb/adt_restMain/query'//汪洋
	//? wolet baseUrl = location.origin + "/" + location.pathname.split("/")[1] + '/restservices/Web/adt_webMain/query'//打包用
	if (typeof leapclient == "object") {
		//平台Net.js封装请求
		result = leapclient.request( "adt_webMain", {bean: param}, null, null, "web", "web")
	}else {
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
	}
	if (callback) {
		callback(result)
		return;
	}
	return result;
}
