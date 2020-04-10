<template>
   <div class="layout">
      <Layout :style="{minHeight:'100vh',background: '#F5F5F5'}">
          <m-header></m-header>
          <Content :style="{padding: 0, minHeight: '280px', width:'62.5%',background: '#fff'}">
            <div class="tips">
              <img class="problem" src="@/assets/WJDC.png" alt="">
              <span class="text">问卷调查</span>
            </div>
            <div class="staright"></div>
            <div class="content" style="margin-top:3%">
              <div class="resource-mod-bd">
                <div class="clearfix">
                  <a class="mock-jobs-item"  v-for="(test,index) in testList"  :key="index" @click="goSur(test)">
                    <img class="mock-jobs-img" src="@/assets/question.png" alt="">
                    <img class="mock-jobs-img1" src="@/assets/question1.png" alt="">
                    <p class="mock-jobs-name">{{test.asq_name}}</p>                
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
import ajax from '@/utils/ajax'
import lModal from '@/components/login/modal.vue'
export default {
  data(){
    return{
      testList:[],
    }
  },
  created(){
    this.getData()
	},
  methods:{
    getData(){
      let bean = {
        name: "adt_asq_info"
      }
      let name = "adt_web_beanSearch";
      let data = ajax(name,bean)
      console.log(data)
      this.testList = data.result.result
      console.log(this.testList)
    },
    goSur(test){
      console.log(test)
      let userName = sessionStorage.getItem("userName")
      console.log(userName)
      if(userName == null){
        this.$refs.loginModal.show()
        return
      }
      let testId = test.id
      this.$router.push({path:'/questionSurvey',query:{queId:testId}})
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
  max-width:91px;
  max-height: 103px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -46px;
  margin-top: -52px;
  z-index: 999;
}
.mock-jobs-img1 {
  position: absolute;
  max-width:81px;
  max-height: 87px;
  margin-left: -50px;
  margin-top: 50px;
}
</style>