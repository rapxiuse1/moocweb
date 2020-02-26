<template>
   <div class="layout">
        <Layout :style="{minHeight:'100vh'}">
          <m-header></m-header>
            <Layout>
              <Sider hide-trigger :style="{background: '#fff'}">
                  <Menu theme="light" width="auto" @on-select="inPage">
                      <MenuItem name="all">
                      <Icon type="md-menu"/>
                      全部
                      </MenuItem>
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
                    <Table stripe width='100%' :columns="columns" :data="curData" @on-row-click="detailShow">
                    </Table>
                    <div style="margin: 10px;overflow: hidden">
                      <div style="float: right;">
                        <Page :total="dataCount" :page-size="pageSize" 
                        :current="pageCurrent" @on-change="changePage"></Page>
                      </div>
                    </div>
              </Content>
            </Layout>
          </Layout>
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
</style>