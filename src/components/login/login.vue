<template>
  <div class="login">
    <div class="box">
      <div class="from-wrap">
        <div class="top">
          <img class="logo" src="@/assets/logo1.png" alt="">
        </div>
        <div class="text">
          <Tabs>
            <TabPane label="登录" name="login">
              <Form ref="loginData1" :model="loginData1" :label-width="60">
                <FormItem label="用户名" prop="acct">
                    <Input type="text" v-model="loginData1.acct" placeholder="请输入账号" style="width: 260px"></Input>
                </FormItem>
                <FormItem label="密 码" prop="pass" class="kg">
                    <Input type="password" v-model="loginData1.pass" placeholder="请输入密码" style="width: 260px"></Input>
                </FormItem>
                <FormItem label="验证码" prop="code">
                    <Input type="text" v-model="loginData1.code" placeholder="验证码" style="width: 150px"></Input>
                    <img class="code" id="img_code2">
                </FormItem>
              </Form>
                <div class="control">
                  <div class="control-a">
                    <a @click="findpwd">找回密码</a>
                    <div class="line"></div>
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
              <FormItem label="密 码" prop="pass" class="kg">
                  <Input type="password" v-model="loginData2.pass" placeholder="请输入您的密码" style="width: 260px"></Input>
              </FormItem>
              <FormItem label="密 码" prop="pass2" class="kg">
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
          if(data.result){
            sessionStorage.setItem("userId",data.result.id)
          }
          vm.resultdesc = data.resultdesc
          vm.alert(data)
      })
    })
  }, 
  methods: {
    alert(data) {
      if(data.result){
        console.log(data.resultdesc)
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
  height: 100vh;	
	margin: 0 auto;
	background-image: url(../../assets/bg.png);
	background-repeat: no-repeat;
	background-size: cover; 
	overflow: auto;
  position: relative;
}
.box{
  width: 32%;
  background:rgba(255,255,255,0.3);
  border-radius:10px;
  position: absolute;
  left: 60%;
  top: 50%;
  margin-top: -15%;
}
.from-wrap{
  position: relative;
  width: 93%;
  background:rgba(255,255,255,1);
  border-radius:10px;
  opacity: 1;
  margin: 3% 3%;
  padding-bottom: 40px;
}
.top{
  height: 139px;
  position: relative;
}
.logo{
  max-width: 100%;
	max-height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 7%;
}
.text{
  margin-left: 10%;
}
.text .ivu-tabs .ivu-tabs-nav .ivu-tabs-tab{
  width:40px;
  height:20px;
  font-size:20px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.text .ivu-tabs-nav-container:focus .ivu-tabs-tab-focused{
  font-weight: bold;
}
.kg{
  letter-spacing: 3.5px
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
  width: 100px;
  height: 31px;
  position: absolute;
  border-radius: 2px;
  padding-top: 3px;
  margin-left:10px;
}
.control{
  height: 60px;
  margin-top: -18px;
}
.control-a{
  float: right;
  margin-right: 129px;
}
.line{
  margin: -2px 3px;
  background: #2d8cf0;
  width: 1px;
  height: 14px;
  display: inline-block;
  } 
.privacy_tip{
  font-size: 12px;
  color: #717a84;
  text-align: center;
  margin-top: 20px;
  margin-left: -10%;
}
.privacy_tip a:visited {
  font-size: 12px;
  color: #37f;
}
.form-footer{
  display: block;
  height: 50px;
  width: 70%;
  margin:0 auto;
  margin-left: 10%;
  border-radius:24px;
}
</style>