<template>
   <div class="layout">
        <Layout :style= "{minHeight:'100vh'}">
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="knowledge" @on-select="turnToPage">
                    <div class="layout-logo">
                      <img src="@/assets/logo.png" alt="">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="knowledge">
                            <Icon type="ios-navigate"></Icon>
                            常见问题
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            在线考试
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            问卷调查
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            意见反馈
                        </MenuItem>
                    </div>
                    <div class="login">
                        <MenuItem name="register">
                            <Icon type="ios-navigate"></Icon>
                            注册
                        </MenuItem>
                         <MenuItem name="login">
                            <Icon type="ios-navigate"></Icon>
                            登录
                        </MenuItem>
                         <MenuItem name="findpwd">
                            <Icon type="ios-navigate"></Icon>
                            找回密码
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
              <Sider hide-trigger :style="{background: '#fff'}">
                  <Menu theme="light" width="auto" @on-select="inPage">
                      <MenuItem :name="nav.id"  v-for ="(nav,index) in navList" :key="index">
                      <Icon type="ios-paper" />
                      {{nav.name}}
                      </MenuItem>
                  </Menu>
              </Sider>
            <Layout>
              <Content :style="{padding: 0, minHeight: '280px', background: '#fff'}">
                   <Menu mode="horizontal" theme="light" @on-select="toPage">
                      <MenuItem :name="liv.id" v-for ="(liv,index) in list" :key="index">
                          <Icon type="ios-paper" />
                          {{liv.name}}
                      </MenuItem>
                   </Menu>
                    <Table stripe width='100%' :columns="columns" :data="curData" @on-row-click="editorShow">
                    </Table>
                    <Modal v-model="modalShow" width="1400" footer-hide>
                      <!-- <div class="LC_form">
                        <div class="LC_form_box">
                          <table class="LC_form_tab LC_form_all">
                            <tbody>
                              <tr>
                                <td class="LC_form_tab_th LC_form_tab_td">大标题</td>
                                <td class="LC_form_tab_td">
                                  {{this.headline}}
                                </td>
                              </tr>
                              <tr>
                                <td class="LC_form_tab_th LC_form_tab_td">小标题</td>
                                <td class="LC_form_tab_td">{{this.subtitle}}</td>
                              </tr>
                              <tr>
                                <td class="LC_form_tab_th LC_form_tab_td">正文</td>
                                <td class="LC_form_tab_td">
                                  <div v-html= "this.content" style="height:500px;overflow:scroll">
                                     {{this.content}}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td class="LC_form_tab_th LC_form_tab_td">附件</td>
                                <td class="LC_form_tab_td"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div> -->
                      <div class="message">
                        <div class="tit">
                          <h3>大标题:{{this.headline}}</h3>
                          <h5 class="small">小标题:{{this.subtitle}}</h5>
                        </div>
                        <div class="content">
                          <h3>正文:</h3>
                          <div v-html= "this.content" style="height:500px;overflow:auto">
                            {{this.content}}
                          </div>
                        </div>
                        <div class="file" style="height:100px;width:100%">
                          <h3>附件:</h3>
                        </div>
                      </div>
                    </Modal>
                    <div style="margin: 10px;overflow: hidden">
                      <div style="float: right;">
                          <Page :total="dataCount" :page-size="pageSize" 
                          :current="pageCurrent" @on-change="changePage"></Page>
                      </div>
                    </div>
              </Content>
            </Layout>
          </Layout>
          <!-- <Footer class="footer">
            <div class="mid-layout row h">
              <div class="col v-m">
                <div class="link">
                  <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_aboutus">关于我们</a>
                  <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_socialrecruit">加入我们</a>
                  <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_cooperative">合作伙伴</a>
                  <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_contactus">联系我们</a>
                  <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_question">意见反馈</a>
                </div>
                <p class="text icp">
                  <a style="cursor:none" class="icpfirst" id="showtitle">Copyright 1998-2020永兴元科技版权所有</a>
                  <a href="http://www.beian.miit.gov.cn/" target="_blank">【粤ICP备】09098678号</a>
                </p>
                <div class="link mini">
                  <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_privacy">隐私声明</a>
                </div>
                <ul class="mid-layout net">
                  <li>
                    <a target="_blank" href="http://szcert.ebs.org.cn/838369a8-55fe-478a-a4c8-1d3044d087d7"><b>工商网监电子标识</b></a>
                  </li>
                  <li><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502000200">
                    <img src="/LONGRISE/LEAP/img/beianbgs.png" alt="">
                    <b>粤公网安备 44030502000200</b></a>
                  </li>
                </ul>
              </div>
            <div class="col v-m t-r">             
            </div>
            </div>
          </Footer> -->
        </Layout>
    </div>
</template>


<script>
import ajax from '@/utils/ajax'
import editor from '@/components/editor/editor'
export default {
    data(){
    return{
	    list:[],
      navList:[],
      id:[],
      pageSize:10,//每页显示多少条
      dataCount:0,//总条数
      pageCurrent:1,//当前页
      columns:[
        {title:'大标题',key:'headline',width:350,tooltip:true},
        {title:'小标题',key:'subtitle',width:350,tooltip:true},
        {title:'所属分类',key:'fl_name',width:150},
        {title:'创建人',key:'creator',width:100},
        {title:'创建时间',key:'createtime',width:220},
        {title:' ',
        key:'content',
        render:(h,params) => {
          return h('div',[
            h('span',{
              style:{
                display:'none'
              }
            })
          ])
        }},
        {title:' ',
        key:'attachment',
        render:(h,params) => {
          return h('div',[
            h('span',{
              style:{
                display:'none'
              }
            })
          ])
        }},
      ],
      data1:[],
      curData:[],
      bean:{},
      bean1:{},
      id:' ',
      modalShow:false,
      headline:'',
      subtitle:'',
      content:'',
    }
  },
  created(){
    this.getdata()   
	},
  methods:{
    getdata(){
	    let name = 'adt_web_getZSKFL'
      this.navList = ajax(name).result
      console.log(this.navList)

      //初始化获取知识管理全部数据
      let name2 = 'adt_web_getZSKInfo'
      this.data1 = ajax(name2).result
      this.curData = this.data1;
      console.log(this.curData)
      //初始化分页判断
      let name3 = 'adt_web_getZSKCount'
      this.bean1 = { 
        "pagenum":this.pageCurrent, 
        "size": this.pageSize
      }
      let data = ajax(name3,this.bean1)
      this.dataCount = Number(data.result[0].count)
      console.log(this.dataCount)
      this.judgPage()
	  },
    turnToPage (name) {
      console.log(name)
      if(name == "knowledge"){
        this.getdata()
      }else{
        this.$router.push({ path: name });
      }
    },
    inPage(name){
      this.id = name 
      this.bean = {
        "parentId":this.id
      }
      let ename = "adt_web_getZSKFL"
      let data = ajax(ename,this.bean)
      this.list = data.result
      console.log(this.list)
      this.bean1 = {
        "id":this.id, 
        "pagenum":this.pageCurrent, 
        "size": this.pageSize
      }
      let ename1 = "adt_web_getZSKInfo"
      let data1 = ajax(ename1,this.bean1)
      this.data1 = data1.result
      console.log(this.data1)

      let ename2 = "adt_web_getZSKCount"
      let data2 = ajax(ename2,this.bean1)
      this.dataCount = Number(data2.result[0].count)
      console.log(data2.result)
      console.log(this.dataCount)
      this.judgPage()
    },
    toPage(name){
      this.id = name 
      console.log(this.id)
      this.bean1 = {
        "id":this.id, 
        "pagenum":this.pageCurrent, 
        "size": this.pageSize
      }
      let ename1 = "adt_web_getZSKInfo"
      let data = ajax(ename1,this.bean1)
      this.data1 = data.result
      console.log(this.data1)

      let ename2 = "adt_web_getZSKCount"
      let data2 = ajax(ename2,this.bean1)
      this.dataCount = Number(data2.result[0].count)
      console.log(this.dataCount)
      this.judgPage()
    },
    changePage (index) {
      this.pageCurrent = index
      let name = "adt_web_getZSKInfo"
      let bean = {
        "id":this.id, 
        "pagenum":this.pageCurrent, 
        "size": this.pageSize
      }
      this.data1 = ajax(name,bean).result
			console.log(this.data1)
			this.curData = this.data1
    },
    judgPage(){
      //初始化显示分页判断，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if(this.dataCount < this.pageSize){
          this.curData = this.data1;
      }else{
         this.curData = this.data1.slice(0,this.pageSize);
      }
    },
    editorShow(columns){
      this.headline = columns.headline
      this.subtitle = columns.subtitle
      this.modalShow = !this.modalShow
      this.attachment = columns.attachment
      console.log(this.attachment)
      if(!columns.content){
        this.content = ''
        return
      }else{
      //本地测试路径
      //this.content = columns.content.replace(new RegExp("@serveruirl@","gm"),'http://203.91.37.111' + '/' + 'TWO/')
      //打包路径
      this.content = columns.content.replace(new RegExp("@serveruirl@","gm"),location.origin + "/" + location.pathname.split("/")[1]+'/')
      }
    },
  },
  components:{
    editor:editor,
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
.layout-logo{
  width: 105px;
  height: 38px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 12px;
  left: 20px;
}
.layout-nav{
  width: 700px;
  margin: 0 auto;
  margin-left: 150px;
}
.login{
  width: 310px;
  margin: 0 auto;
  margin-right: 0;
}
.mid{
  width: 1200px;
  margin: 0 auto;
}
/* .LC_form{
  padding-left:5px;
  padding-right:5px;
}
.LC_form_box{
  height: 100%;
  width: 100%;
  overflow: auto;
}
.LC_form_tab{
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  width: 100%;
  font-size:14px;
  color: #404040
}
.LC_form_tab_td{
  padding: 5px 10px;
  height: 30px;
  vertical-align: middle;
}
.LC_form_tab_th{
  text-align: right;
  font-weight: normal;
  font-size: 14px;
  background: #f3f3f3;
  width:80px;
}
.LC_form_tab_th, .LC_form_tab_td{
  border: 1px solid #ccc
} */

.footer{
  background: #757575;
  padding:20px 0;
}
.message {
  width: 1200px;
  margin: 0 auto;
}
.tit {
  font-size: 20px;
  text-align: center;
  padding: 10px 0 30px 0;
}
.small{
  margin-top:20px;
}
.h {
    height: 100%;
}
.row {
    display: table;
    table-layout: fixed;
    border-collapse: collapse;
}
.v-m {
    vertical-align: middle;
}
.col {
    display: table-cell;
}
.link {
    margin-bottom: 15px;
}
.link a:first-child {
    padding-left: 0;
    border-left: none;
}
.link a {
    text-decoration: none;
    color: #fff;
    font-size: 18px;
    padding: 0 1em;
    border-left: 2px solid #fff;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    white-space: nowrap;
}
.footer .text {
    margin-top: 20px;
    margin-bottom: 10px;
}
.footer p {
    font-size: 16px;
    color: #cecece;
    margin: 0;
}
.icp a {
    color: #cecece;
}
a {
    text-decoration: none;
    cursor: pointer;
}
.link.mini a {
    padding: 0 6px;
    font-size: 16px;
    color: #cecece;
    height: 16px;
    line-height: 16px;
    border-color: #cecece;
}
.net {
    font-size: 0;
}
.mid-layout {
    width: 1200px;
    margin: 0 auto;
}
.net li {
    font-size: 12px;
    border: 0 solid #cecece;
    display: inline-block;
    padding: 2px 10px;
    margin-right: 10px;
    cursor: pointer;
    transition: .3s;
}
.net li a {
    color: #cecece;
}
.t-r {
    text-align: right;
}
.footer img {
    margin-left: 20px;
}

</style>