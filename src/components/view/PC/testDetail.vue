<template>
  <div class="layout">
    <Layout :style="{minHeight:'100vh'}">
    <m-header></m-header>
    <Content :style="{padding: 0, minHeight: '280px',width:'62.5%', background: '#fff'}">
			<!--内容-->
			<div class="title-con">
				<h1>
					<span>{{array.title}}</span>
					<i>&nbsp;&nbsp;</i>
				</h1>
				<div class="img-intor">
					<img src="@/assets/target.png"/>
					<div>
						<p>题目：{{array.question_num}}道</p>
						<p>总分：{{array.paper_score}}分</p>
						<p>考试时长：{{array.exam_continued}}分钟</p>
						<p>及格分数：{{array.pass_score}}分</p>
					</div>
				</div>
				<div class="exam-notice">
					<p>考试说明：{{array.introduce}}</p>
					<p>注意事项：{{array.announcements}}</p>
				</div>
				<div class="but">
          	<router-link :to="{name:'question',query:{id:array.paper_id,title:array.title,userId:this.userId,examId:this.examId}}"><input type="button" name="" id="" value="开始做题" /></router-link>
				</div>
			</div>
    </Content>
    <m-footer></m-footer>
  </Layout>
  </div>
</template>

<script>
import MHeader from '@/components/header/header.vue'
import MFooter from '@/components/footer/footer.vue'
//import axios from '@/utils/axios'
import ajax from '@/utils/ajax'
export default {
	data() {
		return {
			examId:'',
			userId:'',
			array:{}
		}
  },
  mounted(){
    // if(this.getUrlKey('examId')){
    //   console.log('111')
    //   this.examId = this.getUrlKey('examId')
    //   this.userId = this.getUrlKey('userId')
    // }
    this.examId = this.$route.query.examId
    //this.userId = '66632a9318ff480ca13c6490e9e18f3b'
    this.userId = sessionStorage.getItem("userId")
    console.log(this.examId)
    console.log(this.userId)
    let name = 'selectExamById'
    let bean = {
      'id':this.examId
    }
    console.log(bean)
    let data =ajax(name,bean)
    console.log(data)
    this.array = data.result
    console.log(this.array)
  },
  methods:{
    getUrlKey(name){
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
  },
  components:{
    MFooter,
    MHeader,
  },
}
</script>

<style scoped>
@import "../../.././assets/css/index.css";
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout-content{
  margin-left: 18%;
  margin-right: 18%;
}
</style>