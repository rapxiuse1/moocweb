<template>
    <div class="layout">
      <Layout :style="{minHeight:'100vh',background: '#F5F5F5'}">
        <m-header></m-header>
         <Content :style="{padding: 0, minHeight: '280px', width:'62.5%',background: '#fff'}">
        <div class="shade_box" v-if="flag">
            <div class="shade_box_w">
                <div class="pop-title">
                    <h3>提前提交提示</h3>
                </div>
                <p>该试卷问答题尚未批改完，提交后可以在系统中继续批改，是否立即提交？</p>
                <div class="que-but but">
                    <input class="next-one" @click="sumbit(1)" type="button" name="" id="" value="立即提交" />
                    <input class="next-one gray" @click="flag=false" type="button" name="" id="" value="继续批改" />
                </div>
            </div>
        </div>
           <div class="fixed_shade" v-if="jjflag">
            <p><img src="assets/tjsuccess.png"/></p> 
            <p>提交成功!</p>
            </div>
        <!--内容-->
        <div class="title-con score-con">
            <h1>
                <span>{{this.examinfo.title}}</span>
            </h1>
            -
            <div class="analysis">
                <p class="border-p">
                    <span>问答题批改</span>
                </p>
            </div>
            <div class="que-con jx-que-con" v-for="(item, index) in questionlist" v-if="item.quesitem.question_type=='5'&&!item.mark" :key="index">
                <!--问答题-->
                <dl class="type-C">
                    <dt>
                        <i>{{index+1}}</i>
                        <span v-html="item.quesitem.question"></span>
                        <span>（{{item.oldscore}}分）</span>
                    </dt>
                    <dd class="news-old">
                        <p>
                            <span class="right">正确答案：</span>{{item.trueanswer}}</p>
                        <p>
                            <span class="you"> 填写答案：</span>
                            <i v-if="item.oldanswer != null && item.oldanswer != ''">{{item.oldanswer}}</i>
                            <i v-else>空</i>
                        </p>
                        <p>
                            <span class="score">得分：</span> <input class="inpscore" v-model="item.score" onkeyup="value=value.replace(/[^\d.]/g,'')"> </input>
                        </p>
                        <p>
                            <span class="jx" >解析： </span>{{item.quesitem.explain}}
                        </p>
                    </dd>
                </dl>
            </div>
            <div style="margin-top: 15px;" class="que-but but "><input type="button" name="" id="" @click="sumbit()" value="立即提交" class="next-one" key=""> </div>
        </div>
         </Content>
      <m-footer></m-footer>
    </Layout>
    </div>
</template>

<script>
import MHeader from '@/components/header/header.vue'
import MFooter from '@/components/footer/footer.vue'
import ajax from '@/utils/ajax'
export default {
  data() {
    return {
      questionlist: [],
      examinfo: {},
      baseInfo: {},
      score: 0,
      flag: false,
        id:"",
        jjflag:false
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const ids = JSON.parse(this.$route.query.ids);
      let name = "adt_web_exam_paperSearch";
      ids.type = "mark";
      let bean = ids;
      let data = ajax(name,bean)
      console.log(data)
      if (data.resultstate == 0 && data.result) {
        this.questionlist =JSON.parse(data.result.data.question_list) ;
        this.examinfo = data.result.examinfo;
        this.id=data.result.data.id;  
        } else {
          alert("考试不存在");
        }
    },
    sumbit(flag) {
      let question_answer=2;
      console.log("data", this.questionlist);
      for (let i = 0; i < this.questionlist.length; i++) {
        const element = this.questionlist[i];
        if(element.quesitem.question_type=='5'){
          if (!this.validate(element.score)) {
              this.flag = true;
              this.questionlist[i].score='';
              question_answer=1
          }else{
              if(Number.parseFloat(this.questionlist[i].oldscore)<Number.parseFloat(element.score)){
              alert("第"+(i+1)+"题得分大于分值，请重新评分")
              return;
              }else{
                this.questionlist[i].mark=true;    
              }    
            }
          }
      }
      if(!this.flag||flag=="1"){       
        this.questionlist.forEach(element => {
          if(element.mark){
            this.score+=Number.parseFloat(element.score);
          }
        });
        //提交批改
        let name = "adt_web_saveOrUpdateBean";
        let bean = {
          beanname:'adt_user_exam_answer',
          id:this.id,
          question_list:JSON.stringify(this.questionlist),
          score:this.score,
          question_answer:question_answer   
        }
        let data = ajax(name,bean)
        console.log(data) 
        if(data.resultstate == 0){
          console.log("提交成功");
          this.jjflag=true;
        }else {
        alert("提交失败");
        this.flag=false;
        }  
      }
    },
    validate(num) {
      var reg = /^\d+(?=\.{0,1}\d+$|$)/;
      if (reg.test(num) || num == "0") return true;
      return false;
    }
  },
  components:{
    MFooter,
    MHeader,
  },
};
</script>
<style scoped>
@import "../../.././assets/css/index.css";
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
.jx-que-con dt i.err {
  background: #d84325;
  color: #d84325;
}

.jx-que-con dt i.cur {
  background: #25bb9b;
  color: #25bb9b;
}
.img-intor p span {
  color: #d84325;
  font-size: 35px;
}
.news-old input.inpscore {
  width: 63px;
  font-size: 18px;
  border-radius: 3px;
  padding: 5px 0;
  text-align: center;
  border: 1px solid #326f6b;
}

</style>