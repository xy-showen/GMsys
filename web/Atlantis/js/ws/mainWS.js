/**
 * @author showen
 */
mainWS = new WebSocket('ws://192.168.2.121:8899/');

mainWS.onopen = function(){
  //alert("open!!!");
};

mainWS.onmessage = function(e){
  var message=JSON.parse(e.data);
  //alert(result);
  //alert(result.url);
  //alert(result.data.status);
  //$('#body').html(e.data);
if(message.url=='/account/login'){
    login(message);//登录返回信息
  }
};

mainWS.onerror=function(e){
  alert("ws has err:"+JSON.stringify(e));

};
mainWS.onclose=function(){
  alert("与服务器断开,请重新登录");
};


