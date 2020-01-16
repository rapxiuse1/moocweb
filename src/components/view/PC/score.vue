<template>
  <div class="layout">
    <Layout :style="{minHeight:'100vh'}">
      <m-header></m-header>
      <Content :style="{padding: 0, minHeight: '280px', background: '#fff'}">
        <!--内容-->
        <div class="title-con score-con">
          <h1>
            <span>{{this.$route.query.title}}答案解析</span>
          </h1>
            <div class="que-con jx-que-con" v-for="(item, index) in answerList.explains" :key="index">
                <!--选择题-->
                <dl v-if="item.quesitem.question_type == '2' || item.quesitem.question_type == '1'" class="type-A">
                    <dt>
                      <i>{{index+1}}</i>
                      <span v-html="item.quesitem.question"></span>
                      <span v-if="item.quesitem.question_type == '1'">[单选题]</span>
                      <span v-else>[多选题]</span>
                      <span>（{{item.oldscore}}分）</span>
                    </dt>
                    <dd v-for="(items, i) in JSON.parse(item.quesitem.question_item)" :class="{cur:item.trueanswer.indexOf(i+1) != -1 }" :key="i">
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
                          <span class="score" >得分：{{item.score}}分 </span>                          
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
                          <span v-if="item.quesitem.question_type == '3'" class="score" >得分：{{item.score}}分 </span>
                          <span v-else class="score" >得分：未判分 </span>
                        </p>
                        <p>
                          <span class="jx" >解析： </span>{{item.quesitem.explain}}
                        </p>
                    </dd>
                </dl>
            </div>
            <div class="img-intor">
                <p v-if="this.answerList.mask==0">
                  该答案解析不包含问答题，其中选择题、填空题得分共为：<span>{{this.answerList.grade}}</span>分 
                </p>
                <p v-else>
                  该考试总得分为：<span>{{this.answerList.grade}}</span>分 
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
export default {
  data() {
    return {
      answerList: []
    };
  },
  mounted() {
    this.answerList = this.$route.query.answerList;
    console.log(this.answerList);
  },
  methods:{
    
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
  font-size: 35px
}
.title-con{background: #fff;margin: 30px auto;text-align: center;border: 1px solid #e0e0e0;
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
.img-intor{margin: 30px 0 50px;}
.img-intor img{display: inline-block;width: 166px;vertical-align: top;margin-right: 30px;}
.img-intor div{display: inline-block;height: 140px;text-align: left;padding-top: 20px;}
.img-intor div p{line-height: 32px;font-size: 16px;color: #666;}
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
.exam-notice p{line-height: 36px;}
.but input{width: 180px;margin: 0 auto;display: block;color: #fff;font-size: 14px;border-radius: 3px;    text-align: center;
padding: 10px 0;background: #ff6000;border: #009F95;margin-bottom: 30px;}
.but input:hover{cursor: pointer;}

</style>