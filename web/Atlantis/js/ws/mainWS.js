mainWS = new WebSocket('ws://192.168.2.121:8899/');

mainWS.onopen = function(){

  //alert("open!!!");

}

mainWS.onmessage = function(e){
  var result=JSON.parse(e.data);
  //alert(result);

  //alert(result.url);

  //alert(result.data.status);

  //$('#body').html(e.data);

  if(result.url=='/account/login'){

    if(result.data.status==0){

    // ajax·½·¨£º 

          $.ajax({
                url:"/check", //config.ChatServerAddress+
                type:"POST", 
                async:true,
                data:{'username':document.getElementById('user').value

                      //,'password':document.getElementById('password').value

                      ,'VerifyImageCodeKey':Guid

                      ,"VerifyImageCode":document.getElementById('VerifyImageCode').value},

                beforeSend:function(XMLHttpRequest){

                    //$("#tt").src="./StaticResource/load.jpg"

                 },

                success:function(data,status) 

                {  



                    $('#body').html(data); 

                } ,

            error: function(request) {

                    alert("登录失败");

                }



            });

    }else if(result.data.status==1){

          $("#con").html("没有此用户");

              document.getElementById('user').value="";

              $("#loading").html("");

              document.getElementById('user').focus();

              getVerifyImage();

    }else if(result.data.status==2){

          $("#con").html("密码错误");

              document.getElementById('password').value="";

              $("#loading").html("");

              document.getElementById('user').focus();

              getVerifyImage();

    }else if(result.data.status==3){

        $("#con").html("用户已在线");

              $("#loading").html("");

              document.getElementById('user').focus();

              getVerifyImage();

    }

  }

}

mainWS.onerror=function(e){

  alert("ws has err:"+JSON.stringify(e));

}