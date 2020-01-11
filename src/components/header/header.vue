<template>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="knowledge" @on-select="turnToPage">
        <div class="layout-logo">
          <img src="@/assets/logo.png" alt="">
        </div>
        <div class="layout-nav">
            <MenuItem name="knowledge">
                <Icon type="ios-navigate"></Icon>
                常见问题
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-keypad"></Icon>
                在线考试
            </MenuItem>
            <MenuItem name="3">
                <Icon type="ios-analytics"></Icon>
                问卷调查
            </MenuItem>
            <MenuItem name="4">
                <Icon type="ios-paper"></Icon>
                意见反馈
            </MenuItem>
        </div>
        <div class="login">
            <MenuItem name="register">
                <Icon type="ios-navigate"></Icon>
                注册
            </MenuItem>
             <MenuItem name="login">
                <Icon type="ios-navigate"></Icon>
                登录
            </MenuItem>
        </div>
     </Menu>
     <Modal v-model="modalShow" width="450" footer-hide>
      <div class="login-main">
        <Tabs value="name1">
          <TabPane label="登录" name="name1">
            <Form ref="loginData1" :model="loginData1" :label-width="60">
                <FormItem label="用户名" prop="acct">
                    <Input type="text" v-model="loginData1.acct" placeholder="请输入账号" style="width: 260px"></Input>
                </FormItem>
                <FormItem label="密码" prop="pass">
                    <Input type="password" v-model="loginData1.pass" placeholder="请输入密码" style="width: 260px"></Input>
                </FormItem>
                <FormItem label="验证码" prop="code">
                    <Input type="text" v-model="loginData1.code" placeholder="验证码" style="width: 260px"></Input>
                    <img id="img_code2" :style="{width:'80px',}">
                </FormItem>
            </Form>
                <div class="control">
                  <div class="control-a">
                    <a @click="findpwd">找回密码 | </a>
                    <a @click="handleReset('loginData1')">重置</a>
                  </div>
                </div>
                <Button class="form-footer" type="primary" long @click="handleSubmit('loginData1')">登录</Button>
          </TabPane>
          <TabPane label="注册" name="name2">
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
     </Modal>
    </Header>
</template>

<script>
import ajax from '@/utils/ajax'
export default {
  data(){
    return{
      modalShow:false,
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
    }
  },
  methods:{
    turnToPage(name){
      if(name == "register"||"login"){
        let basePath = "http://203.91.37.111/TWO"
        //let basePath = location.origin + "/" + location.pathname.split("/")[1]+'/' //打包用
        this.login = new Login({
          check: false, 
          basePath: basePath, 
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
        this.modalShow = !this.modalShow
        return
      }
      this.$router.push({ path: name });
    },
    alert(data) {
      console.log(data.result)
      if(data.result == true){
        this.$router.push('knowledge')
      }else{
        this.$Message.info(data.resultdesc)
      }
    }, 
    handleSubmit (name) {
      if(name == "loginData1"){
        let a = this.login.bindLogin({
          username: this.loginData1.acct,
          pwd: this.loginData1.pass,
          code: this.loginData1.code,
        })
      }else if(name == "loginData2"){
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
    }
  }
}
</script>

<style  scoped>
.layout-logo{
  width: 105px;
  height: 38px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 12px;
  left: 20px;
}
.layout-nav{
  width: 700px;
  margin: 0 auto;
  margin-left: 150px;
}
.login{
  width: 310px;
  margin: 0 auto;
  margin-right: 0;
}
.control{
  height: 100px;
}
.control-a{
  float: right;
  margin-right: 90px;
}
.form-footer{
  display: block;
  height: 40px;
  width: 300px;
  margin:0 auto;
  border-radius:24px;
}
</style>