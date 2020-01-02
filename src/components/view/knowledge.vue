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
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>


<script>
export default {
    data(){
    return{
      name:'',
    }
  },
  created(){
    this.getdata()
  },
  methods:{
    getdata(){
      var param = {name:"adt_web_getZSKFL"}
      var bean={bean: JSON.stringify(param)}
      // this.$http({
		  //    method:'post',
		  //    url:'http://192.168.0.151:8060/TWO/restservices/web/adt_webMain/query',
		  //  	 data:bean
			// })
			// .then(response => {
      //   console.log(111)
      // })
      var url = "http://203.91.37.111//TWO/restservices/web/adt_webMain/query"
      var param = {"name":"adt_web_getZSKFL"}
      this.$.ajax({ 
        type: "post", 				 
        url: url, 
        data: { bean: JSON.stringify(param)}, 
        async: false,
        dataType: "json",
        success: function(data){
          console.log(data)
          this.list = data.result
          console.log(this.list)
        }
      });
    },
    turnToPage (name) {
        this.$router.push({ path: name });
    },
  }
}
</script>

<style>

</style>