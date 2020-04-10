<template>
  <div class="layout">
    <Layout :style="{minHeight:'100vh',background: '#F5F5F5'}">
    <m-header></m-header>
    <Content :style="{padding: 0, minHeight: '280px', width:'62.5%',background: '#fff'}">
      <div class="yl_main">
      <!--<div :id="'myChart'+(index)"></div>-->
      <div class="result_tit">
        <h2>问卷名称：{{title}}
          <span>总调查人数：{{length}}人</span>
        </h2>
      </div>

      <div class="result_con" v-for="(item, index) in this.arrayAll.dxlist" :key="index">
        <h3 v-if="item.quetype == 1">
          <span>{{item.orderid}}、</span>
          <span v-html="item.question"></span>（单选题）</h3>
        <h3 v-if="item.quetype == 2">
          <span>{{item.orderid}}、</span>
          <span v-html="item.question"></span>（多选题）</h3>
        <div class="result_con_box">
          <div class="result_con_fl">
            <div :id="'myChart'+index" class="myChart"></div>
          </div>
          <div class="result_con_fr">
            <table class="tableA" border="" cellspacing="" cellpadding="">
              <tbody>
                <tr class="up" style="background-color: rgba(96, 172, 252, 0.14);">
                  <td>选项</td>
                  <td>选择次数</td>
                </tr>
                <tr v-for="(items,i) in item.itembeans" :key="i">
                  <td>{{items.option}}、{{items.title}}</td>
                  <td>{{items.value}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="result_con" v-for="(item, index) in this.arrayAll.wdlist">
        <h3>
          <span>{{item.orderid}}、</span>
          <span v-html="item.question"></span>（问答题）</h3>
        <div class="result_con_box">
          <div class="result_con_fl">
            <div :id="'wdmyChart'+(index)" class="myChart"></div>
          </div>
          <div class="result_con_fr">
            <table border="" cellspacing="" cellpadding="">
              <tbody>
                <tr class="up" style="background-color: rgba(96, 172, 252, 0.14);">
                  <td>试卷总人数</td>
                  <td>{{item.allan}}人</td>
                </tr>
                <tr>
                  <td>本题答题人数</td>
                  <td>{{item.notnu}}人</td>
                </tr>
                <tr>
                  <td>未答题人数</td>
                  <td>{{item.isnu}}人</td>
                </tr>
              </tbody>
            </table>
            <button v-if="item.notnu!=0" class="button" @click="detail(item)">查看详情</button>
          </div>
        </div>
      </div>

    </div>
    <div class="fixed_shade" v-if="flag">
      <p><img src="static/img/none.png" /></p>
      <p> 暂无统计数据!</p>
    </div>
    <div class="shadow-box" v-if="onDetail">
      <div class="shadow-detail">
        <div class="close">
          <span @click="close">×</span>
        </div>
        <div class="tit">
          <span v-html="detailTit"></span>
        </div>
        <div class="shadow-detail-ul">
          <ul>
            <li v-for="(item, index) in detailArray">
              <p>
                <span></span>{{item.answer}}</p>
            </li>
          </ul>
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
      arrayAll: {
        dxlist: [],
        wdlist: []
      },
      title: "",
      length: 0,
      flag: false,
      onDetail: false,
      detailTit: "",
      detailArray: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    getUrlKey(name){   
      return decodeURIComponent((
        new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
        .exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    initData() {
      //获取统计信息
      const queid = this.getUrlKey("queId");
      if (queid) {
        let name = "getAsqTj"
        let bean = {
          queid: queid
        }
        let data = ajax(name,bean)
        console.log(data)
        if (data.resultstate == 0 && data.result){
          this.title = data.result.asq_name;
              if (data.result.resultbeans) {
                for (
                  var i = 0;
                  i < data.result.resultbeans.length;
                  i++
                ) {
                  var obj = data.result.resultbeans[i];
                  if (obj.quetype == 1 || obj.quetype == 2) {
                    this.arrayAll.dxlist.push(obj);
                  }
                  if (obj.quetype == 5) {
                    this.arrayAll.wdlist.push(obj);
                  }
                }
              } else {
                this.flag = true;
              }
              this.length = data.result.length;
              console.log(this.arrayAll);
              this.drawLine();
              this.drawLinea();
        }     
      }
    },

    detail(item) {
      this.onDetail = true;
      console.log(item);
      this.detailTit = item.question;
      //获取统计信息
      const queid = this.getUrlKey("queId");
      if (queid) {
        let name = "getAnswerList"
        let bean = {
          queid: queid, 
          tmid: item.tmid 
        }
        let data = ajax(name,bean)
        console.log(data)
        if (data.resultstate == 0 && data.result) {
          this.detailArray = data.result;
        }
      }
    },
    close() {
      this.onDetail = false;
    },
    drawLine() {
      var arry = [];
      for (var x = 0; x < this.arrayAll.wdlist.length; x++) {
        var obj = {};
        var data = [
          { value: this.arrayAll.wdlist[x].isnu, name: "本题答题人数" },
          { value: this.arrayAll.wdlist[x].notnu, name: "未答题人数" }
        ];
        // console.log(data)
        obj.data = data;
        arry.push(obj);
      }
      console.log("-----------");
      console.log(arry);
      // 基于准备好的dom，初始化echarts实例
      this.$nextTick(() => {
        for (var i = 0; i < this.arrayAll.wdlist.length; i++) {
          let wdmyChart = this.$echarts.init(
            document.getElementById("wdmyChart" + i)
          );
          // 绘制图表
          wdmyChart.setOption({
            tooltip: {
              trigger: "item"
            },
            legend: {
              bottom: "0%",
              data: ["本题答题人数", "未答题人数"],
              textStyle: {
                //图例文字的样式
                fontSize: 12
              },
              bottom: "1%",
              itemWidth: 14,
              itemHeight: 14,
              borderRadius: 0,
              itemGap: 25
            },
            color: ["#60ACFC", "#23C2DB", "#63D5B2", "#D4EC59"],
            series: [
              {
                name: "",
                type: "pie",
                radius: "60%",
                center: ["50%", "45%"],
                label: {
                  normal: {
                    show: true,
                    formatter: "{d}%",
                    textStyle: { color: "#666" },
                    rich: {
                      a: {
                        fontSize: "12",
                        align: "left",
                        color: "#666"
                      }
                    }
                  }
                },
                data: arry[i].data,
                tooltip: {
                  formatter: "{b}：{d}%"
                }
              }
            ]
          });
        }
      });
    },
    drawLinea() {
      var arr = [];
      for (var x = 0; x < this.arrayAll.dxlist.length; x++) {
        var obj = {};

        var data = [];
        for (var y = 0; y < this.arrayAll.dxlist[x].itembeans.length; y++) {
          // console.log(y)
          var dataObj = {};
          dataObj.value = this.arrayAll.dxlist[x].itembeans[y].value;
          dataObj.name = this.arrayAll.dxlist[x].itembeans[y].option;
          data.push(dataObj);
        }
        // console.log(data)
        obj.data = data;
        arr.push(obj);
      }
      // console.log('-----------')
      // console.log(arr)
      // 基于准备好的dom，初始化echarts实例
      this.$nextTick(() => {
        for (var i = 0; i < this.arrayAll.dxlist.length; i++) {
          let myChart = this.$echarts.init(
            document.getElementById("myChart" + i)
          );
          // 绘制图表
          myChart.setOption({
            tooltip: {
              trigger: "item"
            },
            legend: {
              bottom: "0%",
              data: ["A", "B", "C", "D"],
              textStyle: {
                //图例文字的样式
                fontSize: 12
              },
              bottom: "1%",
              itemWidth: 14,
              itemHeight: 14,
              borderRadius: 0,
              itemGap: 25
            },
            color: ["#60ACFC", "#23C2DB", "#63D5B2", "#D4EC59"],
            series: [
              {
                name: "",
                type: "pie",
                radius: "60%",
                center: ["50%", "45%"],
                label: {
                  normal: {
                    show: true,
                    formatter: "{d}%",
                    textStyle: { color: "#666" },
                    rich: {
                      a: {
                        fontSize: "12",
                        align: "left",
                        color: "#666"
                      }
                    }
                  }
                },
                data: arr[i].data,
                tooltip: {
                  formatter: "{b}：{d}%"
                }
              }
            ]
          });
        }
      });
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
table {
  border-collapse: collapse;
  color: #666;
  width: 750px;
}
table td {
  padding: 10px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
}
.tableA td {
  padding: 10px;
  border: 1px solid #e6e6e6;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  width: 100px;
}
.tableA tr td:nth-child(1) {
  text-align: left;
  width: auto;
}
.tableA tr:nth-child(1) td {
  text-align: center;
}

.result_con h3 {
  overflow: hidden;
}
.result_con h3 span {
  float: left;
}

</style>