var url = require("url"),

  fs = require("fs"),

  querystring = require("querystring"),

  ccap = require('ccap')(),

  GMsysServerDB = require('../../DB/GMsysServerDB/GMsysServerDB.js'),

  //GameServerDB = require('../../DB/GameServerDB/GameServerDB.js'),

  mustache = require('mustache');

//verifyImageCode=require('../modules/GMsysModule/verifyImageCode.js');





function login(request, response) {
    fs.readFile("./web/login.html", 'utf-8', function(err, data) {
      if(err){
        console.log("err:"+err);
      }
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write(data);
    response.end();
  });
  console.log("Request handler 'login' was called.");

}



function check(request, response) {

  if (request.method.toLowerCase() == 'get') {



  } else if (request.method.toLowerCase() == 'post') {

    var info = "";

    request.addListener("data", function(data) {

      info += data;

    });

    request.addListener("end", function() {

      console.log(info);

      var userName = querystring.parse(info).username;

      //var password = querystring.parse(info).password;

      var VerifyImageCode = querystring.parse(info).VerifyImageCode;

      var VerifyImageCodeKey = querystring.parse(info).VerifyImageCodeKey;



   if(global.clients.hasOwnProperty(userName)){



        fs.readFile('./web/index.html',

        function(err, data) {

          //response.end(data);

          response.end(mustache.to_html(data.toString(),{userName:userName}));

        });

      }else{

        console.log("has not login");

      }

    });

  }

}



function getVerifyImage(request, response) {

  var arg = url.parse(request.url).query

  var Guid = querystring.parse(arg).Guid;



  var ary = ccap.get();





  var imageCode = ary[0];

  //var imageCode ="0";





  var buf = ary[1];

  //var buf = null;

  var date = new Date();

  console.log(date);

  GMsysServerDB.getModelByName("verifyImageCode").saveImageCode(Guid, imageCode, date);

  //GameServerDB.getModelByName("ttt").saveImageCode(Guid,imageCode,date);

  // verifyImageCode.saveImageCode(Guid,imageCode,date);

  //hand_mongodb.upsertVerifyImageCode(Guid,imageCode,date);

  response.end(buf);

}





function activity(request,response){

    fs.readFile("./web/Atlantis/html/activity/firstActivity.html", 'utf-8', function(err, data) {

    if (err) throw err;

    response.writeHead(200, {

      "Content-Type": "text/html"

    });

    response.write(data);

    response.end();

  });

  console.log("Request handler 'login' was called.");

}



exports.login = login;

exports.check = check;

exports.getVerifyImage = getVerifyImage;

exports.activity=activity;