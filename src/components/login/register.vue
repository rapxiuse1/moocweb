<template>
    <div class="login">
        <div class="from-wrap">
            <h2>注册</h2>
            <Form ref="loginData" :model="loginData"  :label-width="100">
                <FormItem label="用户名" prop="acct">
                    <Input type="text" v-model="loginData.acct" placeholder="请输入您的用户名"></Input>
                </FormItem>
                <FormItem label="密码" prop="pass">
                    <Input type="password" v-model="loginData.pass" placeholder="请输入您的密码"></Input>
                </FormItem>
                <FormItem label="密码" prop="pass2">
                    <Input type="password" v-model="loginData.pass2" placeholder="请再次输入密码"></Input>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input type="text" v-model="loginData.phone" placeholder="请输入您的手机号"></Input>
                </FormItem>
                <FormItem label="证件号" prop="cardno">
                    <Input type="text" v-model="loginData.cardno" placeholder="请输入您的证件号"></Input>
                </FormItem>
                <FormItem class="form-footer">
                    <Button type="primary" @click="handleSubmit('loginData')">注册</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import $ from 'jQuery'
import ajax from '@/utils/ajax'
export default {
    data () {
    return {
      loginData: {
        acct:'',
        pass:'',
        pass2:'',
        phone:'',
        cardno:'',
      },
      resultdesc:'',
    }
  },

  mounted() {
    //let basePath = "http://203.91.37.111/TWO"
    let basePath = location.origin + "/" + location.pathname.split("/")[1]+'/' //打包用
    this.login = new Login({
        check: false, 
        basePath: basePath, 
        dealResult: false
    });
    console.log(this.login)
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
      console.log(data)
      if(data.result == true){
        this.$Message.info('注册成功！') 
        this.$router.push('login') 
      }else{
        this.$Message.info(data.resultdesc)
      }
    }, 
    handleSubmit (name) {
      console.log(this.loginData.phone)
      let a = this.login.bindRegiste({
        username: this.loginData.acct,
        pwd: this.loginData.pass,
        pwd2: this.loginData.pass2,
        phone: this.loginData.phone,
        cardno: this.loginData.cardno,
      })
    },
  }
}

</script>

<style scoped>
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
    width: 500px;
    height: 400px;
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
</style>