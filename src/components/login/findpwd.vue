<template>
    <div class="login">
        <div class="from-wrap">
            <h2>密码找回</h2>
            <Form ref="loginData" :model="loginData" :label-width="100">
                <FormItem label="用户名" prop="acct">
                    <Input type="text" v-model="loginData.acct" placeholder="请输入您的用户名"></Input>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input type="text" v-model="loginData.phone" placeholder="请输入您的手机号"></Input>
                </FormItem>
                <FormItem label="证件号" prop="cardno">
                    <Input type="text" v-model="loginData.cardno" placeholder="请输入您的证件号"></Input>
                </FormItem>
                <FormItem class="form-footer">
                    <Button type="primary" @click="handleSubmit('loginData')">密码找回</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import $ from 'jQuery'
import ajax from '@/utils/ajax'
import MFooter from '@/components/footer/footer.vue'
export default {
    data () {
    return {
      loginData: {
        acct:'',
        phone:'',
        cardno:'',
      },
      resultdesc:'',
    }
  },
   mounted() {
    this.login = new Login({
        check: false, 
        basePath: this.global_.loginUrl, 
        dealResult: false
    });
    console.log(this.login)
    let vm = this
    this.login.request(function(method, param) {
      ajax(method, param, function(data) {
          console.log(data.resultdesc)
          vm.resultdesc = data.resultdesc
          vm.alert(data);
      })
    })
  }, 

  methods: {
    alert(data) {
      console.log(data)
      if(data.result == true){
        this.$Message.info(data.resultdesc) 
        this.$router.push('knowledge') 
      }else{
        this.$Message.info(data.resultdesc)
      }
    }, 
    handleSubmit (name) {
      console.log(this.loginData.phone)
      let a = this.login.bindFind({
        username: this.loginData.acct,
        phone: this.loginData.phone,
        cardno: this.loginData.cardno,
      })
    },
  },
  components:{
    MFooter,
  }
}

</script>

<style scoped>
.login {
  width: 100%;
  height: 800px;
  background-color: #515A6E;
  position: relative;
}
.login .from-wrap{
  position: fixed;
  left: 50%;
  margin-left: -200px;
  top: 50%;
  margin-top: -150px;
  width: 420px;
  height: 300px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 30px;
}
.login h2 {
  text-align: center;
  margin-bottom: 20px;
}
.login FormItem {
  margin-bottom: 15px;
}
.login .form-footer {
  text-align: right;
}
.ivu-form-item-required .ivu-form-item-label:before {
  display: none;
}
</style>