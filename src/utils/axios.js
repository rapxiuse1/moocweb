import axios1 from 'axios'
export default function axios (name,bean){
  let param = {};
  param.name= name;
  param.bean= bean;
  let result= null;
  let indexUrl = "/MCA/restservices/McaWeb/webMain/query"
  let data = {bean: JSON.stringify(param)}
  return new Promise((resolve,reject) =>{
    axios1.post(indexUrl,data).then(response =>{
      resolve(response.data)
    }).catch(function (error){
      reject(error)
    })
  })
}