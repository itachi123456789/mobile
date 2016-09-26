/***
 * @author laike
 * @date 2016 7 5
 * @description the simple javascript libary
 */

var  suli = function(_name){
     return suli.prototype.init(_name);
}

var arr = [];

var slice = arr.slice;

var push = arr.push;

var indexOf = arr.indexOf;

var concat = arr.concat;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};

//ʵ�ּ���ie5��ie6��XMLHttpRequest����
if(window.XMLHttpRequest === undefined){
    window.XMLHttpRequest = function(){
        try{
          return new ActiveXObject('Msxml2.XMLHTTP.6.0');
        }catch(e){
            try{
                return new ActiveXObject('Msxml2.XMLHTTP.3.0');
            }catch(e2){
                //������׳�����
                throw new Error('XMLHttpRequest is not supported!');
            }
        }
    }
}
var jsonpCounter=0;
/***
 * ʹ��JSONP���п�������  ����������php Ϊ����news.php  echo $_GET['callback'].'('.json_encode($news).')';
 * @param url
 * @param callback
 * @returns {suli}
 */
function getJSONP(url,callback){
    //����ʹ��script�����з���
    //Ϊ�������󴴽�һ��Ψһ�Ļص���������
    var cbnum = 'cb'+jsonpCounter++;//ÿ������������
    var cbname = 'getJSONP'+cbnum;//��Ϊjsonp����������
    if(url.indexOf('?') === -1){//û�в�ѯ�������й���
        url += '?callback='+cbname;
    }else{
        url +='&callback='+cbname;
    }
    var script = document.createElement('script');
    //���彫�ű�ִ�еĻص�����
    window[cbname] = function(response){
        try{
            callback(response);
        }finally{
            delete window[cbname];//�Ƴ��ú���
            script.parentNode.removeChild(script);//�Ƴ�scriptԪ��
        }
    };
    script.src = url;
    document.body.appendChild(script);
}
suli.prototype= {
    debugMode:true,
    debugReady:false,
    /*����¼��Ĺ��ߺ���*/
    /***
     *
     * @param target
     * @param type
     * @param handler
     * @param iscapture
     */
    addEvent:function(target,type,handler,iscapture){
        iscapture = iscapture ? iscapture : false;

        if(target.addEventListener){
            if(!iscapture){
                target.addEventListener(type,handler,false);
            }else{
                target.addEventListener(type,handler,true);
            }
        }else if(target.attachEvent){
             target.attachEvent('on'+type,function(event){
                 event = event||window.event;
                 return handler.call(target,event);
             });
        }else{
            //Ĭ�������������֧��
            target['on'+type]=function(event){
                 event = event||window.event;
                 return handler.call(target,event);
            };
        }
    },
    whenReady : (function(){
        var ready = false;
        var funcs = [];
        function handler(e){
            if(ready) return;
            if(e.type === 'readystatechange' && document.readyState !=='complete'){
                return;
            }
            for(var i=0;i<funcs.length;i++)
                funcs[i].call(document);
            ready = true;
            funcs = null;
        }
        if(document.addEventListener){
            document.addEventListener('DOMContentLoaded',handler,false);
            document.addEventListener('readystatechange',handler,false);
            window.addEventListener('load',handler,false);
        }else{
            document.attachEvent('onreadystatechange',handler);
            window.attachEvent('onload',handler);
        }
        //����ʹ�ñհ�
        return function (f){

            if(ready){
                f.call(document);//���ĵ�׼�������ô��������
            }else{
                //���������н��еȺ�
                funcs.push(f);
            }
        }
    }()),
    /*���ĵ�׼������ʱ����õĺ��� �˺���������ҳ���κεط����е���*/
    /***
     *
     * @param fn
     */
    ready:function(fn){
        this.whenReady(fn);
    },
    /***
     *
     * @param _name
     * @returns {suli}
     */
    init:function(_name){
        this.id_object = null;
        this.version = '1.0.0 beta';
        //��������ģʽ
        if(!this.debugReady)
        {
            if(this.debugMode){
              this.debug();
            }
        }

        if(_name != null  && (typeof _name === 'object')){
            this.id_object = _name;
            return this;
        }
        if(document.getElementById(_name) != null  && (typeof _name === 'string')){
            this.id_object = document.getElementById(_name);
            return this;
        }
        return this;
    },
    /***
     *
     * @param value
     * @returns {*}
     */
    html:function(value){
           if(this.isNull()){
              if(value){
                  return this.id_object.innerHTML;
              }
           }else{
              if(value){
                  this.id_object.innerHTML = value;
              }else{
                  return this.id_object.innerHTML;
              }
           }
    }
    ,
    /***
     *
     * @param attrName
     * @param attrValue
     * @returns {*}
     */
    attr:function(attrName,attrValue){
        if(this.isNull()){
                return null;
        }else{
            return (attrName && attrValue) ? this.id_object.setAttribute(attrName,attrValue) :this.id_object.getAttribute(attrName);
        }
    }
    ,
    isNull:function(){
        return (this.id_object == null) ? true : false;
    },
    parent:function(){
        if(this.isNull()) return suli();
        return suli(this.id_object.parentNode);
    },
    fireEvent:function(el,evtType,keyCode){
        //ע������
    },
    /***
     *
     */
    debug:function(){
        //����ģʽ����
        this.debugReady = true;
        //��ʼ��һЩ�������¼�
    },
    /***
     *
     * @param msg
     */
    error:function(msg){
        msg = msg ? msg : '';
        throw  new Error(msg);
    },
    /***
     * �����ݽ��б������ ����һ����ѯ�ַ���
     * @param data
     * @returns {String}
     */
    encodeData:function(data){

        if(!data) return '';
        var pairs = [];
        for(name in data){
              if(!data.hasOwnProperty(name)){
                  continue;//�����̳е�����
              }
             if(typeof data[name] === 'function'){
                 continue;//��������
             }
             var value = data[name].toString();
            name = encodeURIComponent(name.replace('%20',"+"));
            value = encodeURIComponent(value.replace('$20','+'));
            pairs.push(name+"="+value);
        }
        return pairs.join('&');
    }
    ,
    /**
     * ��װAjax
     * @param url �����ַ
     * @param type �������� post get
     * @param async �Ƿ��첽���� true false
     * @param param ��������б�  �����ʽ
     * @param datatype ����ֵ�ø�ʽ���������� json text html xml��
     * @param success ����ɹ�ʱ��ִ�еĻص�����
     * @param error  ����ʧ��ʱ��ִ�еĻص�����
     * @param timeout ʵ�ֳ�ʱ�������ָ�������ʱ����Զ��������� Ĭ����5����������
     */
    Ajax:function(url,type,async,param,datatype,success,error,timeout){
        if(!url){
            this.error('�����ַ����Ϊ�գ�');
            return this;
        }
        var _xhr = new XMLHttpRequest();
        type = (type ? type : 'get').toUpperCase();
        param = param ? param : {};
        datatype = datatype ? datatype :'text';
        success = success ? success : function(response){};
        error = error ? error : function(msg){};
        async = (async !== undefined) ? async : true;//Ĭ��Ϊ�첽����
        timeout = timeout ? timeout : 5000;
        var _timedout = false;
        var _timer = setTimeout(function(){
            _timedout = true;
             _xhr.abort();//��ʱ�����˾��ж�����
        },timeout);
        if(async && type === 'GET' && param.length !== 0){
            _xhr.open(type,url+"?"+this.encodeData(param),async);
        }else{
            _xhr.open(type,url,async);
        }
        //�����POST������ô������������ͷ��
        if(type === 'POST'){
             _xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }
        _xhr.onreadystatechange=function(){
            if(_xhr.readyState !== 4 ){
                return;
            }
            if(_timedout){
                return;
            }
            clearTimeout(_timer);
            if(_xhr.readyState === 4 && _xhr.status === 200){
                var type = _xhr.getResponseHeader('Content-Type');
                if(datatype === 'xml' && _xhr.responseXML){
                    success.call(window,_xhr.responseXML);
                }else if(datatype === 'json' && type === 'application/json'){
                    success.call(window,JSON.parse(_xhr.responseText));
                }else{
                    success.call(window,_xhr.responseText);
                }
            }else{
                error.call(window,'����ʧ�ܣ�');
            }
        };
        if(type === 'GET'){
            _xhr.send(null);
            return this;
        }
        _xhr.send(this.encodeData(param));
        return this;
    },
    /***
     * �Ƿ�֧�ֿ������� IE10 ���µİ汾��֧�� ֻ��ʹ��jsonp������
     * @param url
     * @returns {boolean}
     * @constructor
     */
    isSupportCors:function(url){
           return (new XMLHttpRequest()).withCredentials !== undefined  ? true : false;
    },
    getjsonp:function(url,callback){
        getJSONP(url,callback);
    }
};

suli(document).ready(function(){
    //suli("demo").Ajax('http://localhost:63342/js%20learn/qianduankaifa/demo5.html','get',true,{username:'laike',pwd:'laikedou'},'html',function(res){
    //       suli('demo').html(res);
    //});
    //console.log(suli('child').parent().attr('name'));
    suli("demo").getjsonp('http://localhost:808/news.php',function(res){
        console.log(res);
    });
});




