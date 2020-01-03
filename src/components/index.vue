<template>
  <Menu mode="horizontal" theme="dark" :active-name="1" @on-select="turnToPage">
        <MenuItem  name="knowledge">
                <Icon type="ios-stats" />
                知识管理
        </MenuItem >
        <MenuItem  name="1">
                <Icon type="ios-stats" />
                文件管理
        </MenuItem >
        <MenuItem  name="1">
                <Icon type="ios-stats" />
                配置管理
        </MenuItem >
        <MenuItem  name="1">
                <Icon type="ios-stats" />
                样式管理
        </MenuItem >
        <MenuItem  name="1">
                <Icon type="ios-stats" />
                系统大纲
        </MenuItem >
        <MenuItem  name="1">
                <Icon type="ios-stats" />
                网站管理
        </MenuItem >
    </Menu>
</template>

<script>
import ajax from '../api/ajax'
export default {
  name: 'index',
  data () {
    return {
      
    }
  },
  created(){
    
  },
  methods:{
    turnToPage (name) {
        this.$router.push({ path: name });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
