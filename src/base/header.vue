<template>
	<div class = "header">
		<Header>
			<Menu mode="horizontal" theme="dark"  @on-select="turnToPage">
				<div class="header-logo"></div>
				<div class="header-nav">
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
				</div>
  		</Menu>
		</Header>
	</div>

</template>

<script>
import ajax from '../api/ajax'
export default {
	name: 'MoocHeader',
	components: 'MoocHeader',
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
.header-nav{
  width: 100%;
  margin: 0 auto;
  margin-left: 20px;
}
.header-logo{
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: -25px;

}
</style>