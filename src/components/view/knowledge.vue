<template>
   <div class="layout">
      <Layout :style="{minHeight:'100vh'}">
          <m-header></m-header>
            <Content :style="{padding: 0, minHeight: '280px', width:'62.5%',background: '#fff'}">
                <div class="tips">
                  <img class="problem" src="@/assets/problem.png" alt="">
                  <span class="text">常见问题</span>
                </div>
                <div class="menu">
                  <Menu mode="horizontal" theme="dark" width="auto" @on-select="inPage" active-name="all">
                    <MenuItem name="all">全部</MenuItem>
                      <MenuItem :name="nav.id"  v-for ="(nav,index) in navList" :key="index">
                        {{nav.name}}
                      </MenuItem>
                  </Menu>
                </div>
                <div class="content">
                  <span class="type">类型:</span>
                  <div class="menu2">
                    <Menu mode="horizontal" theme="dark" @on-select="toPage">
                      <MenuItem :name="liv.id" v-for ="(liv,index) in list" :key="index">
                        {{liv.name}}
                      </MenuItem>
                    </Menu>
                  </div>
                  <div class="table">
                    <Table width='100%' :columns="columns" :data="curData" @on-row-click="detailShow">
                    </Table>
                  <div class="page" style="margin: 10px;overflow: hidden">
                    <!-- <a>首页</a>
                    <a>上一页</a>
                    <a>下一页</a>
                    <a>尾页</a> -->
                    <Page :total="dataCount" :page-size="pageSize" show-total show-elevator
                    :current="pageCurrent" @on-change="changePage">
                    </Page>
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
	    list:[],
      navList:[],
      id:[],
      pageSize:10,//每页显示多少条
      dataCount:0,//总条数
      pageCurrent:1,//当前页
      columns:[
        {title:'大标题',key:'headline',align: 'center',width:320,tooltip:true},
        {title:'小标题',key:'subtitle',align: 'center',width:320,tooltip:true},
        {title:'所属分类',key:'fl_name',align: 'center',width:160},
        {title:'创建人',key:'creator',align: 'center',width:160},
        {title:'创建时间',key:'createtime',align: 'center',width:200},
        {title:' ',
        key:'content',
        align: 'center',
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
        align: 'center',
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
  mounted(){

  },
  methods:{
    getdata(){
	    let name = 'adt_web_getZSKFL'
      this.navList = ajax(name).result
      console.log(this.navList)
      this.list = ajax(name).result
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
    inPage(name){
      console.log(name)
      if(name == "all"){
        this.list = null
        this.getdata()
      }else{
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
      }
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
    detailShow(columns){
      console.log(columns)
      if(!columns.content){
        this.content = ''
      }else{
      //本地测试路径
      //columns.content = columns.content.replace(new RegExp("@serveruirl@","gm"),'http://203.91.37.111' + '/' + 'TWO/')
      //打包路径
      this.content = columns.content.replace(new RegExp("@serveruirl@","gm"),location.origin + "/" + location.pathname.split("/")[1]+'/')
      }
      this.$router.push({path:'/detail',query:{headline:columns.headline,subtitle:columns.subtitle,content:columns.content}})
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
.ivu-layout-content{
  margin-left: 18%;
  margin-right: 18%;
}
.menu{
  background:rgba(255,255,255,1);
  opacity:1;
  border-bottom:2px solid rgba(50,135,255,1);
}
.menu .ivu-menu{
  background:rgba(255,255,255,1);
  height: 32px;
  z-index: 99;
}
.menu .ivu-menu .ivu-menu-item{
  color: rgba(51, 51, 51, 1);
  width: 88px;
  font-size:16px;
  font-weight:400;
  line-height:33px;
  font-family:Microsoft YaHei;
  text-align: center;
  opacity:1;
}
.menu .ivu-menu .ivu-menu-item-active,.menu .ivu-menu .ivu-menu-item:hover{
  color: rgba(50, 135, 255, 1);
}
.menu .ivu-menu .ivu-menu-item-selected{
  background: rgba(50, 135, 255, 1);
  color:rgba(255,255,255,1);
}
.menu .ivu-menu .ivu-menu-item-selected:hover{
  color: rgba(255,255,255,1);
}
.type{
  width:36px;
  height:24px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:24px;
  color:rgba(153,153,153,1);
  opacity:1;
  vertical-align: bottom;
  display: inline-block;
  margin-bottom: 15px;
}
.menu2{
  display: inline-block;
  background:rgba(255,255,255,1);
  opacity:1;
  vertical-align: middle;
  margin-top: 15px;
  margin-bottom: 15px;
}
.menu2 .ivu-menu{
  background:rgba(255,255,255,1);
  height: 24px;
  z-index: 99;
}
.menu2 .ivu-menu .ivu-menu-item{
  color: rgba(51, 51, 51, 1);
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:24px;
  opacity:1;
}
.menu2 .ivu-menu .ivu-menu-item-active,.menu2 .ivu-menu .ivu-menu-item:hover{
  color: rgba(50, 135, 255, 1);
}
.page .ivu-page{  
  float: right;
}
.tips{
  margin-top: 30px;
  margin-bottom: 30px;
}
.problem{
  width: 18px;
  height: 18px;
  padding-top: 1px;
  vertical-align: middle;
}
.text{
  width:64px;
  height:21px;
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:21px;
  color:rgba(102,102,102,1);
  vertical-align: middle;
  opacity:1;
}
</style>
<style>
.table .ivu-table-wrapper .ivu-table th{
  height: 40px;
  background:rgba(245,250,255,1);
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:40px;
  color:rgba(34,87,180,1);
  opacity:1;
}
</style>