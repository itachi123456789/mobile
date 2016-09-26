/**
 * Created by Administrator on 2016/7/29.
 */
var Clock = function(container,width,height){
    container = container ? container :document.body;
    width = width ? width : 450;
    height = height ? height : 450;
    var clock = document.createElement('canvas');
    var id = 'ed-clock_'+(Math.random().toString()).replace('.','_');
    var ctx = clock.getContext('2d');
    ctx.width=clock.width = width ;
    ctx.height=clock.height = height ;
    container.appendChild(clock);
    function drawClock(){
        //�����������
        ctx.clearRect(0,0,width,height);
        //�õ���ǰʱ��
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() +1;
        var date = now.getDate();
        var week = now.getDay();//һ���еĵڼ���

        var hour = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        //Сʱ�ͷ��ӵĹ�ϵ
        var hours = hour + (minutes/60);
        //��24Сʱ��ת����12Сʱ��
        var hours = hours > 12 ? hours - 12 : hours;
        //���￪ʼ��԰
        ctx.beginPath();
        ctx.fillStyle = '#eee';
        ctx.strokeStyle = '#373737';
        ctx.lineWidth = 15;
        ctx.arc((width/2),(height/2),120,0,2*Math.PI,false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        //���̶�
        //ʱ��̶�
        for (var i = 0; i < 12; i++) {
            scale(-95, -110, 30, 3, i);
        }
        //����̶�
        for (var i = 0; i < 60; i++) {
            scale(-100, -110, 6, 1, i);
        }
        //����ʱ��
        pin(-60, 20, 7, 'black', hours, 30);

        //���Ʒ���
        pin(-80, 20, 5, 'black', minutes, 6);

        //��������
        pin(-90, 20, 3, 'red', seconds, 6);
        //��������
        createNum();
        //������
        showTime(year,month,date,week,hours,minutes,seconds);

    }
    //���ƿ̶�
    function scale(y1,y2,angle,w,i){
        //���浱ǰͼ��״̬
        ctx.save();
        //����ʱ��̶���ʽ
        ctx.lineWidth = w;
        ctx.strokeStyle = '#000';
        //����ʱ���ʼλ��
        ctx.translate(width/2,height/2);
        ctx.rotate((i*angle)*Math.PI/180);
        //����·��״̬
        ctx.beginPath();
        ctx.moveTo(0,y1);
        ctx.lineTo(0,y2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();//�ָ���ǰͼ��״̬
    }
    //�����ӱ����
    function pin(y1,y2,w,color,time,angle){
        //���浱ǰͼ��
        ctx.save();
        //����ʱ�ӵ���ʽ
        ctx.lineWidth = w;
        ctx.strokeStyle = color;
        //������ʼ״̬
        ctx.translate(width/2,height/2);
        ctx.rotate((time * angle) * Math.PI / 180); //����ת�Ƕ�
        ctx.beginPath();
        ctx.moveTo(0,y1);
        ctx.lineTo(0,y2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        if(width ===3){
            overlap();//���ƽ����
        }
        ctx.restore();
    }
    //���ƽ����
    function overlap(){
        //�������
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -70, 5, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();
    }
    //��������
    function createNum(){
        for(var i=0;i<12;i++){
            ctx.save();
            ctx.translate(width/2,height/2);
            ctx.rotate(-(i*29.5)*Math.PI/180);
            ctx.font = '20px arial';
            ctx.fillStyle = '#000';
            ctx.fillText(12-i,-10,-70);
            ctx.restore();
        }
    }
    //��ʾʱ��
    function showTime(y,m,d,w,h,min,s){
        var arrWeek = ['������','����һ','���ڶ�','������','������','������','������'];
        ctx.save();
        ctx.translate(width/2,height/2);
        ctx.font = '35px arial';
        ctx.fillStyle = '#000';
        ctx.strokeStyle = '#000';
        ctx.fillText(y+'��'+m+'��'+d+'��'+arrWeek[w],-180,-170);
        ctx.restore();
    }
    //����ʱ�䲹��
    function ad(str){
        return str < 10 ? '0'+str : ''+str;
    }
    //����ʱ��
    setInterval(drawClock,1000);

}