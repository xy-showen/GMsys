var httpRequestHandles=require('../handle/httpRequestHandles.js');

var handle={};



handle['/login']=httpRequestHandles.login;

handle["/check"] =httpRequestHandles.check;

handle["/getVerifyImage"]=httpRequestHandles.getVerifyImage;

handle["/activity"]=httpRequestHandles.activity;

module.exports=handle;