<template>
  <div class="layout">
    <Layout :style="{minHeight:'100vh',background: '#F5F5F5'}">
      <m-header></m-header>
      <Content>
        <h3 class="tit">大标题:{{this.$route.params.headline}}</h3>
        <h3 class="tit2">小标题:{{this.$route.params.subtitle}}</h3>
        <span v-html="this.$route.params.content" class="txt">正文:{{this.$route.params.content}}</span>
      </Content>
      <m-footer></m-footer>
    </Layout>
  </div>
</template>

<script>
import MHeader from '@/components/header/header.vue'
import MFooter from '@/components/footer/footer.vue'
export default {
  data(){
    return{
      params:'',
      headline:'',
      subtitle:'',
      content:''
    }
  },
  created(){//params传参解决地址栏带参数，sessionStorage解决刷新参数丢失
    
  },
  mounted(){
    // this.headline = sessionStorage.getItem("headline")
    // this.subtitle = sessionStorage.getItem("subtitle")
    // this.content = sessionStorage.getItem("content")
    
  },
  components:{
    MFooter,
    MHeader,
  }
}
</script>

<style scoped>
.tit{
  font-size: 26px;
  color: #141a1da6;
  text-align: center;
  padding: 25px 0 30px 0;
}
.tit2{
  font-size: 15px;
  color: #141a1da6;
  text-align: center;
  padding: 0px 0 30px 0;
}
</style>