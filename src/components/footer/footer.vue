<template>
    <Footer class="footer">
        <div class="link">
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_aboutus">关于我们</a>
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_socialrecruit">加入我们</a>
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_cooperative">合作伙伴</a>
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_contactus">联系我们</a>
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_question">意见反馈</a>
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_privacy">隐私声明</a>
        </div>
        <div class="text">
          <a style="cursor:none" class="icpfirst" id="showtitle">Copyright 1998-2020永兴元科技版权所有</a>
          <a href="http://www.beian.miit.gov.cn/" target="_blank">【粤ICP备】09098678号</a>
        </div>
        <div class="net">
          <a target="_blank" href="http://szcert.ebs.org.cn/838369a8-55fe-478a-a4c8-1d3044d087d7"><b>工商网监电子标识</b></a>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502000200">
            粤公网安备 44030502000200
          </a>           
       </div>
    </Footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer{
  height:160px;
  background:rgba(46,48,51,1);
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  opacity:1;
}

.link{
  width:655px;
  height:19px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:19px;
  color:rgba(255,255,255,1);
  opacity:1;
  margin-top: 14px ;
  margin-left: 360px;
}
.link a:first-child {
    padding-left: 0;
    border-left: none;
}
.link a {
    text-decoration: none;
    color:rgba(255,255,255,1);
    padding: 0 1em;
    border-left: 2px solid #fff;
    white-space: nowrap;
}
.text{
  width:470px;
  height:19px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:19px;
  color:rgba(217,217,217,1);
  opacity:1;
  margin-left: 360px;
  margin-top: 18px ;

}
.text a{
  color:rgba(217, 217, 217, 1)
}
.net{
  width:438px;
  height:19px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  line-height:19px;
  color:rgba(217,217,217,1);
  opacity:1;
  margin-left: 360px;
  margin-top: 18px ;

}
.net a{
  color:rgba(217, 217, 217, 1)
}

</style>