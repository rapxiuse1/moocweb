<template>
   <div class="layout">
        <Layout :style="{minHeight:'100vh',background: '#F5F5F5'}">
          <m-header></m-header>
          <Content :style="{padding: 0, minHeight: '280px', width:'62.5%', background: '#fff'}">
            <div class="tips">
              <img class="problem" src="@/assets/ZXKS.png" alt="">
              <span class="text">在线考试</span>
            </div>
            <div class="staright"></div>
            <div class="menu">
              <Menu mode="horizontal" theme="dark" width="auto" @on-select="inPage" active-name="all">
                <MenuItem name="all">全部</MenuItem>
                <MenuItem :name="nav" v-for ="(nav,index) in oneList" :key="index">
                  {{nav.showname}}
                </MenuItem>
              </Menu>
            </div>
            <div class="content">
              <span class="type">类型:</span>
              <div class="menu2">
                <Menu mode="horizontal" theme="dark" width="auto">
                  <MenuItem :name="liv.id" v-for ="(liv,index) in twoList" :key="index">
                    {{liv.showname}}
                  </MenuItem>
                </Menu>
              </div> 
              <div class="resource-mod-bd">
                <div class="clearfix">
                  <a class="mock-jobs-item" v-for="(test,index) in testList" :key="index" @click="goExam(test)">
                    <img class="mock-jobs-img" src="@/assets/test.png" alt=""/>
                    <p class="mock-jobs-name">{{test.shortname}}</p>              
                  </a>                
                </div>                                
              </div>                  
            </div>
          </Content>
          <l-Modal ref="loginModal"></l-Modal> 
          <m-footer></m-footer>
        </Layout>
    </div>
</template>
<script>
import MHeader from '@/components/header/header.vue'
import MFooter from '@/components/footer/footer.vue'
import lModal from '@/components/login/modal.vue'
import ajax from '@/utils/ajax'
export default {
  data(){
    return{
      oneList:[],
      twoList:[],
      testList:[],
      modalShow:false,
    }
  },
  created(){
    this.getData()
	},
  methods:{
    getData(){
      //试卷列表信息
      // let bean = {
      //   name: "adt_exam_info"
      // }
      // let name = "adt_web_beanSearch";
      // let data = ajax(name,bean)
      // console.log(data)
      // this.testList = data.result.result
      // console.log(this.testList)

      //试卷一级分类
      let name = "adt_web_getAllPaperCategory"
      let bean = {
      }
      let data = ajax(name,bean)
      this.oneList = data.result
      console.log(this.oneList)
      //this.activeName = this.oneList[0].showname
      //试卷二级分类
      //this.twoList = this.oneList[0].childlist
      // let name1 = "adt_web_getPaperCategory"
      // let bean1 = {

      // }
      // let data1 = ajax(name1,bean1)
      // this.twoList = data1.result
      // this.activeName1 = this.twoList[0].showname

      //考试三级分类



      //试卷列表
      let name3 = "adt_web_getPaperList"
      let bean3 = {
        'shortname':''
      }
      let data3 = ajax(name3,bean3)
      this.testList = data3.result
      console.log(this.testList)
    },
    inPage(nav){
      console.log(nav)
      if(nav == "all"){
        this.twoList = null
      }else{
        
      }
    },
    goExam(test){
      let userName = sessionStorage.getItem("userName")
      console.log(userName)
      if(userName == null){
        this.$refs.loginModal.show()
        return
      }
      let testId = test.id
      this.$router.push({path:'/testDetail',query:{examId:testId}})
    }
  },
  components:{
    MFooter,
    MHeader,
    lModal,
  }
}
</script>
<style scoped>
.layout{
  border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout-content{
  margin: 2% 18%;
  border-radius:5px;
}
.menu{
  background:rgba(255,255,255,1);
  opacity:1;
  margin-top: 3%;
  margin-left: 24px;
  border-bottom:2px solid rgba(50,135,255,1);
}
.menu .ivu-menu{
  background:rgba(255,255,255,1);
  height: 32px;
  z-index: 99;
}
.menu .ivu-menu .ivu-menu-item{
  color: rgba(51, 51, 51, 1);
  font-size:16px;
  font-weight:400;
  line-height:33px;
  font-family:Microsoft YaHei;
  text-align: center;
  opacity:1;
}
.menu .ivu-menu .ivu-menu-item-active,.menu .ivu-menu .ivu-menu-item:hover{
  color: rgba(50, 135, 255, 1);
}
.menu .ivu-menu .ivu-menu-item-selected{
  background: rgba(50, 135, 255, 1);
  color:rgba(255,255,255,1);
}
.menu .ivu-menu .ivu-menu-item-selected:hover{
  color: rgba(255,255,255,1);
}
.tips{
  margin-top: 18px;
  margin-left: 24px;
}
.staright{
  width: 100%;
  margin-top: 2%;
  height:0px;
  border:1px solid rgba(238,238,238,1);
}
.problem{
  width: 18px;
  height: 18px;
  padding-top: 1px;
  vertical-align: middle;
}
.content{
  margin-left: 24px;
}
.text{
  width:64px;
  height:21px;
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:21px;
  color:rgba(102,102,102,1);
  vertical-align: middle;
  opacity:1;
}
.type{
  width:36px;
  height:24px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:24px;
  color:rgba(153,153,153,1);
  opacity:1;
  vertical-align: bottom;
  display: inline-block;
  margin-bottom: 15px;
}
.menu2{
  display: inline-block;
  background:rgba(255,255,255,1);
  opacity:1;
  vertical-align: middle;
  margin-top: 15px;
  margin-bottom: 15px;
}
.menu2 .ivu-menu{
  background:rgba(255,255,255,1);
  height: 24px;
}
.menu2 .ivu-menu .ivu-menu-item{
  color: rgba(51, 51, 51, 1);
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:24px;
  opacity:1;
}
.menu2 .ivu-menu .ivu-menu-item-selected{
  color:#3287FF;
}
.menu2 .ivu-menu .ivu-menu-item-active,.menu2 .ivu-menu .ivu-menu-item:hover{
  color: rgba(50, 135, 255, 1);
}
.resource-mod-bd {
  padding: 0 30px;
}
.clearfix {
  display: block;
  zoom: 1;
}
.mock-jobs-item {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  text-align: center;
  width: 21%;
  height: 180px;
  margin-right: 3%;
  margin-bottom: 6%;
  background:rgba(255,255,255,1);
  border:1px solid rgba(217,217,217,1);
  opacity:1;
  border-radius:5px;
}
.mock-jobs-item:hover {
  box-shadow: 0 2px 6px #25BB9B;
}
.mock-jobs-name {
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  max-width: 10em;
  font-size: 14px;
  margin-top: 188px;
}
.mock-jobs-img {
  max-width:150px;
  max-height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -75px;
  margin-top: -75px;
}
</style>