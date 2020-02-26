<template>
    <div class="layout">
      <Layout :style="{minHeight:'100vh'}">
        <m-header></m-header>
         <Content :style="{padding: 0, minHeight: '280px', background: '#fff'}">
        <!--内容-->
        <div class="title-con score-con">
            <h1>
              <span>{{this.examinfo.title}}</span>
            </h1>
            <div class="que-con jx-que-con" v-for="(item, index) in paperInfo.questionlist" :key="index">
                <!--选择题-->
                <dl v-if="item.quesitem.question_type == '2' || item.quesitem.question_type == '1'" class="type-A">
                    <dt>
                        <i>{{index+1}}</i>
                        <span v-html="item.quesitem.question"></span>
                        <span v-if="item.quesitem.question_type == '1'">[单选题]</span>
                        <span v-else>[多选题]</span>
                             <span>（{{item.oldscore}}分）</span>
                    </dt>
                    <dd v-for="(items, i) in JSON.parse(item.quesitem.question_item)" :class="{cur:item.trueanswer.indexOf(i+1) != -1 }">
                        {{items.itemname}}
                    </dd>
                    <dd class="news-old">

                        <p>
                            <span class="right">正确答案：</span>{{item.trueanswer | intoLetter}}</p>

                        <p>
                            <span class="you"> 填写答案：</span>
                            <i v-if="item.oldanswer != null && item.oldanswer != ''">{{item.oldanswer | intoLetter}}</i>
                            <i v-else>空</i>
                        </p>
                      
                        <p>
                            <span class="score">得分：{{item.score}}分 </span>

                        </p>
                        <p>
                            <span class="jx" >解析： </span>{{item.quesitem.explain}}

                        </p>
                    </dd>
                </dl>

                <!--填空-->
                <dl v-if="item.quesitem.question_type == '3'||item.quesitem.question_type == '5'" class="type-C">
                    <dt>
                        <i>{{index+1}}</i>
                        <span v-html="item.quesitem.question"></span>
                        <span v-if="item.quesitem.question_type == '3'">[填空题]</span>
                        <span v-else>[问答题]</span>
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
                            <span v-if="item.quesitem.question_type == '3'" class="score">得分：{{item.score}}分 </span>
                            <span v-if="item.quesitem.question_type == '5'&&!item.mark" class="score">得分：未判分 </span>
                            <span v-if="item.quesitem.question_type == '5'&&item.mark" class="score">得分：{{item.score}} </span>
                            
                        </p>
                        <p>
                            <span class="jx" >解析： </span>{{item.quesitem.explain}}

                        </p>
                    </dd>
                </dl>

            </div>
            <div class="img-intor">
                <p>
                    <p v-if="this.paperInfo.question_answer==0">
                        该考试不包含问答题，其中选择题、填空题得分共为：
                        <span>{{this.paperInfo.score}}</span>分 </p>
                    <p v-else-if="this.paperInfo.question_answer==2">
                        该考试总得分为：
                        <span>{{this.paperInfo.score}}</span>分 </p>
                    <p v-else="this.paperInfo.question_answer==1">
                        该试卷在批改中，目前考试总得分为：
                        <span>{{this.paperInfo.score}}</span>分 
                    </p>
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
import ajax from '@/utils/ajax'
export default {
  data() {
    return {
      paperInfo: {},
      examinfo: {}
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const ids = JSON.parse(this.$route.query.ids);
      let name = "adt_web_exam_paperSearch";
      ids.type = "view";
      let bean = ids;
      let data = ajax(name,bean)
      console.log(data)
      if(data.resultstate == 0 && data.result){
        this.paperInfo = data.result.data;
        this.paperInfo.questionlist = JSON.parse(
          this.paperInfo.question_list
        );
        this.examinfo = data.result.examinfo;
        console.log(this.paperInfo);
      }else {
        alert("考试不存在");
      }
    }
  },
  filters: {
    // 将字符串数字改成字母
    intoLetter: function(value) {
      var tempArr = [];
      if (value.length > 0 || value.length == 0) {
        for (var x = 0; x < value.length; x++) {
          tempArr.push(String.fromCharCode(64 + parseInt(value.charAt(x))));
        }
        tempArr = tempArr.sort();
        value = tempArr.join("");
        return value;
      } else {
        return value;
      }
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
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
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
/* .title-con{background: #fff;margin: 30px auto;text-align: center;border: 1px solid #e0e0e0;
			border-radius: 3px;overflow: hidden;padding: 20px;width: 960px;}
.title-con h1{font-size: 22px;line-height: 40px;color: #333;}
.title-con h1:before{background: #ff6547;
	content: "";
	display: inline-block;
	width: 7px;
	height: 7px;
	margin-right: 5px;
	margin-bottom: 2px;
	vertical-align: middle;
}
.title-con h1 i{color: #ff6000;font-weight: normal;font-size: 16px;}
.que-con dl{font-size: 16px; padding: 20px;color: #333;display: none;min-height: 304px;line-height: 20px}
.que-con dl.active,.que-type.active{display: block}
.que-con dt{margin-bottom: 20px;}
.que-con dt p{display: inline;}
.que-con dd{margin-bottom: 20px;
	border: 1px solid #d4d4d4;
	border-radius: 4px;
	padding: 12px 20px 13px;
	background: #fff;
	display: block;
	word-break: break-all;
}
.que-con dd input[type="checkBox"],.que-con dd input[type="radio"]{display: none;}
.que-con dd textarea{width: 100%;line-height: 24px;height: 74px;width: 938px;padding: 10px;border-color: #d4d4d4;resize: none;}

.que-con .type-C dd{overflow: hidden;padding: 0;border: 0}
.jx-que-con{border-bottom: 1px solid #eee}
.jx-que-con dl{display: block;min-height: initial;}
.jx-que-con dd.cur{cursor: pointer;border:1px solid #a5ded2;color: #25bb9b;}
.jx-que-con dt{padding: 20px;background: #f3f3f3;margin-top: 20px;border-radius: 3px}
.jx-que-con dt i{display: inline-block;width: 20px;height: 20px;border-radius: 50px;
	background: #59b59c;color: #fff;text-align: center;line-height: 20px;margin-right: 8px}
.que-con .news-old{font-size: 14px;border: 0;padding: 20px 0}
.news-old span{padding-right: 15px}
.news-old span.right{    padding-right: 0px;color: #59b59c;font-size: 19px;}
.news-old span.you{    padding-right: 0px;color: #1473cb;font-size: 19px;}
.news-old span.jx{    padding-right: 0px;color: #333;font-size: 19px;}
.news-old span.score{    padding-right: 0px;color: #d84325;font-size: 19px;}
.news-old p{margin-bottom: 30px;margin-left: 20px;}
.img-intor{margin: 30px 0 50px;}
.img-intor img{display: inline-block;width: 166px;vertical-align: top;margin-right: 30px;}
.img-intor div{display: inline-block;height: 140px;text-align: left;padding-top: 20px;}
.img-intor div p{line-height: 32px;font-size: 16px;color: #666;}
.score-con .img-intor p{font-size:20px;color:#03110e;;}
.score-con{margin: 30px auto;}
.score-con .img-intor {
	margin: 30px 0;
}
.score-con .que-con,.score-con .analysis{text-align:left} */


</style>