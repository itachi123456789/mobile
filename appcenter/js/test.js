<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<meta name="keywords" content="站长,网页特效,js特效,广告代码,zzjs,zzjs.net,sky,www.zzjs.net,站长特效 网" />
<meta name="description" content="www.zzjs.net,站长特效网，站长必备js特效及广告代码。大量高质量js特效，提供高质量广告代码下载,尽在站长特效网" />
<title>兼容多种浏览器的公告栏文字滚动效果js代码，sky整理收集。</title>
<style type="text/css">
.cls_container{border:1px solid #ccc;width:680px;font-size:12px;height:24px;overflow:hidden;}
.cls_container ul{list-style-type:none;margin:0;padding:0;margin-left:32px;}
.cls_container ul li{height:24px;line-height:24px;width:320px;float:left;display:inline;}
</style>
</head>
<body>
<a href="<#ZC_BLOG_HOST#>">站长特效网</a>,站长必备的高质量网页特效和广告代码。zzjs.net，站长js特效。<hr>
<!--欢迎来到站长特效网，我们网站收集大量高质量js特效，提供许多广告代码下载，网址：www.zzjs.net，zzjs@msn.com,用.net打造靓站-->
<div id="myscroll" class="cls_container">
 <ul>
 <li><a href="<#ZC_BLOG_HOST#>?cat=2">欢迎来到站长特效网</a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=3">微软和谷歌对浏览器的垄断会导致Web的私有化吗? </a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=4">Subversion高级应用:SVN的多种认证方式</a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=5">年度总结:2008年Java工具</a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=6">要不要把IT主导权还给业务人员? </a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=7">IT专家网08年回顾:开发语言与开发平台共舞 </a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=8">zzjs站长特效，做国内最帅的网页特效站</a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=9">方正科技七大优势 打造全流程专业外包</a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=10">08回顾:Oracle能否继续领跑者数据库市场? </a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=11">Web安全性问题的层次关系分析</a></li>
  <li><a href="<#ZC_BLOG_HOST#>?cat=2">从融合至存储 以太网成企业网络终极答案</a></li>
 </ul>
</div>
<div id="showhint"></div>
<script type="text/javascript">
function $(element){
 if(arguments.length>1){
  for(var i=0,length=arguments.length,elements=[];i<length;i++){
   elements.push($(arguments[i]));
  }//欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
  return elements;
 }
 if(typeof element=="string"){
  return document.getElementById(element);
 }else{
  return element;
 }
}
var Class={
 create:function(){
  return function(){
   this.initialize.apply(this,arguments);
  }
 }
}
Function.prototype.bind=function(object){
 var method=this;
 return function(){
  method.apply(object,arguments);
 }
}//欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
var Scroll=Class.create();
Scroll.prototype={
 initialize:function(element,height){
  this.element=$(element);
  this.element.innerHTML+=this.element.innerHTML;
  this.height=height;
  this.maxHeight=this.element.scrollHeight/2;
  this.counter=0;
  this.scroll();
  this.timer="";
  this.element.onmouseover=this.stop.bind(this);
  this.element.onmouseout=function(){this.timer=setTimeout(this.scroll.bind(this),1000);}.bind(this);
 },
 scroll:function(){
  if(this.element.scrollTop<this.maxHeight){
   this.element.scrollTop++;
   this.counter++;
  }else{
   this.element.scrollTop=0;
   this.counter=0;
  }
  if(this.counter<this.height){
   this.timer=setTimeout(this.scroll.bind(this),20);
  }else{
   this.counter=0;
   this.timer=setTimeout(this.scroll.bind(this),3000);
  }
 },
 stop:function(){
  clearTimeout(this.timer);
 }
}//欢迎来到站长特效网，我们的网址是www.zzjs.net，很好记，zz站长，js就是js特效，本站收集大量高质量js代码，还有许多广告代码下载。
var myscroll=new Scroll("myscroll",24);
</script>
</body>
</html>
