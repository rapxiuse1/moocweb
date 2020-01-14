<template>
  <div class="layout">
    <Layout :style="{minHeight:'100vh'}">
    <m-header></m-header>
    <Content :style="{padding: 0, minHeight: '280px', background: '#fff'}">
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
import axios from '@/utils/axios'
export default {
	data() {
		return {
			examId:'',
			userId:'',
			array:{}
		}
  },
  mounted(){
    this.examId = this.getUrlKey('examId')
    this.userId = this.getUrlKey('userId')
    console.log(this.examId)
    let name = 'selectExamById'
    let arg = {}
    arg.id = this.examId
    let bean = arg
    axios(name,bean).then((res) =>{
      console.log(res.result)
      this.array = res.result
    }).catch(function (error) {
      console.log(error)
    });
  },
  methods:{
    getUrlKey(name){
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    // doquestion(){
    //   this.$router.push({path:'/question',query:{id:array.paper_id,title:array.title,userId:this.userId,examId:this.examId}})
    // }
  },
  components:{
    MFooter,
    MHeader,
  },
}
</script>

<style scoped>
.layout{
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.title-con{
  background: #fff;
  margin: 30px auto;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  overflow: hidden;padding: 20px;
  width: 960px;
}
.title-con h1{
  font-size: 22px;
  line-height: 40px;
  color: #333;
}
.title-con h1:before{
  background: #ff6547;
	content: "";
	display: inline-block;
	width: 7px;
	height: 7px;
	margin-right: 5px;
	margin-bottom: 2px;
	vertical-align: middle;
}
.title-con h1 i{
  color: #ff6000;
  font-weight: normal;
  font-size: 16px;
}
.img-intor{
  margin: 30px 0 50px;
}
.img-intor img{
  display: inline-block;
  width: 166px;
  vertical-align: top;
  margin-right: 30px;
}
.img-intor div{
  display: inline-block;
  height: 140px;
  text-align: left;
  padding-top: 20px;
}
.img-intor div p{
  line-height: 32px;
  font-size: 16px;
  color: #666;
}
.exam-notice{
	text-align: left;
	background: #f0f0f0;
	color: #666!important;
	padding: 20px;
	max-height: 300px;
	max-width: 780px;
	border-radius: 0;
	border: none;
	overflow-y: auto;
	margin: 30px auto 50px;
	z-index: 1;
	position: relative;
	font-size: 14px;
}
.exam-notice p{
  line-height: 36px;
}
.but input{
  width: 180px;
  margin: 0 auto;
  display: block;
  color: #fff;
  font-size: 14px;
  border-radius: 3px;
  text-align: center;
  padding: 10px 0;
  background: #ff6000;
  border: #009F95;
  margin-bottom: 30px;
}
.but input:hover{
  cursor: pointer;
}
</style>