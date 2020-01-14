<template>
  <div class="layout">
    <Layout :style="{minHeight:'100vh'}">
    <m-header></m-header>
    <Content :style="{padding: 0, minHeight: '280px', background: '#fff'}">
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
            <i style="color: #666;"></i>{{index+1}}</i>/{{array.length}}</span>
          <span v-if="item.question_type == '1'">[单选题] </span>
          <span v-if="item.question_type == '2'">[多选题] </span>
          <span v-if="item.question_type == '3'">[填空题] </span>
          <span v-if="item.question_type == '5'">[问答题] </span>
          <span>({{item.score}}分)</span>
        </div>
        <!--单选-->
        <dl v-if="item.question_type == '1'" class="type-A" :class="{active:index==ins}">
          <dt>{{index+1}}、
            <span v-html="item.question"></span>
          </dt>
          <dd v-for="(items, i) in item.question_item" @click="onDanXuan(i,index)" :class="{cur:items.flag}">
            <span class="icons"></span>
            <input class="checkBox" value="" name="A1" type="checkbox" />{{items.itemname}}
          </dd>
        </dl>

        <!--多选-->
        <dl v-if="item.question_type == '2'" class="type-A" :class="{active:index==ins}">
          <dt>{{index+1}}、
            <span v-html="item.question"></span>
          </dt>
          <dd v-for="(items, i) in item.question_item" @click="onDuoXuan(i,index,items)" :class="{cur:items.flag == true}">
            <span class="icons"></span>
            <input class="checkBox" value="" name="A1" type="checkbox" />{{items.itemname}}
          </dd>
        </dl>

        <!--问答-->
        <dl v-if="item.question_type == '5'" class="type-C" :class="{active:index==ins}">
          <dt>{{index+1}}、
            <span v-html="item.question"></span>
          </dt>
          <dd>
            <textarea v-model="item.userAnswer"></textarea>
          </dd>
        </dl>

        <!--填空-->
        <dl v-if="item.question_type == '3'" class="type-C" :class="{active:index==ins}">
          <dt>{{index+1}}、
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

      <div class="que-but but" v-else="array!=null && this.ins == array.length-1">
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
import axios from '@/utils/axios'
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
    console.log();
    let arg = {};
    arg.id = this.$route.query.id;
    let name = "selectRefQuestionById";
    let bean = arg;
    axios(name,bean).then((response) =>{
      console.log(response.result)
      this.array = response.result
      for (let x = 0; x < this.array.length; x++) {
        this.array[x].userAnswer = "";
      }
    }).catch(function (error) {
      console.log(error)
    });
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
      axios(name,bean).then((response) =>{
        console.log(response.data);
          if (response.data.resultstate == 0) {
            //提交试卷
            let answerList = [];
            for (let x = 0; x < this.array.length; x++) {
              let jsonBean = {
                id: this.array[x].id,
                orderid: this.array[x].orderid,
                answer: this.array[x].userAnswer,
                score: this.array[x].score
              };
              answerList.push(jsonBean);
            }
            arg.answerList = answerList;
            let arg1 = {};
            let name1 = "getPaperGrade";
            let bean1 = arg;
            axios(name1,bean1).then((response) =>{
              this.answerJX = response.data.result;
                this.$router.push({
                  name: "score",
                  query: {
                    answerList: this.answerJX,
                    title: this.$route.query.title
                  }
                });   
              }).catch(function (error) {
                console.log(error)
              });
        }else {
          this.flag = false;
          alert(response.data.resultdesc);
        }
      }).catch(function (error) {
      console.log(error)
      })
    },
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
.questio-con{background: #fff;margin: 30px auto;border: 1px solid #e0e0e0;
border-radius: 3px;overflow: hidden;width: 1000px;}
.que-tit{padding: 20px;border-bottom: 1px solid #eee;overflow: hidden;}
.que-tit h1{font-size: 20px;color: #333;float: left;font-weight: normal;}
.que-tit p{float: right;font-weight: normal;font-size: 20px;}
.que-type{padding:15px 20px;display: none}
.que-type span{font-size: 16px;color: #666;}
.que-type span i{color: #999;}
.que-type span.que-num{background: #eee;padding: 3px 10px;border-radius: 4px;}
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
.que-conup dd:hover{cursor: pointer;border:1px solid #a5ded2;color: #25bb9b;}
.que-conup dd.cur{border:1px solid #25bb9b;color: #25bb9b;}
.que-conup dd:hover .icons{border-color: #25bb9b;}
.que-conup dd.cur .icons{background: #25bb9b;border:1px solid #25bb9b;}
.que-conup dd.cur .icons:before{
	content: "√";
	color: #fff;
	font-size: 14px;
	line-height: 14px;
	width: 14px;
	height: 14px;
	text-align: center;
	position: absolute;
	left: 0;top: 0;
}
.icons{border: 1px solid #ddd;
vertical-align: -3px;
width: 14px;
height: 14px;
background: #fff;
display: inline-block;
margin-right: 3px;
border-radius: 2px;
line-height: normal;
position: relative;}
.que-con dd input[type="checkBox"],.que-con dd input[type="radio"]{display: none;}
.que-con dd textarea{width: 100%;line-height: 24px;height: 74px;width: 938px;padding: 10px;border-color: #d4d4d4;resize: none;}
.que-con .type-C dd{overflow: hidden;padding: 0;border: 0}
.que-but{overflow: hidden;}
.que-but input{float: right;width: 110px;margin-right: 20px;}
.que-but input.next-one{background: #25bb9b;}
.que-tips{clear: both;color: #888;font-size: 14px;text-align: right;margin-right: 20px;padding-bottom: 20px;}
.que-card{border-top: 1px dashed #ddd;padding: 20px;font-size: 16px;line-height: 30px;}
.que-card ul{margin-top: 15px;display: block;overflow: hidden;}
.que-card ul li{position: relative;font-size: 16px;width: 40px;color: #c1c5c9;margin-top: 7px;
	text-align: center; height: 40px;line-height: 40px;float: left;margin-left: 10px;}
.que-card ul li.up{color: #59b59c;}
.que-card ul li:hover,.que-card ul li.cur{display: block;background: #59b59c;color: #fff;cursor: pointer;}
.shade_box{position: fixed;top: 0;left: 0;bottom: 0;right: 0;z-index: 1000;background: rgba(0, 0, 0, 0.6)}
.shade_box_w{width: 630px;overflow: hidden;background: #f0f0f0;margin: 250px auto;border-radius: 4px}
.shade_box .pop-title{padding: 15px 20px;overflow: hidden;}
.shade_box .pop-title h3{font-size: 16px;font-weight: normal;line-height: 20px;border-left: 3px solid #ff6547;padding-left: 10px;}
.shade_box_w p{padding:50px 100px;text-align: center;font-size: 16px;background: #fff;line-height: 30px}
.shade_box .que-but input{margin-top: 20px;margin-bottom: 20px}
.shade_box .que-but input.gray{background: #bbb}
</style>