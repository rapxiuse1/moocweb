<template>
  <div id="app">
    <router-view/>
    <!-- <div class="layout">
      <Layout>
        <m-header></m-header>
        <m-content></m-content>
        <m-footer></m-footer>
      </Layout>
    </div> -->
  </div>
</template>

<script>
import MHeader from '@/components/header/header.vue'
import MContent from '@/components/content/content.vue'
import MFooter from '@/components/footer/footer.vue'
export default {
  name: 'App',
  components:{
    MFooter,
    MHeader,
    MContent
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
</style>
