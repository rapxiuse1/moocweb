<template>
  <div class="layout">
    <Layout :style="{minHeight:'100vh',background: '#F5F5F5'}">
    <m-header></m-header>
    <Content :style="{padding: 0, minHeight: '280px', width:'62.5%',background: '#fff'}">
      <div class="shade_box" v-if="flag">
        <div class="shade_box_w">
          <div class="pop-title">
            <h3>提前交卷提示</h3>
          </div>
          <p>提前交卷前，请确保题目是否已完成全部，交卷即可查看试卷全部答案及解析，是否立即交卷？</p>
          <div class="que-but but">
            <input class="next-one" @click="sumbit" type="button" name="" id="" value="立即交卷" />
            <input class="next-one gray" @click="flag=false" type="button" name="" id="" value="继续做题" />
          </div>
        </div>
      </div>

    <!--内容-->
    <div class="questio-con">
      <div class="que-tit">
        <h1>{{this.$route.query.title}}</h1>
        <p class="time timer">
          时间
          <span ref="startTimer">00:00:00</span>
        </p>
      </div>

      <div class="que-con que-conup" v-for="(item, index) in array" :key="index">
        <div class="que-type" :class="{active:index==ins}">
          <span class="que-num">
            <i style="color: #666;"></i>{{index+1}}/{{array.length}}</span>
          <span v-if="item.question_type == '1'">[单选题] </span>
          <span v-if="item.question_type == '2'">[多选题] </span>
          <span v-if="item.question_type == '3'">[填空题] </span>
          <span v-if="item.question_type == '5'">[问答题] </span>
          <span>({{item.score}}分)</span>
        </div>
        <!--单选-->
        <dl v-if="item.question_type == '1'" class="type-A" :class="{active:index==ins}">
          <dt>
            <span v-html="item.question"></span>
          </dt>
          <dd v-for="(items, i) in item.question_item" @click="onDanXuan(i,index)" :class="{cur:items.flag}" :key="i">
            <span class="icons"></span>
            <input class="checkBox" value="" name="A1" type="checkbox" />{{items.itemname}}
          </dd>
        </dl>

        <!--多选-->
        <dl v-if="item.question_type == '2'" class="type-A" :class="{active:index==ins}">
          <dt>
            <span v-html="item.question"></span>
          </dt>
          <dd v-for="(items, i) in item.question_item" @click="onDuoXuan(i,index,items)" :class="{cur:items.flag == true}" :key="i">
            <span class="icons"></span>
            <input class="checkBox" value="" name="A1" type="checkbox" />{{items.itemname}}
          </dd>
        </dl>

        <!--问答-->
        <dl v-if="item.question_type == '5'" class="type-C" :class="{active:index==ins}">
          <dt>
            <span v-html="item.question"></span>
          </dt>
          <dd>
            <textarea v-model="item.userAnswer"></textarea>
          </dd>
        </dl>

        <!--填空-->
        <dl v-if="item.question_type == '3'" class="type-C" :class="{active:index==ins}">
          <dt>
            <span v-html="item.question"></span>
          </dt>
          <dd>
            <textarea v-model="item.userAnswer"></textarea>
          </dd>
        </dl>
      </div>

      <div class="que-but but" v-if="array!=null && this.ins != array.length-1">
        <input @click="nextOne(ins)" class="next-one" type="button" name="" id="" value="下一题" />
        <input class="next-sub" @click="flag=true" type="button" name="" id="" value="提前交卷" />
      </div>
      <div class="que-but but" v-else>
        <input class="next-one" @click="sumbit" type="button" name="" id="" value="交卷" />
      </div>

      <div class="que-card">
        <p>答题卡
          <i></i>
        </p>
        <ul v-if="array!=null">
          <li v-for="(item, index) in array.length" @click="active(index)" :key="index" :class="{cur:index==ins,'up':array[index].userAnswer != '' && array[index].userAnswer != null}">{{item}}</li>
        </ul>
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
      array: null,
      ins: 0,
      obj: {},
      dxIns: null,
      flag: false,
      answerJX: [],
      timer: "",
      content: "",
      hour: 0,
      minutes: 0,
      seconds: 0
    };
  },
  created() {
    this.timer = setInterval(this.startTimer, 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  mounted() {
    let arg = {}
    arg.id = this.$route.query.id
    let bean =arg
    let name = "selectRefQuestionById";
    console.log(arg)
    this.array = ajax(name,bean).result
    console.log(this.array)
    for (let x = 0; x < this.array.length; x++) {
      this.array[x].userAnswer = "";
    } 
  },
  methods: {
    // 时间计算
    startTimer() {
      this.seconds += 1;
      if (this.seconds == 60) {
        this.seconds = 0;
        this.minutes = this.minutes + 1;
      }

      if (this.minutes == 60) {
        this.minutes = 0;
        this.hour = this.hour + 1;
      }

      if (this.hour == 24) {
        this.seconds = 0;
        this.minutes = 0;
        this.hour = 0;
      }

      this.$refs.startTimer.innerHTML =
        (this.hour < 10 ? "0" + this.hour : this.hour) +
        ":" +
        (this.minutes < 10 ? "0" + this.minutes : this.minutes) +
        ":" +
        (this.seconds < 10 ? "0" + this.seconds : this.seconds);
    },
    active(index) {
      this.ins = index;
    },
    nextOne(ins) {
      if (this.ins < this.array.length - 1) {
        this.ins += 1;
      } else {
        alert("已到最后一题");
      }
      if (
        this.array[ins].userAnswer != "" &&
        this.array[ins].userAnswer != null
      ) {
      }
    },
    // 单选题
    onDanXuan(i, index) {
      for (var x = 0; x < this.array[index].question_item.length; x++) {
        this.array[index].question_item[x].flag = false;
      }
      this.array[index].question_item[i].flag = true;

      this.dxIns = i + 1;
      this.array[index].userAnswer = this.dxIns;
    },
    onDuoXuan(i, index) {
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
      for (var i = 0; i < len; i++) {
        tempArr.push(str.charAt(i));
      }
      tempArr = tempArr.sort();
      this.array[index].userAnswer = tempArr.join("");
    },
    // 提交
    sumbit() {
      let arg = {};
      arg.paperid = this.$route.query.id;
      arg.userid = this.$route.query.userId;
      arg.examid = this.$route.query.examId;
      
      console.log(arg);
      clearInterval(this.timer);
      //查询是否已经考过试了
      let name ='selectUserAnswer'
      let bean = arg;
      let data =ajax(name,bean)
      console.log(data)
      if(data.resultstate == 0){
        //提交试卷
        let answerList = []
        for(let x= 0; x<this.array.length; x++){
          let jsonBean = {
            id: this.array[x].id,
            orderid: this.array[x].orderid,
            answer: this.array[x].userAnswer,
            score: this.array[x].score
          };
          answerList.push(jsonBean);
        }
        arg.answerList = answerList;
        arg.isweb = true;
        console.log(arg)
        let name1 = "getPaperGrade";
        let bean1 = arg;
        let data1 = ajax(name1,bean1)
        console.log(data1)
        this.answerJX = data1.result
        this.$router.push({
          name: "score",
          query: {
            answerList: this.answerJX,
            title: this.$route.query.title
          }
        });   
      }else {
        this.flag = false;
        alert(data.resultdesc);
      }
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
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout-content{
  margin: 2% 18%;
  border-radius:5px;
}
</style>