<template>
   <div class="layout">
        <Layout :style="{minHeight:'100vh',background: '#F5F5F5'}">
          <m-header></m-header>
          <Content :style="{padding: 0, minHeight: '280px', width:'62.5%', background: '#F7F4F8'}">
            <div class="left">
              <img class="profile" src="@/assets/profile.png" alt="">
              <p class="number">15256388055</p>
              <ul class="ul">
                <li v-for="(name,index) in nameList" :key="index" :class='{active:index==activeName}' @click="goTab(index)">
                  {{name}}
                </li>
              </ul>
            </div>
            <div class="right">
              <div class="tab1" v-show="tab1Show">
                <div class="upProfile">
                  <img class="profile1" src="@/assets/profile1.png" alt="">
                  <a @click="changeShow = true">更换头像</a>
                </div>
                <div class="box" style="margin-top: 16%;">
                  <div class="top" style="height:30px">
                    <div class="title">基本资料</div>
                    <div class="button" @click="editData" v-if="dataShow">编辑资料</div>
                    <div class="button1" @click="editData" v-else>保存</div>
                  </div>
                  <div class="staright"></div>
                   <div v-if="dataShow">
                    <p>用户名：<span>{{userName}}</span></p>
                    <p>手机号：<span>{{phone}}</span></p>
                    <p>证件号：<span>{{idCard}}</span></p>
                   </div>
                   <div v-else>
                    <p>用户名：<input type="text" v-model="userName"></p>
                    <p>手机号：<input type="text" v-model="phone"></p>
                    <p>证件号：<input type="text" v-model="idCard"></p>
                   </div>
                </div>
                <div class="box" style="margin-top: 8%;">
                  <div class="top" style="height:30px">
                    <div class="title">修改密码</div>
                    <div class="button" @click="editPassword" v-if="passwordShow">修改密码</div>
                    <div class="button1" @click="editPassword" v-else>保存</div>
                  </div>
                  <div class="staright"></div>
                   <div v-if="passwordShow">
                    <p>原始密码：<span>{{oldpassword}}</span></p>
                    <p>新 密 码：<span style="padding-left:5px">{{newpassword}}</span></p>
                    <p>确认密码：<span>{{confirmpassword}}</span></p>
                   </div>
                   <div v-else>
                    <p>原始密码：<input type="text" v-model="oldpassword"></p>
                    <p>新 密 码：<input type="text" v-model="newpassword" style="margin-left:5px"></p>
                    <p>确认密码：<input type="text" v-model="confirmpassword" value=""></p>
                   </div>
                </div>
              </div>
              <div class="tab2" v-show="tab2Show">
                <div class="menu">
                  <Menu mode="horizontal" theme="dark" width="auto" active-name="test">
                    <MenuItem name="test">我的在线考试</MenuItem>
                    <MenuItem name="survey">我的问卷调查</MenuItem>
                    <MenuItem name="feed">我的意见反馈</MenuItem>
                  </Menu>
                </div>
                <p class="text1">已完成的</p>
                <div class="resource-mod-bd">
                <div class="clearfix">
                  <a class="mock-jobs-item">
                    <p class="mock-jobs-name">模拟试卷(一)</p> 
                    <img class="mock-jobs-img" src="@/assets/test.png" alt=""/>
                    <p class="mock-jobs-name1">模拟试卷(一)</p> 
                    <p class="time">完成时间：2020-3-24</p>            
                  </a>
                  <a class="mock-jobs-item">
                    <p class="mock-jobs-name">模拟试卷(一)</p> 
                    <img class="mock-jobs-img" src="@/assets/test.png" alt=""/>
                    <p class="mock-jobs-name1">模拟试卷(一)</p> 
                    <p class="time">完成时间：2020-3-24</p>            
                  </a>
                  <a class="mock-jobs-item">
                    <p class="mock-jobs-name">模拟试卷(一)</p> 
                    <img class="mock-jobs-img" src="@/assets/test.png" alt=""/>
                    <p class="mock-jobs-name1">模拟试卷(一)</p> 
                    <p class="time">完成时间：2020-3-24</p>            
                  </a>
                  <a class="mock-jobs-item">
                    <p class="mock-jobs-name">模拟试卷(一)</p> 
                    <img class="mock-jobs-img" src="@/assets/test.png" alt=""/>
                    <p class="mock-jobs-name1">模拟试卷(一)</p> 
                    <p class="time">完成时间：2020-3-24</p>            
                  </a>
                  <a class="mock-jobs-item">
                    <p class="mock-jobs-name">模拟试卷(一)</p> 
                    <img class="mock-jobs-img" src="@/assets/test.png" alt=""/>
                    <p class="mock-jobs-name1">模拟试卷(一)</p> 
                    <p class="time">完成时间：2020-3-24</p>            
                  </a>                   
                </div>                                
              </div> 
              </div>
              <div class="tab3" v-show="tab3Show">
              </div>
            </div>
          </Content>
          <Modal v-model="changeShow" width="600">
            <p slot="header" class="modalHead">
              <span>编辑头像</span>
            </p>
            <div class="modalleft">
              <Upload
                ref="uploadImg"
                :format="['jpg','png']"
                :max-size="3072"
                action="http://template.ecois.info/image/upload"
                :before-upload="handleUpload"
              >
                <Button type="primary">选择图片</Button>
              </Upload>
              <p>支持jpg、png格式的图片，大小不超过3M</p>
            </div>
            <div class="modalright">
               <div class="preview">
                 <img class="previewImg" :src="updSrc" alt="" v-if="updSrc">
                 <!-- <img src="" alt=""> -->
               </div>
               <a class="delete" @click="deleteImg">删除</a>


            <!-- <div v-for="(item, index) in file"  :key="index">
              <a href="javascript:;"  @click="removeFile(item.keyID)">删除</a>
            </div> -->
               <span>预览</span>
            </div>
            <div slot="footer">
              <Button class="button2">保存</Button>
              <Button class="button3">取消</Button>
            </div>
          </Modal>           
          <!-- <vue-Cropper
           style="width:100px;height:300px"
           ref="cropper"
           :img="attach.customaryUrl"
           :autoCrop="options.autoCrop"
           :fixedBox="options.fixedBox"
           :canMoveBox="options.canMoveBox"
           :autoCropWidth="options.autoCropWidth"
           :autoCropHeight="options.autoCropHeight"
           :centerBox="options.centerBox"
           @realTime="realTime"
          >
          </vue-Cropper> -->
          <l-Modal ref="loginModal"></l-Modal>
          <m-footer></m-footer>
        </Layout>
    </div>
</template>

<script>
import MHeader from '@/components/header/header.vue'
import MFooter from '@/components/footer/footer.vue'
import lModal from '@/components/login/modal.vue'
import ajax from '@/utils/ajax'

export default{
  data(){
    return{
      updSrc:'',
      file:[],
      userName:'我是个昵称',
      phone:'1525388055',
      idCard:'121200199501012323',
      dataShow:true,
      passwordShow:true,
      changeShow:false,
      tab1Show:true,
      tab2Show:false,
      tab3Show:false,
      oldpassword:'',
      newpassword:'',
      confirmpassword:'',
      activeName:0,
      nameList:['个人信息','我的参与','我的常见问题']
    }
  },
  created(){
    
  },
  methods:{
    editData(){
      this.dataShow = !this.dataShow
    },
    editPassword(){
      this.passwordShow = !this.passwordShow
    },
    goTab(index){
      console.log(index)
      this.activeName = index
      if(index == 0){
        this.tab1Show = true
        this.tab2Show = false
        this.tab3Show = false
      }else if(index == 1){
        this.tab1Show = false
        this.tab2Show = true
        this.tab3Show = false
      }else{
        this.tab1Show = false
        this.tab2Show = false
        this.tab3Show = true
      }
    },
     handleUpload (file) { // 上传文件前的事件钩子
      // 选择文件后 这里判断文件类型 保存文件 自定义一个keyid 值 方便后面删除操作
      let keyID = Math.random().toString().substr(2);
      file['keyID'] = keyID;
      // 保存文件到总展示文件数据里
      this.file.push(file);
      //利用Blob预览本地上传的图片
      this.handlePreview();
      // 返回 false 停止自动上传 我们需要手动上传
      return false;
    },
    // removeFile (keyID) { 
    //   // 删除总展示文件里的当前文件
    //   this.file = this.file.filter(item => {
    //     return item.keyID != keyID
    //   })
    //   this.updSrc = ""
    // },
    deleteImg(){
      this.updSrc = ""
    },
    handlePreview(){
       const self = this;
       const reader = new FileReader();
			 reader.readAsArrayBuffer(this.file[0]);
  			reader.onload=function(e){
  				const bf = this.result;
  				const blob = new Blob([bf],{type:"text/plain"});
          const str = URL.createObjectURL(blob);
          self.updSrc = str;
          console.log(self.updSrc)
  		 };
    },
    // upload () { // 上传文件
    //   this.$refs.uploadImg.post(this.file[0]);
    // },
    // ok(){

    // },
    // cancel(){

    // }
  },
  components:{
    MFooter,
    MHeader,
    lModal,
  }
}
</script>
<style scoped>
.layout{
  border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout-content{
  margin: 2% 22%;
  border-radius:5px;
  display: flex;
  justify-content: flex-start;
}
.left{
  width: 13.6%;
  height: 314px;
  background: #FFFFFF;
  text-align: center;
}
.profile{
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
  margin-top: 14%;
  border-radius:50%;
  opacity:1;
}
.upProfile{
  width: 90px;
  height: 90px;
  position: relative;
  margin-top: 3.6%;
  margin-left: 46%;
  border-radius: 50%;
  overflow: hidden;
}
.profile1{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.upProfile a{
  height: 28px;
  background:rgba(51,51,51,1);
  opacity:0.5;
  text-align: center;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height: 28px;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  color:rgba(255,255,255,1);
}
.number{
  margin-top: 5%;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
  color:rgba(0,0,0,1);
  opacity:1;
}
.ul{
  margin-top: 22px;
}
.ul li{
  list-style: none;
  padding-top: 12%;
}
.ul li:after{
  content: "";
  display: block;
  height: 1px;
  left: 0;
  background:rgba(238,238,238,1);
  margin-top: 12%;
}
.ul li:hover{
  background:rgba(245,250,255,1);
  border-left:4px solid rgba(50,135,255,1) ;
  cursor: pointer;
}
.active{
  background:rgba(245,250,255,1); 
  border-left:4px solid rgba(50,135,255,1) ;
}
.ul li a{
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:21px;
  color:rgba(0,0,0,1);
  opacity:1;
}
.right{
  margin-left: 32px;
  width: 83.6%;
  height: 767px;
  background: #FFFFFF;
  position: relative;
}
.box{
  margin-left: 8%;
  margin-right: 8%;
  position: relative;
}
.title{
  float: left;
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:21px;
  color:rgba(51,51,51,1);
  opacity:1;
}
.button{
  float: right;
  text-align: center;
  width:67px;
  height:22px;
  border:1px solid rgba(50,135,255,1);
  opacity:1;
  border-radius:3px;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:21px;
  color:rgba(50,135,255,1);
  opacity:1;
}
.button1{
  float: right;
  text-align: center;
  width:67px;
  height:22px;
  background:rgba(50,135,255,1);
  opacity:1;
  border-radius:3px;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:21px;
  color:#FFFFFF;
  opacity:1;
}
.button:hover,.button1:hover{
  cursor: pointer;
}
.staright{
  width: 100%;
  height:0px;
  border:1px solid rgba(238,238,238,1);
}
.box p{
  margin-top: 3%;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
  color:rgba(153,153,153,1);
  opacity:1;
}
.box span{
  margin-left: 1%;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
  color:rgba(51,51,51,1);
  opacity:1;
}
.box input{
  padding-left: 8px;
  width:330px;
  height:24px;
  background:rgba(255,255,255,1);
  border:1px solid rgba(238,238,238,1);
  opacity:1;
  border-radius:3px;
}
.modalHead{
  text-align: center;
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  line-height:21px;
  color:rgba(102,102,102,1);
  opacity:1;
}
.modalleft{
  position: relative;
  display: inline-block;
  width: 60.4%;
  height: 320px;
  background:rgba(245,245,245,1);
}
.modalleft>>>.ivu-btn-primary{
  width:145px;
  height:40px;
}
.ivu-upload{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -72px;
  margin-top: -20px;
}
.modalleft p{
  height:16px;
  margin-left: -33%;
  margin-top: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
  color:rgba(153,153,153,1);
  opacity:1;
}
.modalright{
  position: relative;
  display: inline-block;
  width: 36.7%;
  height: 320px;
  margin-left: 2px;
  background:rgba(245,245,245,1);
}
.modalright span{
  left: 50%;
  margin-left: -12px;
  position: absolute;
  bottom: 16px;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
  color:rgba(153,153,153,1);
  opacity:1;
}
.preview{
  width: 188px;
  height: 188px;
  margin: 0 auto;
  margin-top: 9%;
  background:rgba(153,153,153,1);
  border-radius:50%;
  opacity:1;
}
.previewImg{
  position: absolute;
  width: 188px;
  height: 188px;
  border-radius:50%;
}
.delete{
  left: 50%;
  margin-left: -12px;
  margin-top: 20px;
  position: absolute;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
  color:RGBA(34, 87, 180, 1);
  opacity:1;
}
.ivu-modal-footer{
  text-align: center;
}
.ivu-modal-footer .ivu-btn{
  width: 116px;
  border-radius:3px;
}
.button2{
  background: rgba(50, 135, 255, 1);
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  opacity:1;
}
.button3{
  background: rgba(217, 217, 217, 1);
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(102, 102, 102, 1);
  opacity:1;
}
.menu{
  background:rgba(255,255,255,1);
  opacity:1;
  border-bottom:2px solid rgba(50,135,255,1);
}
.menu .ivu-menu{
  background:rgba(255,255,255,1);
  height: 32px;
  z-index: 99;
}
.menu .ivu-menu .ivu-menu-item{
  color: rgba(51, 51, 51, 1);
  font-size:16px;
  font-weight:400;
  line-height:33px;
  font-family:Microsoft YaHei;
  text-align: center;
  opacity:1;
}
.menu .ivu-menu .ivu-menu-item-active,.menu .ivu-menu .ivu-menu-item:hover{
  color: rgba(50, 135, 255, 1);
}
.menu .ivu-menu .ivu-menu-item-selected{
  background: rgba(50, 135, 255, 1);
  color:rgba(255,255,255,1);
}
.menu .ivu-menu .ivu-menu-item-selected:hover{
  color: rgba(255,255,255,1);
}
.text1{
  font-size:12px;
  margin-top: 32px;
  margin-left: 24px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
  color:rgba(51,51,51,1);
  opacity:1;
}
.resource-mod-bd {
  margin-top: 25px;
}
.clearfix {
  display: block;
  zoom: 1;
}
.mock-jobs-item {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  text-align: center;
  width: 22%;
  height: 240px;
  margin-left: 25px;
  margin-bottom: 6%;
  background:rgba(255,255,255,1);
  border:1px solid rgba(238,238,238,1);
  opacity:1;
  border-radius:5px;
}
.mock-jobs-item:hover {
  box-shadow:0px 0px 6px rgba(0,0,0,0.16);
}
.mock-jobs-name {
  font-size:18px;
  line-height:24px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
  margin-top: 15px;
}
.mock-jobs-name1{
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 19px;
  color: rgba(51,51,51,1);
  opacity: 1;
  position: absolute;
  margin-top: 150px;
  margin-left: 16px;
}
.time{
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:16px;
  color:rgba(102,102,102,1);
  opacity:1;
  position: absolute;
  margin-top: 170px;
  margin-left: 16px;
}
.mock-jobs-img {
  max-width:150px;
  max-height: 150px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -75px;
  margin-top: -75px;
}
</style>