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
                         <!-- <Menu mode="horizontal" theme="light" @on-select="toPage">
                            <MenuItem :name="liv.id" v-for ="(liv,index) in list" :key="index">
                                <Icon type="ios-paper" />
                                {{liv.name}}
                            </MenuItem>
                         </Menu> -->
                          <Table stripe :columns="columns1" :data="data1" ></Table>
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
            {title:'大标题',key:'headline',width:400},
            {title:'小标题',key:'subtitle',width:400},
            {title:'所属分类',key:'fl_name',width:100},
            {title:'创建人',key:'creator',width:80},
            {title:'创建时间',key:'createtime',width:200},
						{title:'操作',
						 key:'handle',
						 width:200,
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
                    }, 'View'),
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
                    }, 'Delete')
                ]);
            }
					}
        ],
        data1:[],
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
      console.log(name)
      let bean = {
        "id":name
      }
      let ename = "adt_web_getZSKInfo"
      let data = ajax(ename,bean)
      this.data1 = data.result
      console.log(this.data1)
    },
    toPage(name){
      console.log(name)
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