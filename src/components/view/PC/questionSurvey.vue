<template>
  <div class="layout">
    <Layout :style="{minHeight:'100vh',background: '#F5F5F5'}">
    <m-header></m-header>
    <Content :style="{padding: 0, minHeight: '280px',width:'62.5%', background: '#fff'}">
			<!--内容-->
      <div class="main">
        <div class="fixed_shade" v-if="flag">
            <p><img src="@/assets/tjsuccess.png"/></p>
            <p>提交成功!</p>
        </div>
        <div class="yl_main">
            <h2>{{title}}</h2>
            <div class="notice">{{introduce}}</div>
            <div class="que-con que-conup" v-for="(item, index) in array" :key="index">
                <!-- 单选 -->
                <dl v-if="item.question_type == '1'" style="display: block;">
                    <dt>
                        <!-- <i>{{index+1}}. </i> -->
                        <span v-html="item.question"></span>
                        <span class="xz_span"> [ 单选题 ]</span>
                    </dt>
                    <dd v-for="(items, i) in item.question_item" @click="onDanXuan(i,index)" :class="{cur:items.flag}">
                        <span class="icons"></span>
                        <input class="checkBox" value="" name="A1" type="checkbox" />{{items.itemname}}
                    </dd>
                </dl>
                <!-- 多选 -->
                <dl v-if="item.question_type == '2'" style="display: block;">
                    <dt>                
                        <span v-html="item.question"></span>
                        <span class="xz_span"> [ 多选题 ]</span>
                    </dt>
                    <dd v-for="(items, i) in item.question_item" @click="onDuoXuan(i,index,items)" :class="{cur:items.flag}">
                        <span class="icons"></span>
                        <input class="checkBox" value="" name="A1" type="checkbox" />{{items.itemname}}
                    </dd>
                </dl>

                <!--问答-->
                <dl v-if="item.question_type == '5'" class="type-C type-pc-5C" :class="{active:index==ins}" style="display: block;">
                    <dt>
                        <span v-html="item.question"></span>
                         <span class="xz_span"> [ 问答题 ]</span>
                    </dt>
                    <dd>
                        <textarea v-model="item.userAnswer"></textarea>
                    </dd>
                </dl>
            </div>
            <p class="pok">本卷已完成</p>
            <div v-if="!view">
                <button @click="sumbit">提交</button>
            </div>
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
      dxIns: null,
      array: null,
      flag: false,
      ins: 0,
      userId: "",
      title: "",
      queId: "",
      introduce: "",
      view:false
    };
  },
  mounted() {
    // this.queId = this.getUrlKey("queId");
    // this.userId = this.getUrlKey("userId");
    // this.view=this.getUrlKey("view")
    this.userId = sessionStorage.getItem("userId")
    this.queId = this.$route.query.queId
    let name = "selectSurveyQuestionById";
    let bean = { 
      id: this.queId 
    };
    let data = ajax(name,bean)
    console.log(data)
    if (data.resultstate == 0){
      this.title = data.result.title;
      this.introduce = data.result.wjbean.introduce;
      this.array = data.result.newlist;
      for (let x = 0; x < this.array.length; x++) {
        this.array[x].userAnswer = "";
      }
    }
  },
  methods: {
    getUrlKey(name){   
      return decodeURIComponent((
        new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
        .exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    // 单选题
    onDanXuan(i, index) {
      // console.log(i)
      for (var x = 0; x < this.array[index].question_item.length; x++) {
        this.array[index].question_item[x].flag = false;
      }
      this.array[index].question_item[i].flag = true;

      this.dxIns = i;
      this.array[index].userAnswer = this.dxIns + 1;

      console.log(this.array);
    },
    // 多选
    onDuoXuan(i, index) {
      // this.array[index].question_item[i].itemname = '你好'
      this.array[index].question_item[i].flag = !this.array[index]
        .question_item[i].flag;

      if (this.array[index].question_item[i].flag == true) {
        this.array[index].userAnswer += (i + 1).toString();
      } else {
        var reg = new RegExp((i + 1).toString(), "g");
        this.array[index].userAnswer = this.array[index].userAnswer.replace(
          reg,
          ""
        );
      }
      // 将字符串数字顺位
      var str = this.array[index].userAnswer;
      var len = str.length;
      var tempArr = [];
      for (var y = 0; y < len; y++) {
        tempArr.push(str.charAt(y));
      }
      tempArr = tempArr.sort();
      this.array[index].userAnswer = tempArr.join("");
      // console.log(this.array)
    },

    // 提交
    sumbit() {
      this.queId = this.getUrlKey("queId");
      this.userId = this.getUrlKey("userId");
      var answerList = [];
      for (var x = 0; x < this.array.length; x++) {
        var jsonBean = {
          id: this.array[x].id,
          orderid: this.array[x].orderid,
          question_item: this.array[x].question_item,
          question_tj: this.array[x].question_tj,
          required: this.array[x].required,
          question: this.array[x].question,
          question_type: this.array[x].question_type,
          answer: this.array[x].userAnswer
        };
        answerList.push(jsonBean);
      }
    
      for (var x = 0; x < answerList.length; x++) {
        if (answerList[x].question_type == "5") {
          if (answerList[x].required == true) {
            if (answerList[x].answer == "") {
              alert("请完成问答题在提交");
              return false;
            }
          }
        } else {
          if (answerList[x].answer == "") {
            alert("请完成全部答题在提交");
            return false;
          }
        }
      }
      console.log("answerList",answerList);
      let name = "getSurveyResult";
      let bean = {
        queId: this.queId,
        userId: this.userId,
        answer_list: answerList
      };
      let data = ajax(name,bean)
      console.log(data)
      if (data.resultstate == 0){
        this.flag = true;
      }else {
        alert("提交失败");
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
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout-content{
  margin: 2% 18%;
  border-radius:5px;
}
</style>