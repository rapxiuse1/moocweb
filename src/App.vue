<template>
  <div id="app">
    <router-view/>
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

</style>
