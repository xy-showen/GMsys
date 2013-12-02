/**
 * @author showen
 */
var httpRequestHandles=require('../handle/httpRequestHandles.js');
var handle={};

handle['/login']=httpRequestHandles.login;
handle["/checkLogin"] =httpRequestHandles.checkLogin;
handle["/getVerifyImage"]=httpRequestHandles.getVerifyImage;
handle["/activity"]=httpRequestHandles.activity;


module.exports=handle;