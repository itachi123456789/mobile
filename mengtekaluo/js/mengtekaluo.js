//Ӧ��js����
var app ={};
//��ʼ���ֲ���
app.initSlider=function(opt){
   var opts = $.extend({
       container:document.getElementById("mgtl-slide"),
       "height":60,
       "speed":500,
       "autoPlay": 3000, //�Զ�����
       "loop":true,
       "pageShow":true,
       "pageStyle":'line',
       'dotPosition':'center'
   },opt);
    return new auiSlide(opts);
}
//��ʼ���ײ����� Ч����
app.initFooterBar=function(opt){
    var opts = $.extend({
        id:'#footer',
        itemcls:'.aui-bar-tab-item',
        activecls:'.aui-active',
        activebarcls:'.mgtl-footer-navbar',
        effectcls:'ripple-effect',
        duration:3000
    },opt);
    var curNativeBar = $(opts.activebarcls);
    $(opts.activebarcls).css({
        width:$(opts.id).find(opts.itemcls).eq(0).width(),
        bottom:$(opts.id).find(opts.itemcls).eq(0).height()
    });
    $(opts.activebarcls).width()
    curNativeBar.animate({
        left:$(opts.activebarcls).offset().left
    });
    $(opts.id).find(opts.itemcls).click(function(event){

        event = event || window.event;

        var _this = this;
        curNativeBar.stop(true).animate({
            left:$(_this).offset().left
        });
        var xPos = event.pageX-$(_this).offset().left;
        var yPos = event.pageY-$(_this).offset().top;
        var div = $('<div/>');
        div.addClass('ripple-effect');
        var ripple = $(_this).find('.ripple-effect');
        ripple.css("height", $(_this).height());
        ripple.css("width", $(_this).height());
        div.css(
            {
                left:xPos-(ripple.width()/2),
                top:yPos-(ripple.height()/2),
                background:$(_this).data('bgcolor') ? $(_this).data('bgcolor') :'rgba(254,73,2,.6)'
            }
        );
        div.appendTo($(_this));
       setTimeout(function(){
           div.remove();
       },opts.duration);
    });
}
jQuery(function(){
    app.initSlider();
    app.initFooterBar();
});