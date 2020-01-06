<template>
   <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="1" @on-select="turnToPage">
                    <div class="layout-nav">
                        <MenuItem name="knowledge">
                            <Icon type="ios-navigate"></Icon>
                            知识管理
                        </MenuItem>
                        <MenuItem name="2">
                            <Icon type="ios-keypad"></Icon>
                            文件管理
                        </MenuItem>
                        <MenuItem name="3">
                            <Icon type="ios-analytics"></Icon>
                            配置管理
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            样式管理
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            系统大纲
                        </MenuItem>
                        <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
                            网站管理
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
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                         <Menu mode="horizontal" theme="light" @on-select="toPage">
                            <MenuItem :name="liv.id" v-for ="(liv,index) in list" :key="index">
                                <Icon type="ios-paper" />
                                {{liv.name}}
                            </MenuItem>
                         </Menu>
                          <Table stripe width='100%' :columns="columns1" :data="curData"></Table>
                          <div style="margin: 10px;overflow: hidden">
                              <div style="float: right;">
                                  <Page :total="dataCount" :page-size="pageSize" 
                                  :current="pageCurrent" @on-change="changePage"></Page>
                              </div>
                          </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>


<script>
import ajax from '@/api/ajax'
export default {
    data(){
    return{
	    list:[],
      navList:[],
      id:[],
      pageSize:10,//每页显示多少条
      dataCount:0,//总条数
      pageCurrent:1,//当前页
      columns1:[
            // {title:'序号',
            //  key:'index',
            //  render: (h, params) => {
            //     return h('div', [
            //         h('Icon', {
            //           props: {
            //             type: 'person'
            //           }
            //         }),
            //         h('strong', params.row.name)
            //     ]);
            //   }
            // },
            {title:'大标题',key:'headline',width:350,tooltip:true},
            {title:'小标题',key:'subtitle',width:350,tooltip:true},
            {title:'所属分类',key:'fl_name',width:150},
            {title:'创建人',key:'creator',width:100},
            {title:'创建时间',key:'createtime',width:220},
						{title:'操作',
						 key:'handle',
						 width:210,
						 render: (h, params) => {
                return h('div', [
                    h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.show(params.index)
                            }
                        }
                    }, '查看'),
                    h('Button', {
                        props: {
                            type: 'warning',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: () => {
                                this.remove(params.index)
                            }
                        }
                    }, '修改'),
                    h('Button', {
                        props: {
                            type: 'error',
                            size: 'small'
                        },
                        on: {
                            click: () => {
                                this.remove(params.index)
                            }
                        }
                    }, '删除')
                ]);
            }
					}
      ],
      data1:[],
      curData:[],
      bean:{},
      bean1:{},
      name:' ',
    }
  },
  created(){
    this.getdata()   
	},
  methods:{
    getdata(){
	  let name = 'adt_web_getZSKFL'
      let data = ajax(name)
      this.navList = data.result
		console.log(this.navList)
	  },
    turnToPage (name) {
      this.$router.push({ path: name });
    },
    inPage(name){
      this.name = name 
      console.log(this.name)
      this.bean = {
        "parentId":this.name
      }
      let ename = "adt_web_getZSKFL"
      let data = ajax(ename,this.bean)
      this.list = data.result
      console.log(this.list)
      this.bean1 = {
        "id":this.name, 
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

    //   let _start = ( this.pageCurrent - 1 ) * this.pageSize
    //   let _end = this.pageCurrent * this.pageSize
    //   this.curData = this.data1.slice(_start,_end)
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if(this.dataCount < this.pageSize){
          this.curData = this.data1;
      }else{

         this.curData = this.data1.slice(0,this.pageSize);
      }
    },
    toPage(name){
      this.name = name 
      console.log(this.name)
      this.bean1 = {
        "id":this.name, 
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
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if(this.dataCount < this.pageSize){
          this.curData = this.data1;
      }else{
         this.curData = this.data1.slice(0,this.pageSize);
      }
    },
    changePage (index) {
        this.pageCurrent = index
        let name = "adt_web_getZSKInfo"
        let bean = {
          "id":this.name, 
          "pagenum":this.pageCurrent, 
          "size": this.pageSize
        }
        this.data1 = ajax(name,bean).result
				console.log(this.data1)
				this.curData = this.data1
      //  //需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
      //   let _start = (this.pageCurrent - 1) * this.pageSize;
      //   //需要显示结束数据的index
      //   let _end = this.pageCurrent * this.pageSize;
      //   //截取需要显示的数据
      //   this.curData = this.data1.slice(_start, _end);
    }
  }
}
</script>

<style>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-nav{
    width: 100%;
    margin: 0 auto;
    margin-right: 20px;
}
</style>