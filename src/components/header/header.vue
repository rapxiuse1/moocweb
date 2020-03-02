<template>
    <Header>
        <div class="layout-logo">
          <img src="@/assets/logo.png" alt="">
        </div>
        <div class="layout-nav">
          <Menu mode="horizontal" theme="dark" :active-name="$route.name" @on-select="turnToPage">
            <MenuItem name="knowledge">
                常见问题
            </MenuItem>
            <MenuItem name="onlinetest">
                在线考试
            </MenuItem>
            <MenuItem name="questionList">
                问卷调查
            </MenuItem>
            <MenuItem name="feedBack">
                意见反馈
            </MenuItem>
          </Menu>          
        </div> 
        <div class="layout-login">
          <Menu mode="horizontal" theme="dark" :active-name="$route.name" @on-select="turnToPage">
            <MenuItem name="logout">
            <Icon type="ios-contact" />
                登出
            </MenuItem>
          </Menu>
        </div>    
     <!-- <Modal v-model="modalShow" width="450" footer-hide>
      <div class="login-main">
        <Tabs :value="loginreg">
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
     </Modal> -->
     <Modal v-model="outShow" width="330" @on-ok="ok" @on-cancel="cancel">
       <p>确定退出登录吗?</p>
     </Modal>
    </Header>
</template>

<script>
import ajax from '@/utils/ajax'
export default {
  data(){
    return{
      modalShow:false,
      outShow:false,
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
      loginreg:'',
    }
  },
  methods:{
    turnToPage(name){
      console.log(name)
      if(name == "register"|| name == "login"){
        this.loginreg = name
        console.log(this.loginreg)
        console.log(this.global_.loginUrl)
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
        this.modalShow = !this.modalShow
        return
      }else if(name == 'logout'){
        this.outShow = !this.outShow
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
    },
    privacy(){
      this.$router.push('privacy')
    },
    ok(){
      sessionStorage.removeItem("userName")
      sessionStorage.removeItem("userId")
      let name = 'adt_web_logout'
      let data = ajax(name)
      console.log(data)
      this.$router.push('login');
    },
    cancel(){
      console.log('点击关闭')
    }
  }
}
</script>

<style scoped>
.ivu-layout-header{
  display: flex;
}
.ivu-layout-header,.ivu-menu{
  background: #2b303b;
  height: 64px;
  line-height: 64px;
}

.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active,.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover{
  color: #fff;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item{
  color: #d9d9d9;
}
.layout-logo{
  width: 144px;
  height: 35px;
  background: #2b303b;
  border-radius: 3px;
  margin: 15px 0 14px 216px;
}
.layout-nav{
  flex: 1;
  height: 64px;
  line-height: 64px;
  margin: 0 auto;
  margin-left: 243px;
  border-bottom:2px solid #2b303b;
}
.layout-login{
  margin-right: 100px;
  width: 100px;
}

</style>