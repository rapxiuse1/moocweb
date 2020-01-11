<template>
  <div class="layout">
    <Layout :style= "{minHeight:'100vh'}">
      <m-header></m-header>
      <Content>
        <h3 class="tit">大标题:{{this.$route.query.headline}}</h3>
        <h3 class="tit2">小标题:{{this.$route.query.subtitle}}</h3>
        <span v-html="this.$route.query.content" class="txt">正文:{{this.$route.query.content}}</span>
      </Content>
      <m-footer></m-footer>
    </Layout>
  </div>
  <!-- <div>大标题:{{this.$route.query.headline}}</div>
  <div>小标题:{{this.$route.query.subtitle}}</div>
  <div v-html="this.$route.query.content">正文:{{this.$route.query.content}}</div> -->
</template>

<script>
import MHeader from '@/components/header/header.vue'
import MFooter from '@/components/footer/footer.vue'
export default {
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