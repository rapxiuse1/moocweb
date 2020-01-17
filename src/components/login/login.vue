<template>
    <div class="login">
        <div class="from-wrap">
            <h2>登录</h2>
            <Form ref="loginData" :model="loginData" :label-width="100">
                <FormItem label="用户名" prop="acct">
                    <Input type="text" v-model="loginData.acct" placeholder="请输入账号"></Input>
                </FormItem>
                <FormItem label="密码" prop="pass">
                    <Input type="password" v-model="loginData.pass" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem class="form-footer">
                    <Button type="primary" @click="handleSubmit('loginData')">登录</Button>
                    <Button type="primary" @click="handleReset('loginData')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import ajax from '@/utils/ajax'
export default {
  data () {
    return {
      loginData: {
        acct:'',
        pass:'',
        code:'',
      },
      resultdesc:'',
    }
  },
  mounted() {
    this.login = new Login({
        check: false, 
        basePath: this.global_.loginUrl, 
        dealResult: false
    });
    console.log(this.login)
    this.login.setCode(document.getElementById("img_code2"));
    let vm = this
    this.login.request(function(method, param) {
      ajax(method, param, function(data) {
          console.log(data.resultdesc)
          vm.resultdesc = data.resultdesc
          vm.alert(data);
      })
    })
  }, 
  methods: {
    alert(data) {
      console.log(data.result.username)
      if(data.result){
        sessionStorage.setItem("userName",data.result.username)
        //this.$store.dispatch("setUser",data.result.username)
        //console.log(this.$store.state.isLogin)
        let name ='adt_web_userInfo'
        let data1 = ajax(name)
        console.log(data1)
        this.$router.push('knowledge')
      }else{
        this.$Message.info(data.resultdesc)
      }
    }, 
    handleSubmit (name) {
      console.log(this.loginData.acct)
      console.log(this.loginData.pass)
      console.log(this.resultdesc)
      let a = this.login.bindLogin({
        username: this.loginData.acct,
        pwd: this.loginData.pass,
        code: this.loginData.code,
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>

<style>
html,body {
    width: 100%;
    height: 100%;
    background-color: #515A6E;
}
.login {
    width: 100%;
    height: 100%;
    background-color: #515A6E;
    position: relative;
}
.login .from-wrap{
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -150px;
    width: 400px;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 30px;
}
.login h2 {
    text-align: center;
    margin-bottom: 20px;
}
.login FormItem {
    margin-bottom: 15px;
}
.login .form-footer {
    text-align: right;
}
.ivu-form-item-required .ivu-form-item-label:before {
    display: none;
}
a{
  left:10px;
}
</style>