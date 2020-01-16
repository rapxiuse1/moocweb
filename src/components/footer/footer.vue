<template>
    <Footer class="footer">
      <div class="mid-layout row h">
      <div class="col v-m">
        <div class="link">
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_aboutus">关于我们</a>
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_socialrecruit">加入我们</a>
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_cooperative">合作伙伴</a>
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_contactus">联系我们</a>
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_question">意见反馈</a>
        </div>
        <p class="text icp">
          <a style="cursor:none" class="icpfirst" id="showtitle">Copyright 1998-2020永兴元科技版权所有</a>
          <a href="http://www.beian.miit.gov.cn/" target="_blank">【粤ICP备】09098678号</a>
        </p>
        <div class="link mini">
          <a href="http://www.longrise.com.cn/LONGRISE/longrise_webmap/longrise_privacy">隐私声明</a>
        </div>
        <ul class="mid-layout net">
          <li>
            <a target="_blank" href="http://szcert.ebs.org.cn/838369a8-55fe-478a-a4c8-1d3044d087d7"><b>工商网监电子标识</b></a>
          </li>
          <li><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502000200">
            <img src="" alt="">
            <b>粤公网安备 44030502000200</b></a>
          </li>
        </ul>
       </div>
        <div class="col v-m t-r">             
       </div>
      </div>
    </Footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer{
  background: #757575;
  padding:20px 0;
}
.message {
  width: 1200px;
  margin: 0 auto;
}
.tit {
  font-size: 20px;
  text-align: center;
  padding: 10px 0 30px 0;
}
.small{
  margin-top:20px;
}
.h {
    height: 100%;
}
.row {
    display: table;
    table-layout: fixed;
    border-collapse: collapse;
}
.v-m {
    vertical-align: middle;
}
.col {
    display: table-cell;
}
.link {
    margin-bottom: 15px;
}
.link a:first-child {
    padding-left: 0;
    border-left: none;
}
.link a {
    text-decoration: none;
    color: #fff;
    font-size: 18px;
    padding: 0 1em;
    border-left: 2px solid #fff;
    display: inline-block;
    height: 18px;
    line-height: 18px;
    white-space: nowrap;
}
.footer .text {
    margin-top: 20px;
    margin-bottom: 10px;
}
.footer p {
    font-size: 16px;
    color: #cecece;
    margin: 0;
}
.icp a {
    color: #cecece;
}
a {
    text-decoration: none;
    cursor: pointer;
}
.link.mini a {
    padding: 0 6px;
    font-size: 16px;
    color: #cecece;
    height: 16px;
    line-height: 16px;
    border-color: #cecece;
}
.net {
    font-size: 0;
}
.mid-layout {
    width: 1200px;
    margin: 0 auto;
}
.net li {
    font-size: 12px;
    border: 0 solid #cecece;
    display: inline-block;
    padding: 2px 10px;
    margin-right: 10px;
    cursor: pointer;
    transition: .3s;
}
.net li a {
    color: #cecece;
}
.t-r {
    text-align: right;
}
.footer img {
    margin-left: 20px;
}
</style>