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
                    <Menu theme="light" width="auto">
                        <Submenu name="1" v-for ="(nav,index) in navList" :key="index">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                {{nav.name}}
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <!-- <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem> -->
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
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