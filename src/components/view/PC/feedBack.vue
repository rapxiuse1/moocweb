<template>
   <div class="layout">
        <Layout :style="{minHeight:'100vh'}">
          <m-header></m-header>
          <Content :style="{padding: 0, minHeight: '280px', background: '#fff'}">
            <div class="nk-content">
              <div class="resource-mod">
                <div class="resource-mod-hd">
                  意见反馈
                </div>
                <div class="resource-mod-bd">
                  <div class="resource-sub-mod">
                    <div class="bd">
                      <div class="mock-jobs-list clearfix">
                        <a class="mock-jobs-item" v-for="(test,index) in testList" :key="index">
                          <router-link :to="{name:'questionSurvey',query:{queId:test.id}}">
                            <span class="mock-jobs-name">{{test.asq_name}}</span>
                            <div class="mock-jobs-img">
                              <img src="https://uploadfiles.nowcoder.com/images/20191109/59_1573270956405_8A9C8878206EDC89EA273AF6F4418EA6" alt="">
                            </div>
                          </router-link>                 
                        </a>                
                      </div>
                    </div>
                  </div>
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
  },
  components:{
    MFooter,
    MHeader,
  }
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
.nk-content {
  margin-right: 0;
  width: 1000px;
}
.resource-mod .resource-mod-hd {
  font-size: 18px;
  color: #2f1c41c4;
  margin-bottom: 15px;
  padding: 0 25px;
}
.resource-mod .resource-mod-bd {
  padding: 0 25px;
}
.resource-sub-mod .bd {
  font-size: 0;
}
.mock-jobs-list {
  font-size: 0;
  margin-right: -30px;
}
.clearfix {
  display: block;
  zoom: 1;
}
a:link, a:visited {
  text-decoration: none;
}
a {
  color: #333;
}
.mock-jobs-item {
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  text-align: center;
  width: 220px;
  height: 170px;
  padding: 20px 10px;
  margin: 0 20px 20px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.mock-jobs-item:hover {
  color: #25BB9B;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
}
.mock-jobs-name {
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  max-width: 10em;
  margin-bottom: 20px;
  font-size: 16px;
}
.mock-jobs-img {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  overflow: hidden;
  background: #f4f4f4;
  border-radius: 50%;
  display: block;
}
</style>