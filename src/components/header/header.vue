<template>
  <Header>
    <div class="layout-logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="layout-nav ">
      <Menu mode="horizontal" theme="dark" :active-name="$route.name" @on-select="turnToPage" >
        <MenuItem name="home">
          首页
        </MenuItem>
        <MenuItem name="knowledge" @mouseenter.native="onMouseOver" @mouseleave.native="onMouseout">
          常见问题
          <div class="hoverCon" v-show="seen">
            <ul class="ul">
              <li>
                <a v-for ="(nav,index) in hoverList" :key="index">{{nav.name}}</a>
              </li>
            </ul>
          </div>
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
    <div class="layout-search">
      <input class="search" type="text" placeholder="请输入搜索的内容">
      <img class="searchIcon" src="@/assets/search.png" alt=""/>
    </div>
    <div class="layout-login ">
      <ul class="login">
        <li class="left" @mouseenter="onphoneOver" @mouseleave="onphoneout">
          <div style="margin-top:20px">
            <img class="phone"  alt="">
            <span class="title">小程序</span>
            <div class="hoverCon1" v-show="phoneSeen">
              <div class="QR">
                <img src="@/assets/QR.png" alt="">
              </div>
            </div>
          </div>
          
        </li>
        <li class="right" v-if="loginSeen" >
          <a @click="goLogin()" style="margin-right:8px">登录</a>
          <a class="line1">|</a>
          <a @click="goLogin()" style="margin-left:16px">注册</a>
        </li>
        <div class="profile" v-if="profileSeen" @mouseenter="onProfileOver" @mouseleave="onProfileout">
           <img src="@/assets/profile.png" alt="">
           <div class="hoverCon2" v-show="detailseen">
            <ul class="ul">
              <li>
                <a class="firsta" @click="goDetails">个人信息</a>
              </li>
              <li>
                <a>我参与的</a>
              </li>
              <li>
                <a>常见问题</a>
              </li>
              <li>
                <a @click="loginOut">退出登录</a>
              </li>
            </ul>
           </div>
        </div>
      </ul>
    </div>
    <Modal v-model="outShow" width="330" @on-ok="ok" @on-cancel="cancel">
      <p>确定退出登录吗?</p>
    </Modal>
    <l-Modal ref="loginModal"></l-Modal>    
  </Header>
</template>

<script>
import ajax from '@/utils/ajax'
import lModal from '@/components/login/modal.vue'
export default {
  data(){
    return{
      seen:false,
      phoneSeen:false,
      loginSeen:true,
      profileSeen:false,
      detailseen:false,
      outShow:false,
      userName:'',
      referUserName:'',
      hoverList:[],
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
      b:'',//注册判断
    }
  },
  created(){
    this.getKnowledge()
    this.initUser()
  },
  mounted(){
    this.getUser()
  },
  methods:{
    turnToPage(name){
      console.log(name)
      this.$router.push({ path: name });
    },
    goLogin(){
      this.$refs.loginModal.show()
    },
    loginOut(){
      this.outShow = !this.outShow
      return
    },
    ok(){
      sessionStorage.removeItem("userName")
      this.loginSeen = true
      this.profileSeen = false
      // let name = 'adt_web_logout'
      // let data = ajax(name)
      // console.log(data)
    },
    cancel(){
      console.log('点击关闭')
    },
    getKnowledge(){
      let name = 'adt_web_getZSKFL'
      this.hoverList = ajax(name).result
    },
    onMouseOver(){
      this.seen = true
    },
    onMouseout(){
      this.seen = false
    },
    onphoneOver(){
      this.phoneSeen = true
    },
    onphoneout(){
      this.phoneSeen = false
    },
    onProfileOver(){
      this.detailseen = true
    },
    onProfileout(){
      this.detailseen = false
    },
    initUser(){
      this.userName = sessionStorage.getItem("userName")
    },
    getUser(){
      this.referUserName = setInterval(() => {
        this.userName = sessionStorage.getItem("userName")
      },500)
      
    },
    goDetails(){
      this.$router.push('personDetails')
    }
  },
  components:{
    lModal,
  },
  watch:{
    userName(newuserName,olduserName){
      console.log(newuserName)
      if(newuserName){
        this.loginSeen = false
        this.profileSeen = true
        window.clearInterval(this.referUserName)
      }else{
        this.loginSeen = true
        this.profileSeen = false
      }
    }
  },
}
</script>

<style scoped>
.ivu-layout-header{
  width: 100%;
  height: auto;
  line-height: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  position: relative;
}
.ivu-layout-header,.ivu-menu{
  background: #2b303b;
}
.ivu-menu-dark.ivu-menu-horizontal{
  height: 64px;
  line-height: 64px;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item a:active{
  color: #fff;
}
.ivu-menu-item-selected{
  font-weight:bold;
  color: #3287FF;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover{
  background:rgba(245,250,255,1);
  color:rgba(50,135,255,1);
  border-bottom:2px solid rgba(245,250,255,1);
  font-family:Microsoft YaHei;
  font-weight:bold;
}
.layout-logo{
  background: #2b303b;
  border-radius: 3px;
  max-width: 100%;
  max-height: 100%;
}
.layout-logo img{
  margin-top: 15px;
}
.layout-nav{
  position: relative;
  margin-left: 2%;
  text-align: center;
  background: #2b303b;
}
.layout-search{
  margin-left: 1%;
  margin-top: 15px;
}
.hoverCon{
  width:88px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 4px rgba(0,0,0,0.16);
  position: fixed;
  top: 66px;
  margin-left: -16px;
  z-index: 999;
  opacity:1;
}
.hoverCon1{
  width:88px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 4px rgba(0,0,0,0.16);
  position: fixed;
  top: 66px;
  margin-left: -10px;
  z-index: 999;
  opacity:1;
}
.hoverCon2{
  width:88px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 4px rgba(0,0,0,0.16);
  position: fixed;
  top: 66px;
  margin-left: -10px;
  z-index: 999;
  opacity:1;
}
.hoverCon li a:first-child:before,.firsta:before,.hoverCon1 .QR:before {
  content: " ";
  font-size: 0;
  line-height: 0;
  margin: 0 auto;/*居中*/
  display: block;/*独占一行*/
  box-shadow:0px 0px 4px rgba(0,0,0,0.16) ; /*配合整体一样的投影*/
  width: 10px;
  height: 10px;
  background:rgba(255,255,255,1);
  -webkit-transform: rotate(45deg); 
  transform: rotate(45deg); /*一个正方形倾斜四十五度就是三角了但是要把下半部分藏起来*/
  position: relative;
  top: -5px; /*果断的露出上半部分*/
  z-index: 1; /*果断的隐藏下半部分*/
  -webkit-transition: all .2s ease-in;
  transition: all .2s ease-in;
}
.hoverCon1 .QR{

}
.ul li{
  list-style: none;
  opacity:1;
}
.ul li a{
  background-color: #fff;
  color:rgba(51,51,51,1);
  font-size:12px;
  z-index: 2;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:32px;
  text-align: center;
  display: block;
  position: relative;
  -webkit-transition: all .2s ease-in;
  transition: all .2s ease-in;
}
.ul li a:after{
  margin-left: 5px;
  margin-right: 5px;
  content: "";
  display: block;
  height: 1px;
  left: 0;
  background:rgba(238,238,238,1);
}
.hoverCon2 .ul li a{
  background-color: #fff;
  color:rgba(51,51,51,1);
  font-size:12px;
  z-index: 2;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:32px;
  text-align: center;
  display: block;
  position: relative;
  -webkit-transition: all .2s ease-in;
  transition: all .2s ease-in;
}
.search{
  width: 249px;
  height:33px;
  border:1px solid rgba(102,102,102,1);
  background:rgba(43,48,59,1);
  box-shadow:0px 4px 4px rgba(0,0,0,0.1);
  opacity:1;
  border-radius:3px;
  font-size:11px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:14px;
  color:rgba(153,153,153,1);
  vertical-align: middle;
}
.searchIcon{
  width: 22px;
  height: 23px;
  vertical-align: middle;
  margin-left: -33px;
  margin-top: -2px;
}
input::-webkit-input-placeholder {
  left: 8px;
  position: relative;
}
.layout-login{
  margin-left: 3%;
}
.login{
  position: relative;
}
.login li {
  list-style: none;
}
.phone{
  vertical-align: middle;
  margin-right: 8px;
  width: 14px;
  height: 20px;
  background-image: url("../../assets/phone.png");
}
.title{
  width:48px;
  height:21px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:21px;
  color:rgba(217,217,217,1);
  opacity:1;
}
.left{
  float: left;
  padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 2px;
  height: 66px;
  position: relative;
}
.left:hover {
  background:rgba(245,250,255,1);
  font-family:Microsoft YaHei;
  font-weight:bold;
}
.left:hover .phone{
  vertical-align: middle;
  margin-right: 8px;
  width: 14px;
  height: 20px;
  background-image: url("../../assets/phone2.png");
}
.left:hover .title{
  color:rgba(50,135,255,1);
  font-weight:400;
}
.right{
  float: left;
  position: relative;
  margin-left: 23px;
  margin-top: 20px;
}
.login li a{
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:21px;
  color:rgba(217,217,217,1);
  opacity:1;
}
.line1{
  position: absolute;
  top: -0.5px;
}
.profile{
  display: inline-block;
  position: absolute;
  margin-left: 20px;
}
.profile img{
  margin-top: 5px;
  width:56px;
  height:56px;
  background:rgba(187,215,255,0.99);
  border-radius:50%;
  opacity:1;
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
.bottom{
  text-align: center;
}
</style>
