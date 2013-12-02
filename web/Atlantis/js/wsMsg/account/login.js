/**
 * @author showen
 */
function login(message){
  if(message.data.status==0){
    // ajax请求
          $.ajax({
                url:"/checkLogin", 
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
    }else if(message.data.status==1){
          $("#con").html("没有此用户");
              document.getElementById('user').value="";
              $("#loading").html("");
              document.getElementById('user').focus();
              getVerifyImage();
    }else if(message.data.status==2){
          $("#con").html("密码错误");
              document.getElementById('password').value="";
              $("#loading").html("");
              document.getElementById('user').focus();
              getVerifyImage();
    }else if(message.data.status==3){
        $("#con").html("此用户已登录");
              $("#loading").html("");
              document.getElementById('user').focus();
              getVerifyImage();
    }

}