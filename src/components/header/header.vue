<template>
  <Header>
    <div class="layout-logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="layout-nav">
      <Menu mode="horizontal" theme="dark" :active-name="$route.name" @on-select="turnToPage" >
        <MenuItem name="home">
          首页
        </MenuItem>
        <MenuItem name="knowledge" @mouseenter.native="onMouseOver" @mouseleave.native="onMouseout">
          常见问题
          <div class="hoverCon" v-show="seen">
            <div style="margin-top:16px;"   v-for ="(nav,index) in hoverList" :key="index">{{nav.name}}</div>
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
    <div class="layout-login">
      <div style="display: inline-block;">
        <input class="search" type="text" placeholder="请输入搜索的内容">
        <img class="searchIcon" src="@/assets/search.png" alt=""/>
      </div>
      <div class="left">
        <img class="phone" src="@/assets/phone.png" alt="">
        <span class="title">小程序</span>
      </div>
      <div class="right">
        <a @click="goLogin()">登录</a>
        <div class="line1"></div>
        <a>注册</a>
      </div>
    </div>
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
  },
  methods:{
    turnToPage(name){
      console.log(name)
      this.$router.push({ path: name });
    },
    goLogin(){
      this.$refs.loginModal.show()
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
    }
  },
  components:{
    lModal,
  }
}
</script>

<style scoped>
.ivu-layout-header{
  display: flex;
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
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover{
  background:rgba(245,250,255,1);
  color:rgba(50,135,255,1);
  font-family:Microsoft YaHei;
  font-weight:bold;
}
.layout-logo{
  background: #2b303b;
  border-radius: 3px;
  float: left;
  margin-left: 15%;
}
.layout-logo img{
  margin-top: 15px;
}
.layout-nav{
  margin-left: 1%;
  text-align: center;
  border-bottom:2px solid #2b303b;
  float: left;
  position: relative;
}
.hoverCon{
  width:88px;
  background:rgba(255,255,255,1);;
  position: absolute;
  top: 60px;
  right: 5px;
  font-size:12px;
  z-index: 999;
  text-align: center;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
  color:rgba(51,51,51,1);
  opacity:1;
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
  margin-top: -1px;
  margin-left: 40px;
  float: right;
}
.left{
  margin-left: 60px;
  display: inline-block;
}
.phone{
  vertical-align: middle;
  margin-right: 8px;
  width: 14px;
  height: 20px;
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
.right{
  display: inline-block;
  margin-left: 37px;
}
.right a{
  width:32px;
  height:21px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:21px;
  color:rgba(217,217,217,1);
  opacity:1;
}
.line1{
  margin: -2px 8px;
  background: rgba(217,217,217,1);
  width: 1px;
  height: 14px;
  display: inline-block;
} 

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
</style>