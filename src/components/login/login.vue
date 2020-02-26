<template>
    <div class="login">
        <div class="from-wrap">
            <!-- <h2>登录</h2>
            <Form ref="loginData" :model="loginData" :label-width="100">
                <FormItem label="用户名" prop="acct">
                    <Input type="text" v-model="loginData.acct" placeholder="请输入账号"></Input>
                </FormItem>
                <FormItem label="密码" prop="pass">
                    <Input type="password" v-model="loginData.pass" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="验证码" prop="code">
                    <Input type="text" v-model="loginData.code" placeholder="请输入验证码"></Input>
                </FormItem>
                <FormItem class="form-footer">
                    <Button type="primary" @click="handleSubmit('loginData')">登录</Button>
                    <Button type="primary" @click="handleReset('loginData')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form> -->
        <Tabs>
          <TabPane label="登录" name="login">
            <Form ref="loginData1" :model="loginData1" :label-width="60">
                <FormItem label="用户名" prop="acct">
                    <Input type="text" v-model="loginData1.acct" placeholder="请输入账号" style="width: 260px"></Input>
                </FormItem>
                <FormItem label="密码" prop="pass">
                    <Input type="password" v-model="loginData1.pass" placeholder="请输入密码" style="width: 260px"></Input>
                </FormItem>
                <FormItem label="验证码" prop="code">
                    <Input type="text" v-model="loginData1.code" placeholder="验证码" style="width: 260px"></Input>
                    <div class="code">
                      <img id="img_code2" :style="{width:'80px',}">
                    </div>
                </FormItem>
            </Form>
                <div class="control">
                  <div class="control-a">
                    <a @click="findpwd">找回密码 | </a>
                    <a @click="handleReset('loginData1')">重置</a>
                  </div>
                </div>
                <Button class="form-footer" type="primary" long @click="handleSubmit('loginData1')">登录</Button>
                <div class="privacy_tip">
                  登录即同意
                  <a @click="privacy">使用协议</a>
                </div>
          </TabPane>
          <TabPane label="注册" name="register">
            <Form ref="loginData2" :model="loginData2"  :label-width="60">
              <FormItem label="用户名" prop="acct">
                  <Input type="text" v-model="loginData2.acct" placeholder="请输入您的用户名" style="width: 260px"></Input>
              </FormItem>
              <FormItem label="密码" prop="pass">
                  <Input type="password" v-model="loginData2.pass" placeholder="请输入您的密码" style="width: 260px"></Input>
              </FormItem>
              <FormItem label="密码" prop="pass2">
                  <Input type="password" v-model="loginData2.pass2" placeholder="请再次输入密码" style="width: 260px"></Input>
              </FormItem>
              <FormItem label="手机号" prop="phone">
                  <Input type="text" v-model="loginData2.phone" placeholder="请输入您的手机号" style="width: 260px"></Input>
              </FormItem>
              <FormItem label="证件号" prop="cardno">
                  <Input type="text" v-model="loginData2.cardno" placeholder="请输入您的证件号" style="width: 260px"></Input>
              </FormItem>
            </Form>
              <Button class="form-footer" type="primary" long @click="handleSubmit('loginData2')">注册</Button>
          </TabPane>
        </Tabs>
        </div>
    </div>
</template>

<script>
import ajax from '@/utils/ajax'
export default {
  data () {
    return {
      loginData1: {
        acct:'',
        pass:'',
        code:'',
      },
      loginData2: {
        acct:'',
        pass:'',
        pass2:'',
        phone:'',
        cardno:'',
      },
      resultdesc:'',
      b:'',//注册判断
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
          console.log(data)
          console.log(data.result.id)
          sessionStorage.setItem("userId",data.result.id)
          vm.resultdesc = data.resultdesc
          vm.alert(data)
      })
    })
  }, 
  methods: {
    alert(data) {
      if(data.result){
        console.log(this.b)
        if(this.b == 'registe'){
          this.$Message.info(data.resultdesc)
          return
        }
        sessionStorage.setItem("userName",data.result.username)
        let name ='adt_web_userInfo'
        let data1 = ajax(name)
        console.log(data1)
        this.$Message.info(data.resultdesc)
        if(this.$route.query.redirect){//判断是否有即将跳转路由
          let redirect = this.$route.query.redirect;
          this.$router.push(redirect);
        }else{
          this.$router.push('/');
        }
        //this.$router.push('knowledge')
      }else{
        this.$Message.info(data.resultdesc)
      }
    }, 
    handleSubmit (name) {
      if(name == "loginData1"){
        this.b = '';
        let a = this.login.bindLogin({
          username: this.loginData1.acct,
          pwd: this.loginData1.pass,
          code: this.loginData1.code,
        })
      }else if(name == "loginData2"){
        this.b = 'registe';
        let a = this.login.bindRegiste({
          username: this.loginData2.acct,
          pwd: this.loginData2.pass,
          pwd2: this.loginData2.pass2,
          phone: this.loginData2.phone,
          cardno: this.loginData2.cardno,
        })
      }
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    findpwd(){
      this.$router.push('findpwd')
    },
    privacy(){
      this.$router.push('privacy')
    },
  }
}
</script>

<style scoped>
.login {
    width: 100%;
    height: 800px;
    background-color: #515A6E;
    position: relative;
}
.login .from-wrap{
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -150px;
    width: 470px;
    height: 420px;
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
.ivu-form-item-required .ivu-form-item-label:before {
    display: none;
}
a{
  left:10px;
}
.code {
  width: 83px;
  height: 27px;
  border: 1px solid #ccc;
  float: right;
  border-radius: 2px;
  margin-top:3px;
}
.control{
  height: 60px;
  margin-top: -18px;
}
.control-a{
  float: right;
  margin-right: 90px;
}
.privacy_tip{
  font-size: 12px;
  color: #717a84;
  text-align: center;
  margin-top: 20px;
}
.privacy_tip a:visited {
  font-size: 12px;
  color: #37f;
}
.form-footer{
  display: block;
  height: 40px;
  width: 300px;
  margin:0 auto;
  border-radius:24px;
}
</style>