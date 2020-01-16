import axios1 from 'axios'
export default function axios (name,bean){
  let param = {};
  param.name= name;
  param.bean= bean;
  let result= null;
  //let indexUrl = "/MCA/restservices/McaWeb/webMain/query"//本地用
  //let indexUrl = 'http://192.168.0.166/TWO/restservices/web/adt_webMain/query'
  let indexUrl = location.origin + "/" + location.pathname.split("/")[1] + 'TWO/restservices/web/adt_webMain/query'//打包用
  console.log(indexUrl)
  let data = {bean: JSON.stringify(param)}
  if (typeof leapclient == "object") {
		//平台Net.js封装请求
		result = leapclient.request( "adt_webMain", {bean: param}, null, null, "web", "web")
	}else{
    return new Promise((resolve,reject) =>{
      axios1.post(indexUrl,data).then((response) =>{
        console.log(response.data)
        resolve(response.data)
      }).catch(function (error){
        reject(error)
      })
    })
  }
}