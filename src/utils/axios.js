import axios1 from 'axios'
export default function axios (name,bean){
  let param = {};
  param.name= name;
  param.bean= bean;
  let result= null;
  //let indexUrl = "/MCA/restservices/McaWeb/webMain/query"//本地用
  let indexUrl = location.origin + "/" + location.pathname.split("/")[1] + '/restservices/McaWeb/webMain/query'//打包用
  let data = {bean: JSON.stringify(param)}
  return new Promise((resolve,reject) =>{
    axios1.post(indexUrl,data).then(response =>{
      resolve(response.data)
    }).catch(function (error){
      reject(error)
    })
  })
}