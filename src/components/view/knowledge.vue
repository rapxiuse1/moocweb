<template>
   <div class="layout">
        <Layout :style="{minHeight:'100vh'}">
          <m-header></m-header>
              <Content :style="{padding: 0, minHeight: '280px', background: '#fff'}">
                <div class="menu">
                  <Menu mode="horizontal" theme="dark" width="auto" @on-select="inPage">
                    <MenuItem name="all">全部</MenuItem>
                      <MenuItem :name="nav.id"  v-for ="(nav,index) in navList" :key="index">
                        {{nav.name}}
                    </MenuItem>
                  </Menu>
                </div>
                <div class="content">
                  <div class="menu2">
                    <Menu mode="horizontal" theme="dark" @on-select="toPage">
                      <MenuItem :name="liv.id" v-for ="(liv,index) in list" :key="index">
                        {{liv.name}}
                      </MenuItem>
                  </Menu>
                  </div>
                  <div class="bor"></div>
                  <div class="table">
                    <Table stripe width='100%' :columns="columns" :data="curData" @on-row-click="detailShow">
                    </Table>
                    <div class="page" style="margin: 10px;overflow: hidden">
                      <!-- <a>首页</a>
                      <a>上一页</a>
                      <a>下一页</a>
                      <a>尾页</a> -->
                      <Page :total="dataCount" :page-size="pageSize" 
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
    inPage(name){
      console.log(name)
      if(name == "all"){
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
.menu{
  width:1920px;
  height:64px;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  opacity:1;
  border-bottom:2px solid rgba(0,0,0,0.16);
}
.menu .ivu-menu{
  margin-left: 360px;
  background:rgba(255,255,255,1);
}
.menu .ivu-menu .ivu-menu-item{
  color: rgba(51, 51, 51, 1);
}
.menu .ivu-menu .ivu-menu-item-active,.menu .ivu-menu .ivu-menu-item:hover{
  color: rgba(50, 135, 255, 1);
}

.menu2{
  width:1920px;
  height:64px;
  background:rgba(255,255,255,1);
  opacity:1;
}
.bor{
  width:1200px;
  height:0px;
  border:2px solid rgba(34,87,180,1);
  opacity:1;
  margin-left: 360px;
}
.menu2 .ivu-menu{
  margin-left: 720px;
  background:rgba(255,255,255,1);
}
.menu2 .ivu-menu .ivu-menu-item{
  color: rgba(51, 51, 51, 1);
}
.menu2 .ivu-menu .ivu-menu-item-active,.menu2 .ivu-menu .ivu-menu-item:hover{
  color: rgba(50, 135, 255, 1);
}

.table{
  margin-left: 384px;
}
.page .ivu-page{  
  float: right;
}
/* .page a{
  width:56px;
  height:20px;
  border:1px solid rgba(34,87,180,1);
  opacity:1;
  border-radius:3px;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
} */
</style>